import { NextRequest, NextResponse } from "next/server";

import { Basic } from "unsplash-js/dist/methods/photos/types";
import { Photo } from "@/types";

export const config = {
  runtime: "edge",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1"; 
  const perPage = searchParams.get("per_page") || "30";
  const unsplashApiKey = process.env.FREELAND_UNSPLASH_ACCESS_KEY;

  if (!unsplashApiKey) {
    return NextResponse.json(
      {
        status: "error",
        message: "Missing Unsplash API key",
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${unsplashApiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Unsplash photos");
    }

    const data: (Basic & { slug: string })[] = await response.json();

    // Transform the data into the Photo type
    const photos: Photo[] = data.map((photo) => ({
      id: photo.id,
      width: photo.width,
      height: photo.height,
      blur_hash: photo.blur_hash,
      alt: photo.alt_description,
      url: photo.urls.small,
      freeland_url: `/images/${photo.slug}`,
      author: photo.user.name,
      author_url: photo.user.links.html,
      likes: 0,
      provider: "Unsplash",
      provider_logo: "https://unsplash.com/favicon.ico",
      provider_url: "https://unsplash.com/",
    }));

    return NextResponse.json(photos, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching Unsplash photos", error);

    return NextResponse.json(
      {
        message: "Failed to fetch photos",
      },
      { status: 500 }
    );
  }
}
