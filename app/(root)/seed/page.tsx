import { createCollections } from "@/lib/mongo/schema";
// import { seed } from "@/lib/mongo/seed";
import React from "react";

export default async function Seed() {
  await createCollections()
  // await seed();
  return <div>Seed</div>;
}
