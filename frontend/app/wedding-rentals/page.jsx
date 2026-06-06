import React from "react";
import { getWeddingCars } from "@/lib/dataService";
import WeddingClient from "@/components/wedding/WeddingClient";

export const dynamic = "force-dynamic";

export default async function WeddingRentalsPage() {
  const cars = await getWeddingCars();

  return <WeddingClient initialCars={cars} />;
}
