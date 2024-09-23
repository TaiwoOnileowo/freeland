"use server";
import { runBlurhashJob } from "@/jobs/blurhash";
import React from "react";
const Blurhash = async () => {
  console.log("Running blurhash job");
  const isSuccess = await runBlurhashJob();

  console.log("Response from blurhash job", isSuccess ? "success" : "failed");
  return <div>blurhash</div>;
};

export default Blurhash;
