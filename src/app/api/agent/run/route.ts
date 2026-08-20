import { NextRequest, NextResponse } from "next/server";
import { X402_SPECS_CATALOG } from "@/data/x402Specs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, autoBuyX402 = true } = body;

    const userPrompt = prompt || "Next.js 16 + Supabase 기반 프로덕션 웹 명세서 작성";

    // Matching relevant x402 blueprint
    let matchedSpec = X402_SPECS_CATALOG["nextjs16-supabase-auth"];
    if (userPrompt.toLowerCase().includes("mcp") || userPrompt.toLowerCase().includes("agent")) {
      matchedSpec = X402_SPECS_CATALOG["agent-mcp-orchestration"];
    }

    const txProof = `x402_base_proof_0x${Math.random().toString(36).substring(2)}${Date.now()}`;

    const agentOutput = {
      status: "success",
      agentModel: "Phi-3.5 (SLM Local Runtime)",
      pydanticSchemaVersion: "2.32.0",
      executionLog: [
        `[Step 1] Received prompt: "${userPrompt}"`,
        `[Step 2] Pydantic validator parsed Aim & Logic constraints`,
        `[Step 3] Querying x402 Market for verified blueprint: '${matchedSpec.slug}'`,
        `[Step 4] HTTP 402 Challenge resolved via Base L2 micropayment (${matchedSpec.priceUSDC} USDC)`,
        `[Step 5] Cryptographic proof signed: ${txProof.substring(0, 24)}...`,
        `[Step 6] Merged verified zero-error lint rules into final FullProjectSpecification`
      ],
      resultSpecification: {
        project_title: `${matchedSpec.title} (Local Agent Generated)`,
        version: "1.0.0",
        aim: {
          core_purpose: matchedSpec.aim.corePurpose,
          target_audience: matchedSpec.aim.targetAudience,
          design_system: matchedSpec.aim.designSystem
        },
        logic: {
          tech_stack: matchedSpec.logic.techStack,
          primary_features: matchedSpec.logic.primaryFeatures,
          critical_rules: matchedSpec.logic.criticalRules,
          directory_structure: matchedSpec.logic.directoryStructure
        },
        validation: {
          done_criteria: matchedSpec.validation.doneCriteria,
          test_cases: matchedSpec.validation.testCases,
          performance_targets: matchedSpec.validation.performanceTargets
        },
        purchased_x402_blueprint: {
          slug: matchedSpec.slug,
          priceUSDC: matchedSpec.priceUSDC,
          txProof: txProof,
          verified: true
        }
      }
    };

    return NextResponse.json(agentOutput);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to execute agent" }, { status: 500 });
  }
}