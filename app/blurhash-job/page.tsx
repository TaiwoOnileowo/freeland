"use server";
import { runBlurhashJob } from "@/jobs/blurhash";
import React from "react";
const Blurhash = async () => {
  console.log("Running blurhash job");
  const response = await fetch("https://freeland-pied.vercel.app/api/cron/blurhash");
  const data = await response.json();
  console.log("Response from blurhash job", data);
  return <div>blurhash</div>;
};

export default Blurhash;
