import { NextRequest, NextResponse } from "next/server";
import { X402_SPECS_CATALOG } from "@/data/x402Specs";
import { create402ChallengeResponse, verifyPaymentProof } from "@/lib/x402Utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const spec = X402_SPECS_CATALOG[slug];

  if (!spec) {
    return NextResponse.json(
      { error: "NotFound", message: `Architecture specification '${slug}' does not exist.` },
      { status: 404 }
    );
  }

  // 1. Check for x402 payment proof in headers
  const proofHeader = req.headers.get("x-402-payment-proof") || req.headers.get("authorization");

  // 2. If proof is missing or invalid, issue HTTP 402 Challenge
  if (!proofHeader || !verifyPaymentProof(proofHeader, spec)) {
    return create402ChallengeResponse(spec);
  }

  // 3. Payment Verified: Deliver full high-grade specification
  return NextResponse.json({
    status: "success",
    verified: true,
    protocol: "x402",
    unlockedAt: new Date().toISOString(),
    spec: spec
  }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
}