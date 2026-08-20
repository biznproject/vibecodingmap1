import asyncio
import json
import sys

# Ensure UTF-8 output encoding on Windows
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

from models import FullProjectSpecification, AimCheck, LogicCheck, ValidationCheck
from x402_client import X402Client

async def run_simulation():
    print("=" * 65)
    print("[VibeCoding x402 + Pydantic AI E2E Simulation]")
    print("=" * 65)

    # 1. Initialize Client
    client = X402Client(base_url="http://localhost:3000")

    # 2. Step 1: Agent drafts initial local spec
    print("\n[Step 1] Phi-3.5 Agent creates preliminary specification draft...")
    aim = AimCheck(
        core_purpose="안전한 쿠키 기반 세션 인증 및 고성능 SSR 대시보드 구축",
        target_audience="프로덕션 SaaS 개발자 및 AI 코딩 에이전트",
        design_system="Bauhaus Functional Minimalist"
    )
    print(f"  [AIM CHECK] {aim.core_purpose}")

    # 3. Step 2: Agent searches for verified blueprints
    print("\n[Step 2] Agent identifies need for verified Next.js 16 + Supabase blueprint.")
    target_slug = "nextjs16-supabase-auth"
    print(f"  [Target Blueprint] '{target_slug}'")

    # 4. Step 3: x402 Protocol Purchase
    print("\n[Step 3] Executing x402 Autonomous Purchase Tool...")
    price = "0.01"
    currency = "USDC"
    recipient = "0x71C8363837918a7101828D23058866164F0fD08E"
    
    print(f"  >> HTTP/1.1 402 Payment Required")
    print(f"  >> Headers: X-402-Price: {price} {currency}, X-402-Recipient: {recipient}")
    
    proof = client.generate_payment_proof(target_slug, price, recipient)
    print(f"  >> Agent signs transaction: {proof}")
    print(f"  >> HTTP/1.1 200 OK (Payment Verified by Platform Facilitator)")

    # 5. Step 4: Construct verified final full specification
    purchased_spec_data = {
        "title": "Next.js 16 + Supabase Production SSR & Auth Blueprint",
        "priceUSDC": "0.01",
        "criticalRules": [
            "Client Component에서는 절대로 SUPABASE_SERVICE_ROLE_KEY를 참조하지 말 것",
            "모든 Server Actions는 zod 스키마로 입력을 1차 검증할 것",
            "Next.js App Router dynamic route는 params Promise unwrap 패턴을 준수할 것"
        ],
        "directoryStructure": "src/app/(auth)/login/page.tsx\nsrc/lib/supabase/client.ts\nsrc/lib/supabase/server.ts"
    }

    logic = LogicCheck(
        tech_stack=["Next.js 16.1.1", "React 19.2.3", "@supabase/supabase-js 2.97.0", "Tailwind CSS v4"],
        primary_features=[
            "Server Components 기반 비동기 Supabase Client 주입",
            "Middleware 세션 자동 갱신",
            "React 19 useActionState 폼 액션"
        ],
        critical_rules=purchased_spec_data["criticalRules"],
        directory_structure=purchased_spec_data["directoryStructure"]
    )

    validation = ValidationCheck(
        done_criteria="인증 플로우 E2E 테스트 통과 및 Zero Build Error 달성",
        test_cases=[
            "미인증 사용자 /dashboard 접근 시 /login 리다이렉트 확인",
            "세션 쿠키 만료 시 Middleware Refresh Token 갱신 검증"
        ],
        performance_targets={"lcp": "< 1.2s", "cls": "0.0", "fid": "< 50ms"}
    )

    full_spec = FullProjectSpecification(
        project_title="VibeCoding Enterprise Dashboard with Supabase Auth",
        version="1.0.0",
        aim=aim,
        logic=logic,
        validation=validation,
        purchased_x402_blueprint=purchased_spec_data
    )

    print("\n" + "=" * 65)
    print("[SUCCESS] Final Pydantic Type-safe Specification:")
    print("=" * 65)
    print(full_spec.model_dump_json(indent=2))

    with open("agent/generated_spec.json", "w", encoding="utf-8") as f:
        f.write(full_spec.model_dump_json(indent=2))
    print("\n[FILE SAVED] Output written to 'agent/generated_spec.json'")

if __name__ == "__main__":
    asyncio.run(run_simulation())