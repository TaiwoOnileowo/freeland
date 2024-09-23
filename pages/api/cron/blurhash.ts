import { NextRequest, NextResponse } from "next/server";
import { runBlurhashJob } from "@/jobs/blurhash";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  await runBlurhashJob();
  return NextResponse.json({ message: "Job completed" });
}
