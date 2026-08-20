import { NextResponse } from "next/server";
import { X402_SPECS_CATALOG } from "@/data/x402Specs";
import { PLATFORM_CONFIG } from "@/lib/x402Utils";

export async function GET() {
  const catalog = Object.values(X402_SPECS_CATALOG).map(spec => ({
    slug: spec.slug,
    title: spec.title,
    category: spec.category,
    tags: spec.tags,
    priceUSDC: spec.priceUSDC,
    aimSummary: spec.aim.corePurpose,
    accessUrl: `/api/x402/spec/${spec.slug}`
  }));

  return NextResponse.json({
    status: "success",
    protocol: "x402",
    network: PLATFORM_CONFIG.defaultNetwork,
    currency: PLATFORM_CONFIG.currency,
    facilitatorUrl: PLATFORM_CONFIG.facilitatorUrl,
    totalSpecs: catalog.length,
    items: catalog
  }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300"
    }
  });
}