import React from "react";
import { notFound } from "next/navigation";
import { getPackageBySlug, getPackages } from "@/lib/dataService";
import PackageDetailsClient from "@/components/packages/PackageDetailsClient";

export const dynamic = "force-dynamic";

export default async function PackageDetailsPage({ params }) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  // Fetch related packages: same category, excluding current package
  const allPackages = await getPackages();
  const related = allPackages.filter(
    (p) => p.category === pkg.category && p.slug !== pkg.slug,
  );

  // Fallback if no matching category, take any other packages
  const finalRelated =
    related.length > 0
      ? related
      : allPackages.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  return <PackageDetailsClient pkg={pkg} relatedPackages={finalRelated} />;
}
