import asyncio
import json
import os
from typing import Dict, Any, Optional
from pydantic_ai import Agent, RunContext
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.models.test import TestModel

from models import FullProjectSpecification, AimCheck, LogicCheck, ValidationCheck
from x402_client import X402Client

# 1. Initialize x402 Client
x402_client = X402Client(base_url=os.getenv("VIBECODING_API_URL", "http://localhost:3000"))

# 2. Select Model (Phi-3.5 on local Ollama by default, with fallback support)
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434/v1")
USE_TEST_MODEL = os.getenv("USE_TEST_MODEL", "false").lower() == "true"

if USE_TEST_MODEL:
    agent_model = TestModel()
else:
    # Connect to local Ollama Phi-3.5 instance (OpenAI-compatible)
    agent_model = OpenAIModel(
        model_name=os.getenv("MODEL_NAME", "phi3.5:latest"),
        base_url=OLLAMA_BASE_URL,
        api_key="ollama"
    )

# 3. Define the Architecture Director Agent
spec_director_agent = Agent(
    agent_model,
    result_type=FullProjectSpecification,
    system_prompt=(
        "당신은 VibeCodingMap 아키텍처 디렉터 AI입니다.\n"
        "당신의 역할은 사용자의 요구사항을 분석하여 AIM, LOGIC, VALIDATION 3단계의 무결점 명세서를 구조화하는 것입니다.\n\n"
        "지침:\n"
        "1. 프로젝트에 검증된 최신 스택(Next.js 16, Supabase, MCP 등)이 필요하면, `search_x402_catalog` 툴을 통해 사용 가능한 명세서를 조회하십시오.\n"
        "2. 적합한 유료 명세서가 발견되면 `buy_x402_spec` 툴을 실행하여 x402 프로토콜로 마이크로 결제를 수행하고 원본 명세서를 획득하십시오.\n"
        "3. 구매한 블루프린트의 린트 룰과 구조를 통합하여 최종 FullProjectSpecification Pydantic 모델로 반환하십시오."
    )
)

# 4. Register Agent Tools
@spec_director_agent.tool
async def search_x402_catalog(ctx: RunContext) -> Dict[str, Any]:
    """
    VibeCodingMap x402 지식 마켓에서 구매 가능한 검증된 아키텍처 명세서 카탈로그 목록을 조회합니다.
    """
    try:
        return await x402_client.get_catalog()
    except Exception as e:
        return {"error": f"Failed to fetch catalog: {str(e)}"}

@spec_director_agent.tool
async def buy_x402_spec(ctx: RunContext, slug: str) -> Dict[str, Any]:
    """
    x402 프로토콜을 통해 특정 슬러그(예: 'nextjs16-supabase-auth')의 검증된 아키텍처 명세서를 마이크로 결제 후 구매합니다.
    """
    try:
        return await x402_client.purchase_and_get_spec(slug)
    except Exception as e:
        return {"error": f"x402 Purchase failed: {str(e)}"}

async def run_director(user_requirement: str) -> FullProjectSpecification:
    print(f"\n=======================================================")
    print(f"🚀 [VibeCoding Director Agent 가동]")
    print(f"📝 사용자 요구사항: {user_requirement}")
    print(f"=======================================================\n")

    result = await spec_director_agent.run(user_requirement)
    return result.data

if __name__ == "__main__":
    prompt = "Next.js 16과 Supabase를 활용한 안전한 인증 및 SSR 대시보드 시스템을 구축하려 합니다. 검증된 아키텍처 명세서를 탐색하여 결합해 주세요."
    spec = asyncio.run(run_director(prompt))
    print("\n✅ [최종 완성된 Pydantic 구조화 명세서]")
    print(spec.model_dump_json(indent=2))