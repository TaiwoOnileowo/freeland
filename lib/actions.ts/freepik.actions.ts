"use server";
const freepikApiKey = process.env.FREELAND_FREEPIK_API_KEY;

if (!freepikApiKey) {
  throw new Error("Missing Freepik API key");
}

export const getFreepikDownloadUrl = async (photoId: string) => {
  try {
    const response = await fetch(
      `https://api.freepik.com/v1/resources/${photoId}/download`,
      {
        headers: {
          "x-freepik-api-key": freepikApiKey,
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
