export interface X402ArchitectureSpec {
  slug: string;
  title: string;
  priceUSDC: string;
  category: "frontend" | "fullstack" | "agent" | "infra";
  tags: string[];
  aim: {
    corePurpose: string;
    targetAudience: string;
    designSystem: string;
  };
  logic: {
    techStack: string[];
    primaryFeatures: string[];
    criticalRules: string[];
    directoryStructure: string;
    envTemplate: string[];
  };
  validation: {
    doneCriteria: string;
    testCases: string[];
    performanceTargets: {
      lcp: string;
      cls: string;
      fid: string;
    };
  };
}

export const X402_SPECS_CATALOG: Record<string, X402ArchitectureSpec> = {
  "nextjs16-supabase-auth": {
    slug: "nextjs16-supabase-auth",
    title: "Next.js 16 + Supabase Production SSR & Auth Blueprint",
    priceUSDC: "0.01",
    category: "fullstack",
    tags: ["Next.js 16", "React 19", "Supabase", "SSR", "Auth"],
    aim: {
      corePurpose: "쿠키 기반 안전한 세션 관리와 SSR 최적화를 지원하는 엔터프라이즈급 Next.js 16 보일러플레이트",
      targetAudience: "초기 빠른 프로덕션 론칭이 필요한 SaaS 개발자 및 AI 코딩 에이전트",
      designSystem: "Bauhaus Minimalist (High contrast, grid-focused)"
    },
    logic: {
      techStack: ["Next.js 16.1.1", "React 19.2.3", "@supabase/supabase-js 2.97.0", "Tailwind CSS v4", "Zod"],
      primaryFeatures: [
        "Server Components 기반 비동기 Supabase Client 주입",
        "Proxy Middleware를 통한 세션 갱신 및 토큰 자동 로테이션",
        "Row Level Security (RLS) 정책 템플릿 포함",
        "React 19 useActionState 기반 폼 액션 처리"
      ],
      criticalRules: [
        "Client Component에서는 절대로 SUPABASE_SERVICE_ROLE_KEY를 참조하지 말 것",
        "모든 Server Actions는 zod 스키마로 입력을 1차 검증할 것",
        "Next.js App Router dynamic route는 params Promise unwrap 패턴을 준수할 것"
      ],
      directoryStructure: `src/
├── app/
│   ├── (auth)/login/page.tsx
│   ├── api/auth/callback/route.ts
│   └── dashboard/page.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils.ts
└── types/database.types.ts`,
      envTemplate: [
        "NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...",
        "SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi..."
      ]
    },
    validation: {
      doneCriteria: "인증 플로우(로그인/회원가입/로그아웃) E2E 테스트 통과 및 Zero Build Error 달성",
      testCases: [
        "미인증 사용자의 /dashboard 접근 시 /login 리다이렉트 검증",
        "유효하지 않은 이메일 형식 가입 시도 시 Zod Validation Error 발생 확인",
        "세션 쿠키 만료 시 Middleware의 Refresh Token 갱신 성공 검증"
      ],
      performanceTargets: {
        lcp: "< 1.2s",
        cls: "0.0",
        fid: "< 50ms"
      }
    }
  },
  "agent-mcp-orchestration": {
    slug: "agent-mcp-orchestration",
    title: "Model Context Protocol (MCP) Multi-Agent Orchestrator",
    priceUSDC: "0.02",
    category: "agent",
    tags: ["MCP", "FastMCP", "Pydantic AI", "Multi-Agent"],
    aim: {
      corePurpose: "로컬 및 원격 도구를 MCP 표준으로 통합하여 에이전트 간 협업을 조율하는 오케스트레이터",
      targetAudience: "자율 M2M 시스템 및 복합 에이전트 파이프라인 개발자",
      designSystem: "Noir Terminal & Visual Stream UI"
    },
    logic: {
      techStack: ["Python 3.12", "Pydantic AI 2.32", "FastMCP 3.4", "HTTPX", "AsyncIO"],
      primaryFeatures: [
        "STDIO 및 SSE 기반 MCP 서버/클라이언트 양방향 브릿지",
        "Tool Execution Context 추적 및 Fallback 처리",
        "Pydantic 기반 Tool Definition 자동 변환"
      ],
      criticalRules: [
        "모든 도구의 입력과 출력은 Pydantic BaseModel로 엄격하게 직렬화할 것",
        "도구 실행 타임아웃은 기본 30초로 제한할 것"
      ],
      directoryStructure: `agent/
├── server/
│   └── mcp_server.py
├── client/
│   └── mcp_client.py
└── tools/
    ├── web_search.py
    └── code_eval.py`,
      envTemplate: [
        "MCP_TRANSPORT=sse",
        "MCP_PORT=8000"
      ]
    },
    validation: {
      doneCriteria: "에이전트가 3단계 복합 툴 호출 체인을 무결점으로 완수할 것",
      testCases: [
        "존재하지 않는 툴 호출 시 graceful error recovery 검증",
        "동시 10개 툴 요청 비동기 병렬 처리 레이턴시 측정"
      ],
      performanceTargets: {
        lcp: "N/A (Backend)",
        cls: "N/A",
        fid: "Latency < 200ms"
      }
    }
  }
};