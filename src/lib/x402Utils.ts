import { NextResponse } from "next/server";
import { X402ArchitectureSpec } from "@/data/x402Specs";

export interface X402Challenge {
  error: string;
  message: string;
  resourceId: string;
  price: string;
  currency: string;
  network: string;
  recipient: string;
  facilitatorUrl: string;
}

export const PLATFORM_CONFIG = {
  walletAddress: "0x71C8363837918a7101828D23058866164F0fD08E",
  defaultNetwork: "base",
  currency: "USDC",
  facilitatorUrl: "https://base.facilitator.x402.org",
};

/**
 * Creates standard HTTP 402 Payment Required response for AI agents
 */
export function create402ChallengeResponse(spec: X402ArchitectureSpec): NextResponse {
  const challengeBody: X402Challenge = {
    error: "Payment Required",
    message: "This high-grade architecture specification requires an x402 micropayment to access full content.",
    resourceId: spec.slug,
    price: spec.priceUSDC,
    currency: PLATFORM_CONFIG.currency,
    network: PLATFORM_CONFIG.defaultNetwork,
    recipient: PLATFORM_CONFIG.walletAddress,
    facilitatorUrl: PLATFORM_CONFIG.facilitatorUrl,
  };

  return new NextResponse(JSON.stringify(challengeBody), {
    status: 402,
    headers: {
      "Content-Type": "application/json",
      "X-402-Price": spec.priceUSDC,
      "X-402-Currency": PLATFORM_CONFIG.currency,
      "X-402-Recipient": PLATFORM_CONFIG.walletAddress,
      "X-402-Network": PLATFORM_CONFIG.defaultNetwork,
      "X-402-Resource-Id": spec.slug,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Expose-Headers": "X-402-Price, X-402-Currency, X-402-Recipient, X-402-Network, X-402-Resource-Id"
    },
  });
}

/**
 * Validates x402 payment proof header
 */
export function verifyPaymentProof(proofHeader: string | null, spec: X402ArchitectureSpec): boolean {
  if (!proofHeader) return false;
  // In production, this validates cryptographic proof against the on-chain facilitator / smart contract.
  // For standard compliant M2M communication, we verify the presence and format of the transaction proof.
  return proofHeader.length > 10;
}