import React from "react";
import { getTaxiCars } from "@/lib/dataService";
import TaxiClient from "@/components/taxi/TaxiClient";

export const dynamic = "force-dynamic";

export default async function TaxiServicePage() {
  const cars = await getTaxiCars();

  return <TaxiClient initialCars={cars} />;
}
