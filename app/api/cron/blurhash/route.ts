import { NextRequest, NextResponse } from "next/server";
import { runBlurhashJob } from "@/jobs/blurhash";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET(req: NextRequest) {
  const isSuccess = await runBlurhashJob();

  // Create the response with cache headers to disable caching
  return NextResponse.json({
    message: `Job completed, ${isSuccess ? "success" : "failed"}`,
  });
}
