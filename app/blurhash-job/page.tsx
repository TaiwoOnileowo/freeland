"use server";
import { runBlurhashJob } from "@/jobs/blurhash";
import React from "react";
const Blurhash = async () => {
  await runBlurhashJob();
  return <div>blurhash</div>;
};

export default Blurhash;
