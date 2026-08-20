import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ANON_KEY     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const revalidate = 60;

export async function GET() {
  const key = SERVICE_KEY || ANON_KEY;
  if (!SUPABASE_URL || !key) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/x402_specs?select=slug,title,category,price_usdc,aim_summary,is_published&is_published=eq.true&order=created_at.desc`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: "Supabase fetch failed", detail: err }, { status: 500 });
  }

  const rows = await res.json();

  const items = rows.map((r: any) => ({
    slug: r.slug,
    title: r.title,
    category: r.category,
    priceUSDC: r.price_usdc?.toFixed(4),
    aimSummary: r.aim_summary?.corePurpose || "",
    accessUrl: `/api/x402/spec/${r.slug}`
  }));

  return NextResponse.json({
    status: "success",
    protocol: "x402",
    network: "base",
    currency: "USDC",
    recipient: process.env.NEXT_PUBLIC_X402_REVENUE_WALLET,
    facilitatorUrl: "https://base.facilitator.x402.org",
    totalSpecs: items.length,
    items
  }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300"
    }
  });
}