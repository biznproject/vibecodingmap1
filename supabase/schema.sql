-- ==============================================================================
-- VIBECODINGMAP x402 PROTOCOL SUPABASE SCHEMA
-- ==============================================================================

-- 1. x402 Verified Specifications Store
CREATE TABLE IF NOT EXISTS public.x402_specs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('frontend', 'fullstack', 'agent', 'infra')),
    price_usdc NUMERIC(8, 4) NOT NULL DEFAULT 0.0100,
    author_wallet TEXT NOT NULL,
    aim_summary JSONB NOT NULL,
    protected_logic JSONB NOT NULL,
    validation_spec JSONB NOT NULL,
    sales_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.x402_specs ENABLE ROW LEVEL SECURITY;

-- Public read for catalog metadata (aim_summary, title, price, slug)
CREATE POLICY "Public specs metadata are viewable by everyone" 
ON public.x402_specs FOR SELECT 
USING (is_published = true);

-- 2. x402 Transactions Ledger (M2M On-Chain Settlement Records)
CREATE TABLE IF NOT EXISTS public.x402_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    spec_slug TEXT NOT NULL REFERENCES public.x402_specs(slug) ON DELETE CASCADE,
    payer_address TEXT NOT NULL,
    tx_hash TEXT UNIQUE NOT NULL,
    amount_usdc NUMERIC(8, 4) NOT NULL,
    network TEXT NOT NULL DEFAULT 'base',
    verified BOOLEAN DEFAULT true,
    client_agent_name TEXT DEFAULT 'phi3.5-pydantic-agent',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.x402_transactions ENABLE ROW LEVEL SECURITY;

-- Public can view recent verified transactions for transparency
CREATE POLICY "Public transactions viewable" 
ON public.x402_transactions FOR SELECT 
USING (verified = true);

-- 3. Seed initial high-grade specs
INSERT INTO public.x402_specs (slug, title, category, price_usdc, author_wallet, aim_summary, protected_logic, validation_spec)
VALUES 
(
  'nextjs16-supabase-auth',
  'Next.js 16 + Supabase Production SSR & Auth Blueprint',
  'fullstack',
  0.0100,
  '0xcdBd1625fb843491ae855c0EA110C07492aEcFb3',
  '{"corePurpose": "쿠키 기반 안전한 세션 관리와 SSR 최적화를 지원하는 엔터프라이즈급 Next.js 16 보일러플레이트", "designSystem": "Bauhaus Minimalist"}',
  '{"techStack": ["Next.js 16.1.1", "React 19.2.3", "@supabase/supabase-js", "Tailwind v4"], "criticalRules": ["Client Component에서 SUPABASE_SERVICE_ROLE_KEY 참조 금지", "Server Actions zod 스키마 검증 필수"]}',
  '{"doneCriteria": "인증 플로우 E2E 테스트 통과 및 Zero Build Error", "performanceTargets": {"lcp": "< 1.2s", "cls": "0.0"}}'
),
(
  'agent-mcp-orchestration',
  'Model Context Protocol (MCP) Multi-Agent Orchestrator',
  'agent',
  0.0200,
  '0xcdBd1625fb843491ae855c0EA110C07492aEcFb3',
  '{"corePurpose": "로컬 및 원격 도구를 MCP 표준으로 통합하여 에이전트 간 협업을 조율하는 오케스트레이터", "designSystem": "Noir Terminal"}',
  '{"techStack": ["Python 3.12", "Pydantic AI 2.32", "FastMCP 3.4", "HTTPX"], "criticalRules": ["모든 입출력 Pydantic BaseModel 직렬화", "타임아웃 30초 제한"]}',
  '{"doneCriteria": "복합 툴 호출 체인 무결점 완수", "performanceTargets": {"latency": "< 200ms"}}'
)
ON CONFLICT (slug) DO NOTHING;