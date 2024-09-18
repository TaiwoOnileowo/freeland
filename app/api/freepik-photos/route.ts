import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("per_page")) || 30;
  const freepikApiKey = process.env.FREELAND_FREEPIK_API_KEY;

  if (!freepikApiKey) {
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
      `https://api.freepik.com/v1/resources?limit=${perPage}&page=${page}`,
      {
        headers: {
          "x-freepik-api-key": freepikApiKey,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Pexels photos");
    }

    const data: {
      data: {
        id: number;
        title: string;
        image: {
          source: {
            url: string;
            size: string;
          };
        };
        author: {
          name: string;
          avatar: string;
        };
      }[];
    } = await response.json();

    // Transform the data into the Photo type
    const photos = data.data.map((photo) => {
      const url = photo.title + "_" + photo.id;
      const slug = url.replace(/ /g, "-");
      const widthAndHeight = photo.image.source.size.split("x");
      const width = parseInt(widthAndHeight[0]);
      const height = parseInt(widthAndHeight[1]);
      return {
        id: photo.id.toString(),
        width: width,
        height: height,
        url: photo.image.source.url,
        blur_hash: "",
        alt: photo.title,
        freeland_url: `/images/${slug}`,
        author: photo.author.name,
        author_url: photo.author.avatar,
        likes: 0,
        provider: "Freepik",
        provider_logo: "https://www.freepik.com/favicon.ico",
        provider_url: " https://www.freepik.com/",
      };
    });

    return NextResponse.json(photos, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching Freepik photos", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch photos",
      },
      { status: 500 }
    );
  }
}
