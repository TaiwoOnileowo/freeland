import { NextRequest, NextResponse } from "next/server";
import { runBlurhashJob } from "@/jobs/blurhash";

export async function GET(req: NextRequest) {
  await runBlurhashJob();

  // Create the response with cache headers to disable caching
  const response = NextResponse.json({ message: "Job completed" });
  
  // Set cache control headers
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}
