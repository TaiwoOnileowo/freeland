import { NextRequest, NextResponse } from "next/server";
import { runBlurhashJob } from "@/jobs/blurhash";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET(req: NextRequest) {
  const isSuccess = await runBlurhashJob(3);
  if (isSuccess) {
    return NextResponse.json({
      message: `Job completed successfully`,
    });
  }
  return NextResponse.json({
    message: `Job failed`,
  });
}
