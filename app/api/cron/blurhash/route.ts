import { NextRequest, NextResponse } from "next/server";
import { runBlurhashJob } from "@/jobs/blurhash";

// export const runtime = "edge";

export  async function GET(req: NextRequest) {
  await runBlurhashJob();
  return NextResponse.json({ message: "Job completed" });
}
