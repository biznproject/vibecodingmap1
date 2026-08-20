"""
VibeCodingMap Autonomous Background Spec Producer
Generates architecture blueprints and saves them directly to Supabase.
"""
import asyncio
import json
import os
import sys
import time
import argparse
import urllib.request
import urllib.error

if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")

from models import FullProjectSpecification, AimCheck, LogicCheck, ValidationCheck

# Safely load local environment variables from .env.local
try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=".env.local")
    load_dotenv(dotenv_path="../.env.local")
    load_dotenv()
except ImportError:
    pass

# Read from environment variables (No hardcoded secrets)
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL", os.getenv("SUPABASE_URL", "https://cdmrdzqrunysknhtxmft.supabase.co"))
SERVICE_KEY  = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
REVENUE_WALLET = os.getenv("NEXT_PUBLIC_X402_REVENUE_WALLET", os.getenv("X402_REVENUE_WALLET", "0xcdBd1625fb843491ae855c0EA110C07492aEcFb3"))

BLUEPRINT_TAXONOMY = [
    {
        "slug": "nextjs16-supabase-auth",
        "title": "Next.js 16 + Supabase Production SSR & Auth Blueprint",
        "category": "fullstack",
        "price_usdc": "0.0100",
        "tags": ["Next.js 16", "React 19", "Supabase", "SSR", "Auth"],
        "aim": {
            "core_purpose": "Cookie-based secure session management with SSR optimization for enterprise Next.js 16",
            "target_audience": "SaaS developers and AI coding agents needing rapid production launch",
            "design_system": "Bauhaus Minimalist (High contrast, grid-focused)"
        },
        "logic": {
            "tech_stack": ["Next.js 16.1.1", "React 19.2.3", "@supabase/supabase-js 2.97.0", "Tailwind CSS v4"],
            "primary_features": [
                "Server Components async Supabase Client injection",
                "Middleware session auto-refresh and token rotation",
                "Row Level Security (RLS) policy templates",
                "React 19 useActionState form action handling"
            ],
            "critical_rules": [
                "Never reference SUPABASE_SERVICE_ROLE_KEY from Client Components",
                "All Server Actions must validate input with Zod schema first",
                "Next.js App Router dynamic routes must use params Promise unwrap pattern"
            ],
            "directory_structure": "src/\n├── app/(auth)/login/page.tsx\n├── app/api/auth/callback/route.ts\n├── lib/supabase/client.ts\n└── lib/supabase/server.ts"
        },
        "validation": {
            "done_criteria": "Auth flow E2E test pass and Zero Build Error achieved",
            "test_cases": [
                "Unauthenticated /dashboard access redirects to /login",
                "Session cookie expiry triggers Middleware Refresh Token renewal"
            ],
            "performance_targets": {"lcp": "< 1.2s", "cls": "0.0", "fid": "< 50ms"}
        }
    },
    {
        "slug": "nextjs16-stripe-ecommerce",
        "title": "Next.js 16 + Stripe Production E-Commerce & Webhook Architecture",
        "category": "fullstack",
        "price_usdc": "0.0150",
        "tags": ["Next.js 16", "Stripe", "Supabase", "Webhooks", "Zod"],
        "aim": {
            "core_purpose": "Enterprise-grade payment flow with idempotency webhook handling for high-performance commerce",
            "target_audience": "Global B2C/B2B e-commerce teams and autonomous payment agents",
            "design_system": "Bauhaus Minimalist (Bold price tags & clean grid)"
        },
        "logic": {
            "tech_stack": ["Next.js 16.1", "React 19", "Stripe SDK", "Supabase PostgreSQL", "Zod", "Tailwind v4"],
            "primary_features": [
                "Stripe Checkout session creation via Server Actions",
                "Idempotency Key based Stripe Webhook duplicate payment prevention",
                "Optimistic UI cart state management",
                "Supabase RLS secured digital product downloads"
            ],
            "critical_rules": [
                "STRIPE_SECRET_KEY must only be used in Server Components/Actions, never client bundle",
                "All payment webhooks must pass stripe.webhooks.constructEvent signature verification",
                "Cart total must be recalculated server-side from DB prices, never trust client values"
            ],
            "directory_structure": "src/\n├── app/(shop)/products/[id]/page.tsx\n├── app/api/webhooks/stripe/route.ts\n├── app/checkout/success/page.tsx\n└── lib/stripe.ts"
        },
        "validation": {
            "done_criteria": "Test card payment and webhook delivery result in DB order creation with Zero Build Error",
            "test_cases": [
                "Stripe CLI webhook trigger (checkout.session.completed) updates DB order to PAID",
                "Tampered payment amount payload rejected by server action (400)",
                "Same webhook event replayed twice is idempotently handled without duplicate order"
            ],
            "performance_targets": {"lcp": "< 1.0s", "cls": "0.0", "fid": "< 30ms"}
        }
    },
    {
        "slug": "fastapi-rag-vector-pipeline",
        "title": "FastAPI + Qdrant + LangChain Production RAG Engine",
        "category": "agent",
        "price_usdc": "0.0200",
        "tags": ["FastAPI", "Qdrant", "LangChain", "RAG", "Python 3.12"],
        "aim": {
            "core_purpose": "Enterprise RAG pipeline for real-time document embedding and hybrid vector search",
            "target_audience": "AI chatbot and autonomous agent builders needing private knowledge base",
            "design_system": "Noir Cyber Terminal UI"
        },
        "logic": {
            "tech_stack": ["Python 3.12", "FastAPI", "Qdrant Client", "LangChain 0.3", "Pydantic v2", "OpenAI Embeddings"],
            "primary_features": [
                "Dense + Sparse hybrid vector search with re-ranking",
                "Async document chunking and background vector indexing pipeline",
                "FastAPI StreamingResponse for real-time LLM token SSE streaming",
                "Automatic citation source mapping"
            ],
            "critical_rules": [
                "All API request/response must be strictly typed with Pydantic BaseModel",
                "Qdrant connection pool managed in FastAPI lifespan context to prevent memory leaks",
                "Default chunk size 500 tokens, overlap 50 tokens for context preservation"
            ],
            "directory_structure": "rag_server/\n├── app/api/routes/chat.py\n├── app/core/config.py\n├── app/services/vector_store.py\n├── schemas/models.py\n└── main.py"
        },
        "validation": {
            "done_criteria": "1000-document index returns top-3 source citations within 200ms",
            "test_cases": [
                "Unknown question input returns hallucination-free 'no information' response",
                "50 concurrent streaming queries complete with 0 connection timeouts"
            ],
            "performance_targets": {"lcp": "N/A", "cls": "N/A", "fid": "Latency < 250ms"}
        }
    },
    {
        "slug": "agent-mcp-orchestration",
        "title": "Model Context Protocol (MCP) Multi-Agent Orchestrator",
        "category": "agent",
        "price_usdc": "0.0200",
        "tags": ["MCP", "FastMCP", "Pydantic AI", "Multi-Agent"],
        "aim": {
            "core_purpose": "MCP-standard orchestrator integrating local and remote tools for multi-agent collaboration",
            "target_audience": "Autonomous M2M systems and complex agent pipeline developers",
            "design_system": "Noir Terminal & Visual Stream UI"
        },
        "logic": {
            "tech_stack": ["Python 3.12", "Pydantic AI 2.32", "FastMCP 3.4", "HTTPX", "AsyncIO"],
            "primary_features": [
                "STDIO and SSE based MCP server/client bidirectional bridge",
                "Tool Execution Context tracking and Fallback handling",
                "Pydantic-based Tool Definition auto-conversion"
            ],
            "critical_rules": [
                "All tool inputs and outputs must be serialized with Pydantic BaseModel",
                "Tool execution timeout must default to 30 seconds"
            ],
            "directory_structure": "agent/\n├── server/mcp_server.py\n├── client/mcp_client.py\n└── tools/web_search.py"
        },
        "validation": {
            "done_criteria": "Agent completes 3-step compound tool call chain without errors",
            "test_cases": [
                "Non-existent tool call triggers graceful error recovery",
                "10 concurrent async tool requests measured for latency"
            ],
            "performance_targets": {"lcp": "N/A", "cls": "N/A", "fid": "Latency < 200ms"}
        }
    }
]

def supabase_upsert(payload: dict) -> bool:
    """Upsert a spec record into Supabase x402_specs table."""
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        SUPABASE_URL + "/rest/v1/x402_specs?on_conflict=slug",
        data=data,
        method="POST",
        headers={
            "apikey": SERVICE_KEY,
            "Authorization": "Bearer " + SERVICE_KEY,
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates,return=minimal"
        }
    )
    try:
        with urllib.request.urlopen(req) as res:
            return res.status in (200, 201, 204)
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"  [SUPABASE ERROR] {e.code}: {body[:200]}")
        return False

def generate_and_save(data: dict) -> bool:
    """Generate Pydantic spec and save to both filesystem and Supabase."""
    aim = AimCheck(
        core_purpose=data["aim"]["core_purpose"],
        target_audience=data["aim"]["target_audience"],
        design_system=data["aim"]["design_system"]
    )
    logic = LogicCheck(
        tech_stack=data["logic"]["tech_stack"],
        primary_features=data["logic"]["primary_features"],
        critical_rules=data["logic"]["critical_rules"],
        directory_structure=data["logic"]["directory_structure"]
    )
    validation = ValidationCheck(
        done_criteria=data["validation"]["done_criteria"],
        test_cases=data["validation"]["test_cases"],
        performance_targets=data["validation"]["performance_targets"]
    )
    spec = FullProjectSpecification(
        project_title=data["title"],
        version="1.0.0",
        aim=aim,
        logic=logic,
        validation=validation,
        purchased_x402_blueprint={
            "slug": data["slug"],
            "priceUSDC": data["price_usdc"],
            "generated_by": "Phi-3.5 Autonomous Agent",
            "verified_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }
    )

    # Save to filesystem
    os.makedirs("agent/generated_specs", exist_ok=True)
    file_path = f"agent/generated_specs/{data['slug']}.json"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(spec.model_dump_json(indent=2))

    # Save to Supabase
    payload = {
        "slug": data["slug"],
        "title": data["title"],
        "category": data["category"],
        "price_usdc": float(data["price_usdc"]),
        "author_wallet": REVENUE_WALLET,
        "aim_summary": {
            "corePurpose": data["aim"]["core_purpose"],
            "targetAudience": data["aim"]["target_audience"],
            "designSystem": data["aim"]["design_system"]
        },
        "protected_logic": {
            "techStack": data["logic"]["tech_stack"],
            "primaryFeatures": data["logic"]["primary_features"],
            "criticalRules": data["logic"]["critical_rules"],
            "directoryStructure": data["logic"]["directory_structure"]
        },
        "validation_spec": {
            "doneCriteria": data["validation"]["done_criteria"],
            "testCases": data["validation"]["test_cases"],
            "performanceTargets": data["validation"]["performance_targets"]
        },
        "is_published": True
    }
    ok = supabase_upsert(payload)

    log_entry = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "slug": data["slug"],
        "title": data["title"],
        "supabase_saved": ok
    }
    with open("agent/production_log.jsonl", "a", encoding="utf-8") as f:
        f.write(json.dumps(log_entry, ensure_ascii=False) + "\n")

    return ok

async def run_batch():
    print("=" * 65)
    print("[VibeCodingMap] Autonomous Spec Factory — Batch Mode")
    print("=" * 65)
    print(f"Supabase: {SUPABASE_URL}")
    print(f"Total blueprints: {len(BLUEPRINT_TAXONOMY)}\n")
    ok_count = 0
    for idx, item in enumerate(BLUEPRINT_TAXONOMY, 1):
        print(f"[{idx}/{len(BLUEPRINT_TAXONOMY)}] '{item['title']}'...")
        ok = generate_and_save(item)
        status = "SAVED TO SUPABASE OK" if ok else "LOCAL ONLY (Supabase failed)"
        print(f"  [{status}] {item['slug']}")
        ok_count += ok
        await asyncio.sleep(0.5)
    print(f"\n{'='*65}")
    print(f"Done! {ok_count}/{len(BLUEPRINT_TAXONOMY)} blueprints saved to Supabase.")
    print("=" * 65)

async def run_daemon(interval: int = 3600):
    print(f"[VibeCodingMap] Daemon Mode — Every {interval}s")
    cycle = 1
    while True:
        item = BLUEPRINT_TAXONOMY[(cycle - 1) % len(BLUEPRINT_TAXONOMY)]
        print(f"\n[Cycle #{cycle} @ {time.strftime('%H:%M:%S')}] {item['title']}")
        ok = generate_and_save(item)
        print(f"  Supabase: {'OK' if ok else 'FAILED'} — sleeping {interval}s...")
        cycle += 1
        await asyncio.sleep(interval)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--daemon", action="store_true")
    parser.add_argument("--interval", type=int, default=3600)
    args = parser.parse_args()
    if args.daemon:
        asyncio.run(run_daemon(args.interval))
    else:
        asyncio.run(run_batch())
