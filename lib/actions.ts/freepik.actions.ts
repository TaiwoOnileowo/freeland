"use server";
const freepikApiKey = process.env.FREELAND_FREEPIK_API_KEY;
import freepiklogo from "@/public/icons/freepik.svg";
if (!freepikApiKey) {
  throw new Error("Missing Freepik API key");
}
interface FreepikPhoto {
  id: string;
  title: string;
  image: {
    source: {
      size: string;
      url: string;
    };
  };
  author: {
    name: string;
    avatar: string;
  };
}

export const getFreepikPhotos = async ({
  page,
  perPage,
  signal,
  query,
  filters,
}: {
  page: number;
  perPage: number;
  signal?: AbortSignal;
  query?: string;
  filters?: {
    order: string;
  };
}) => {
  const order = filters?.order || "relevance";
  const freepikUrl = query
    ? `https://api.freepik.com/v1/resources?limit=${perPage}&page=${page}&term=${query}&order=${order}&filters[license][freemium]=1`
    : `https://api.freepik.com/v1/resources?limit=${perPage}&page=${page}&order=random&filters[license][freemium]=1`;
  try {
    const response = await fetch(freepikUrl, {
      headers: {
        "x-freepik-api-key": freepikApiKey,
      },
      signal,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Freepik photos");
    }
    const data = await response.json();
    const photos = data.data.map((photo: FreepikPhoto) => {
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
        provider_logo: freepiklogo,
        provider_url: " https://www.freepik.com/",
      };
    });
    return photos;
  } catch (error) {
    console.error("Error fetching Freepik photos", error);
    throw new Error("Failed to fetch Freepik photos");
  }
};

export const getFreepikDownloadUrl = async (photoId: string) => {
  try {
    const response = await fetch(
      `https://api.freepik.com/v1/resources/${photoId}/download`,
      {
        headers: {
          "x-freepik-api-key": freepikApiKey,
          "Accept-Language": "en-US",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to Freepik download photo");
    }

    const data = await response.json();

    return data.data.url;
  } catch (error) {
    console.error("Error downloading Freepik  photo", error);
    throw new Error("Failed to download Freepik photo");
  }
};
