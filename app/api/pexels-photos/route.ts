import { NextRequest, NextResponse } from "next/server";

import { Photo } from "@/types";
import { Photos } from "pexels";

export const config = {
  runtime: "edge",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("per_page") || "30";
  const pexelsApiKey = process.env.FREELAND_PEXELS_API_KEY;

  if (!pexelsApiKey) {
    return NextResponse.json(
      {
        status: "error",
        message: "Missing Pexels API key",
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: pexelsApiKey,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Pexels photos");
    }

    const data: Photos = await response.json();

    // Transform the data into the Photo type
    const photos: Photo[] = data.photos.map((photo) => {
      const slug = photo.url.split("https://www.pexels.com/photo/").pop();

      return {
        id: photo.id.toString(),
        width: photo.width,
        height: photo.height,
        url: photo.src.original,
        blur_hash: "",
        alt: photo.alt,
        freeland_url: `/images/${slug}`,
        author: photo.photographer,
        author_url: photo.photographer_url,
        likes: 0,
        provider: "Pexels",
        provider_logo: "https://www.pexels.com/favicon.ico",
        provider_url: "https://www.pexels.com/",
      };
    });

    return NextResponse.json(photos, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching Unsplash photos", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch photos",
      },
      { status: 500 }
    );
  }
}
