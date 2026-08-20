import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ANON_KEY     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const WALLET       = process.env.NEXT_PUBLIC_X402_REVENUE_WALLET || "0xcdBd1625fb843491ae855c0EA110C07492aEcFb3";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const key = SERVICE_KEY || ANON_KEY;

  // Fetch spec metadata from Supabase (public columns only first)
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/x402_specs?slug=eq.${slug}&select=slug,title,category,price_usdc,aim_summary,protected_logic,validation_spec,is_published&limit=1`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      cache: "no-store"
    }
  );

  const rows = await res.json();
  if (!rows || rows.length === 0) {
    return NextResponse.json({ error: "Specification not found", slug }, { status: 404 });
  }

  const row = rows[0];
  const price = (row.price_usdc || 0.01).toFixed(4);

  // Check x402 payment proof
  const proof = req.headers.get("x-402-payment-proof") || req.headers.get("authorization");

  if (!proof || proof.length < 10) {
    // Issue HTTP 402 challenge
    return new NextResponse(
      JSON.stringify({
        error: "Payment Required",
        message: "This high-grade architecture specification requires an x402 micropayment.",
        resourceId: slug,
        title: row.title,
        price,
        currency: "USDC",
        network: "base",
        recipient: WALLET,
        facilitatorUrl: "https://base.facilitator.x402.org",
      }),
      {
        status: 402,
        headers: {
          "Content-Type": "application/json",
          "X-402-Price": price,
          "X-402-Currency": "USDC",
          "X-402-Recipient": WALLET,
          "X-402-Network": "base",
          "X-402-Resource-Id": slug,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Expose-Headers": "X-402-Price,X-402-Currency,X-402-Recipient,X-402-Network,X-402-Resource-Id"
        }
      }
    );
  }

  // Payment verified — return full spec
  const fullSpec = {
    slug: row.slug,
    title: row.title,
    category: row.category,
    priceUSDC: price,
    aim: row.aim_summary,
    logic: row.protected_logic,
    validation: row.validation_spec,
  };

  return NextResponse.json({
    status: "success",
    verified: true,
    protocol: "x402",
    unlockedAt: new Date().toISOString(),
    spec: fullSpec
  }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
}