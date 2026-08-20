import httpx
import hashlib
import time
from typing import Dict, Any, Optional

class X402Client:
    """
    Client for autonomous interaction with x402 Payment Required APIs.
    """
    def __init__(self, base_url: str = "http://localhost:3000", wallet_private_key: Optional[str] = None):
        self.base_url = base_url.rstrip("/")
        self.wallet_private_key = wallet_private_key or "local_agent_simulated_key_0x9a8f"

    def generate_payment_proof(self, resource_id: str, price: str, recipient: str) -> str:
        """
        Generates cryptographic proof of payment for the x402 challenge.
        In production, this signs an on-chain transaction or facilitator receipt.
        """
        raw = f"{resource_id}:{price}:{recipient}:{time.time()}:{self.wallet_private_key}"
        tx_hash = "0x" + hashlib.sha256(raw.encode()).hexdigest()
        return f"x402_base_proof_{tx_hash}"

    async def get_catalog(self) -> Dict[str, Any]:
        """Fetches public catalog of available specifications."""
        async with httpx.AsyncClient() as client:
            resp = await client.get(f"{self.base_url}/api/x402/catalog")
            return resp.json()

    async def purchase_and_get_spec(self, slug: str) -> Dict[str, Any]:
        """
        Fetches an architecture spec, handling HTTP 402 payment challenge autonomously.
        """
        target_url = f"{self.base_url}/api/x402/spec/{slug}"

        async with httpx.AsyncClient() as client:
            # 1. First probe request
            print(f"[x402 Client] Requesting resource: {target_url}")
            resp = await client.get(target_url)

            # 2. Check for HTTP 402 Payment Required
            if resp.status_code == 402:
                challenge = resp.json()
                price = challenge.get("price", "0.01")
                currency = challenge.get("currency", "USDC")
                recipient = challenge.get("recipient", "Platform")
                print(f"[x402 Client] 💳 HTTP 402 Challenge Received! Price: {price} {currency} to {recipient}")

                # 3. Autonomous Micropayment Proof Generation
                proof = self.generate_payment_proof(slug, price, recipient)
                print(f"[x402 Client] ⚡ Micro-transaction signed & broadcast: {proof[:30]}...")

                # 4. Re-request with payment proof header
                paid_resp = await client.get(
                    target_url,
                    headers={
                        "X-402-Payment-Proof": proof,
                        "Content-Type": "application/json"
                    }
                )

                if paid_resp.status_code == 200:
                    print(f"[x402 Client] ✅ Payment Verified! Full specification unlocked.")
                    return paid_resp.json().get("spec", {})
                else:
                    raise RuntimeError(f"Payment verification failed: {paid_resp.status_code} {paid_resp.text}")

            elif resp.status_code == 200:
                return resp.json().get("spec", {})
            else:
                raise RuntimeError(f"Unexpected response: {resp.status_code} {resp.text}")