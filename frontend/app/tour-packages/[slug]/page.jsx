import React from "react";
import { notFound } from "next/navigation";
import PackageDetailsClient from "@/components/packages/PackageDetailsClient";

export const dynamic = "force-dynamic";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default async function PackageDetailsPage({ params }) {
  const { slug } = params;

  const packageRes = await fetch(`${backendUrl}/api/packages/${slug}`, {
    cache: "no-store",
  });

  if (!packageRes.ok) {
    notFound();
  }

  const pkg = await packageRes.json();

  const packagesRes = await fetch(`${backendUrl}/api/packages`, {
    cache: "no-store",
  });

  const allPackages = packagesRes.ok ? await packagesRes.json() : [];

  const related = allPackages.filter(
    (p) => p.category === pkg.category && p.slug !== pkg.slug
  );

  const finalRelated =
    related.length > 0
      ? related.slice(0, 3)
      : allPackages.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  return (
    <PackageDetailsClient
      pkg={pkg}
      relatedPackages={finalRelated}
    />
  );
}