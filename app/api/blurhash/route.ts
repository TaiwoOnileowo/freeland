import { encode } from "blurhash";
import { getPhotos } from "@/lib/actions.ts/fl_universal.actions";
import { Photo } from "@/types";

import sharp from "sharp";
import { formatImageData } from "@/lib/utils";
import { redisClient, connectToRedis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
let searchKeyWords = ["all", "nature", "city", "food", "people", "technology"];

const fetchWithTimeout = async (url: string, timeout: number = 15000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      console.warn(`Request to ${url} aborted due to timeout.`);
      return null; // Handle the abort by returning null or some fallback behavior
    }
    throw new Error(`Request to ${url} failed: ${error.message}`);
  }
};
const fetchWithRetries = async (url: string, retries = 3, timeout = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchWithTimeout(url, timeout);
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.warn(`Retrying fetch (${i + 1}/${retries}) for ${url}`);
        if (i === retries - 1) {
          console.error(`Failed after ${retries} retries:`, error);
          return null; // Gracefully fail after retries
        }
      } else {
        throw error; // Other errors are not retried
      }
    }
  }
};
const generateBlurHash = async (imageUrl: string) => {
  try {
    const response = await fetchWithRetries(imageUrl, 3, 15000);
    if (!response) {
      // Return a fallback blurhash if the image request fails after retries
      return "LEHV6nWB2yk8pyo0adR*.7kCMdnj"; //fallback blurhash
    }
    const buffer = await response.arrayBuffer();
    const image = sharp(Buffer.from(buffer));

    const { data, info } = await image
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer({ resolveWithObject: true });

    return encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);
  } catch (error) {
    console.error(`Error generating blurhash for ${imageUrl}:`, error);
    return null;
  }
};
const fetchImagesAndGenerateBlurhash = async () => {
  const randomIndex = Math.floor(Math.random() * searchKeyWords.length);
  const query = searchKeyWords[randomIndex];
  console.log("query", query);
  try {
    const quarteredData = await getPhotos({
      page: 1,
      perPage: 30,
      query,
    });

    const data = quarteredData.flat();
    const blurHashedPhotos = await Promise.all(
      data.map(async (photo: Photo) => {
        if (!photo.blur_hash) {
          const blurHash = await generateBlurHash(photo.url);
          console.log("Generated blurhash for", photo.id, blurHash);
          if (blurHash) {
            photo.blur_hash = blurHash;
          }
        }
        return photo;
      })
    );
    const cacheKey = `photos:${query === "" ? "all" : query}:${1}`;

    const updatedPhotos = formatImageData(blurHashedPhotos);
    await redisClient.set(cacheKey, JSON.stringify(updatedPhotos), {
      EX: 10800,
    });
  } catch (error) {
    console.error("Error fetching images or generating blurhash:", error);
  }
};

const getAllQueries = async () => {
  // Use SCAN to iterate over all keys that match the pattern `photos:*`
  let cursor = 0;
  do {
    // Use SCAN to get keys with pattern 'photos:*'
    const result = await redisClient.scan(cursor, {
      MATCH: "photos:*",
      COUNT: 100, // Adjust COUNT to optimize performance
    });
    cursor = result.cursor;
    const keys = result.keys;

    // Extract the queries from the Redis keys (keys will be in format photos:query:page)
    const queries = keys.map((key) => key.split(":")[1]);
    searchKeyWords = [...new Set([...searchKeyWords, ...queries])]; // Remove duplicates
  } while (cursor !== 0);

  console.log("queries", searchKeyWords);

  // If no queries are found in Redis, fall back to default keywords
  searchKeyWords = searchKeyWords.length
    ? searchKeyWords
    : ["all", "nature", "city", "food", "people", "technology"];
  // return searchKeyWords;
};
const mode = process.env.NODE_ENV;
export const GET = async (req: NextRequest) => {
  await connectToRedis().then(() => {
    return NextResponse.json({
      message: `Cron job scheduled from ${mode}`,
    });
  });
  return NextResponse.json({
    message: "Fail",
  });
  // console.log("Running cron job to generate blurhashes");
  // await getAllQueries();
  // console.log("Search keywords", searchKeyWords);
  // await fetchImagesAndGenerateBlurhash();
  // console.log(`Cron job completed from ${mode}`);
};
