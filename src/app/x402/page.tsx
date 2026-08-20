"use client";

import React, { useState, useEffect } from "react";
import { X402_SPECS_CATALOG, X402ArchitectureSpec } from "@/data/x402Specs";
import { Cpu, Terminal, ShieldCheck, Zap, Lock, Unlock, Copy, Check, Power, Send, Play, Bot, RefreshCw } from "lucide-react";

export default function X402MarketplacePage() {
  // Local Agent ON/OFF State
  const [isAgentActive, setIsAgentActive] = useState<boolean>(true);
  const [agentPrompt, setAgentPrompt] = useState<string>("Next.js 16과 Supabase를 연동한 SSR 대시보드 명세서를 작성하고 x402 룰셋을 구매해줘");
  const [isAgentRunning, setIsAgentRunning] = useState<boolean>(false);
  const [agentLogs, setAgentLogs] = useState<string[]>([
    "[System] Local Agent Environment initialized (Python 3.12 + Pydantic AI 2.32)",
    "[System] Phi-3.5 engine standby on localhost:11434",
    "[System] x402 Protocol Client connected to Base L2"
  ]);
  const [agentResult, setAgentResult] = useState<any>(null);

  // Catalog State
  const [catalogSpecs, setCatalogSpecs] = useState<X402ArchitectureSpec[]>(
    Object.values(X402_SPECS_CATALOG)
  );
  const [selectedSpec, setSelectedSpec] = useState<X402ArchitectureSpec>(
    Object.values(X402_SPECS_CATALOG)[0]
  );
  const [simulatedState, setSimulatedState] = useState<"locked" | "challenging" | "unlocked">("locked");
  const [unlockedPayload, setUnlockedPayload] = useState<any>(null);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Dynamic Catalog Fetch
  useEffect(() => {
    async function loadCatalog() {
      try {
        const res = await fetch("/api/x402/catalog");
        const data = await res.json();
        if (data.status === "success" && data.items) {
          const fetchedSpecs = data.items.map((item: any) => ({
            slug: item.slug,
            title: item.title,
            category: item.category,
            priceUSDC: item.priceUSDC,
            tags: item.tags || [],
            aim: {
              corePurpose: item.aimSummary,
              targetAudience: "Autonomous M2M Coding Agents",
              designSystem: "Modern Bauhaus Grid"
            },
            logic: {
              techStack: [],
              primaryFeatures: [],
              criticalRules: [],
              directoryStructure: "",
              envTemplate: []
            },
            validation: {
              doneCriteria: "",
              testCases: [],
              performanceTargets: { lcp: "", cls: "", fid: "" }
            }
          }));
          setCatalogSpecs(fetchedSpecs);
          if (fetchedSpecs.length > 0) {
            setSelectedSpec(fetchedSpecs[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load live catalog from Supabase:", err);
      }
    }
    loadCatalog();
  }, []);

  // Trigger Local Agent Run
  const handleRunLocalAgent = async () => {
    if (!isAgentActive || isAgentRunning) return;
    setIsAgentRunning(true);
    setAgentLogs(prev => [...prev, `\n> [User Task] ${agentPrompt}`]);

    try {
      const res = await fetch("/api/agent/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: agentPrompt })
      });
      const data = await res.json();

      if (data.executionLog) {
        data.executionLog.forEach((log: string, idx: number) => {
          setTimeout(() => {
            setAgentLogs(prev => [...prev, log]);
          }, (idx + 1) * 300);
        });
      }

      setTimeout(() => {
        setAgentResult(data.resultSpecification);
        setIsAgentRunning(false);
      }, (data.executionLog?.length || 1) * 300 + 400);

    } catch (e: any) {
      setAgentLogs(prev => [...prev, `[Error] Agent execution failed: ${e.message}`]);
      setIsAgentRunning(false);
    }
  };

  const handleSimulatePayment = async () => {
    setSimulatedState("challenging");
    setTimeout(async () => {
      try {
        const proof = "x402_base_proof_" + Math.random().toString(36).substring(2);
        const res = await fetch(`/api/x402/spec/${selectedSpec.slug}`, {
          headers: { "X-402-Payment-Proof": proof }
        });
        const data = await res.json();
        setUnlockedPayload(data.spec || selectedSpec);
        setSimulatedState("unlocked");
      } catch (e) {
        setUnlockedPayload(selectedSpec);
        setSimulatedState("unlocked");
      }
    }, 1000);
  };

  const curlCommand = `curl -i -H "X-402-Payment-Proof: x402_base_proof_0x..." \\
  https://vibecodingmap.com/api/x402/spec/${selectedSpec.slug}`;

  const copyToClipboard = (text: string, type: "curl" | "json") => {
    navigator.clipboard.writeText(text);
    if (type === "curl") {
      setCopiedCurl(true);
      setTimeout(() => setCopiedCurl(false), 2000);
    } else {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 pt-28 pb-24 px-6 max-w-6xl mx-auto">
      
      {/* Top Header */}
      <div className="mb-10 border-b-4 border-white/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-4 bg-cyan-400" />
            <div className="w-4 h-4 bg-bauhaus-yellow rounded-full" />
            <div className="w-4 h-4 bg-bauhaus-red" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
            <span className="text-xs font-mono tracking-widest text-emerald-400 font-bold uppercase">
              x402 Protocol Active (Base L2)
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Agent <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">M2M</span> Market
          </h1>
          <p className="text-sm font-mono text-gray-400 mt-2">
            Autonomous Machine-to-Machine Knowledge Marketplace & Local Phi-3.5 Controller
          </p>
        </div>

        {/* Local Agent Master Switch Button */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 px-5 rounded-2xl backdrop-blur-lg">
          <div className="text-right">
            <div className="text-[10px] font-mono text-gray-400 uppercase">Local Agent (Phi-3.5)</div>
            <div className={`text-xs font-mono font-bold ${isAgentActive ? "text-emerald-400" : "text-gray-500"}`}>
              {isAgentActive ? "● ACTIVE (Online)" : "○ STANDBY (Offline)"}
            </div>
          </div>
          <button
            onClick={() => setIsAgentActive(!isAgentActive)}
            className={`p-3 rounded-xl border font-mono text-xs font-bold flex items-center gap-2 transition-all ${
              isAgentActive
                ? "bg-emerald-500 text-black border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                : "bg-white/10 text-gray-400 border-white/10 hover:bg-white/20"
            }`}
          >
            <Power className="w-4 h-4" />
            {isAgentActive ? "AGENT ON" : "AGENT OFF"}
          </button>
        </div>
      </div>

      {/* SECTION 1: Local Agent Control Room (Phi-3.5 + Pydantic AI) */}
      <div className="mb-14 p-6 md:p-8 rounded-3xl bg-gradient-to-b from-indigo-950/30 to-black border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isAgentActive ? "bg-emerald-400 animate-ping" : "bg-gray-600"}`} />
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-400" /> Local Agent Control Deck (Phi-3.5 + Pydantic AI)
            </h2>
          </div>
          <span className="text-[11px] font-mono bg-black/60 border border-white/10 px-3 py-1 rounded-full text-cyan-300">
            Runtime: Python 3.12 | Pydantic AI 2.32 | FastMCP Ready
          </span>
        </div>

        {isAgentActive ? (
          <div className="space-y-6">
            {/* Input prompt area */}
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={agentPrompt}
                onChange={(e) => setAgentPrompt(e.target.value)}
                placeholder="에이전트에게 내릴 명세서 작성 지시를 입력하세요..."
                className="flex-1 bg-black/80 border border-white/15 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
              />
              <button
                onClick={handleRunLocalAgent}
                disabled={isAgentRunning}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
              >
                {isAgentRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {isAgentRunning ? "Executing..." : "작동 시작 (Run Agent)"}
              </button>
            </div>

            {/* Quick Prompt Presets */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-gray-400 font-mono">추천 프리셋:</span>
              <button
                onClick={() => setAgentPrompt("Next.js 16과 Supabase를 연동한 SSR 대시보드 명세서를 작성하고 x402 룰셋을 구매해줘")}
                className="bg-white/5 border border-white/10 hover:border-cyan-400/50 px-3 py-1 rounded-lg text-gray-300 font-mono text-[11px] transition-colors"
              >
                ⚡ Next.js 16 + Supabase Auth
              </button>
              <button
                onClick={() => setAgentPrompt("FastMCP 기반 Multi-Agent 오케스트레이터 아키텍처 명세서를 탐색하여 결합해줘")}
                className="bg-white/5 border border-white/10 hover:border-cyan-400/50 px-3 py-1 rounded-lg text-gray-300 font-mono text-[11px] transition-colors"
              >
                🤖 FastMCP Multi-Agent Orchestrator
              </button>
            </div>

            {/* Terminal Live Log Stream */}
            <div className="p-4 bg-black/90 border border-white/10 rounded-2xl font-mono text-xs text-gray-300 max-h-48 overflow-y-auto space-y-1">
              <div className="text-gray-500 mb-2">// --- Autonomous Agent Execution Stream ---</div>
              {agentLogs.map((log, idx) => (
                <div key={idx} className={log.startsWith(">") ? "text-cyan-400 font-bold" : log.includes("402") ? "text-bauhaus-yellow font-bold" : "text-gray-300"}>
                  {log}
                </div>
              ))}
            </div>

            {/* Structured Pydantic Output Display */}
            {agentResult && (
              <div className="mt-4 p-5 bg-black/80 border border-cyan-500/40 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Pydantic v2 Type-Safe Result (Verified)
                  </span>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(agentResult, null, 2), "json")}
                    className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedJson ? "Copied JSON!" : "Copy Spec JSON"}
                  </button>
                </div>
                <pre className="p-4 bg-black rounded-xl font-mono text-[11px] text-cyan-300 border border-white/5 overflow-x-auto max-h-72">
                  {JSON.stringify(agentResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500 font-mono text-xs">
            로컬 에이전트가 비활성화(OFF) 상태입니다. 우측 상단의 <span className="text-white font-bold">[AGENT ON]</span> 버튼을 눌러 활성화하세요.
          </div>
        )}
      </div>

      {/* SECTION 2: Catalog & x402 Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Catalog List */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-mono tracking-widest uppercase text-gray-400 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" /> Available Architecture Blueprints
          </h2>

          {catalogSpecs.map((spec) => {
            const isSelected = selectedSpec.slug === spec.slug;
            return (
              <div
                key={spec.slug}
                onClick={() => {
                  setSelectedSpec(spec);
                  setSimulatedState("locked");
                  setUnlockedPayload(null);
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white/10 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                    : "bg-white/5 border-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 font-bold">
                    {spec.category}
                  </span>
                  <span className="text-sm font-mono font-black text-emerald-400">
                    ${spec.priceUSDC} USDC
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-2">{spec.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                  {spec.aim.corePurpose}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {spec.tags.map((t) => (
                    <span key={t} className="text-[9px] font-mono bg-black/60 px-2 py-0.5 rounded text-gray-300 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Interactive x402 Protocol Inspector */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xs font-mono tracking-widest uppercase text-gray-400 flex items-center gap-2">
            <Zap className="w-4 h-4 text-bauhaus-yellow" /> x402 Protocol Live Inspector
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
            <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
              <div>
                <div className="text-[10px] font-mono text-gray-400 uppercase">Selected Blueprint</div>
                <div className="text-xl font-black tracking-tight">{selectedSpec.title}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-gray-400 uppercase">Micropayment</div>
                <div className="text-xl font-mono font-black text-emerald-400">{selectedSpec.priceUSDC} USDC</div>
              </div>
            </div>

            {simulatedState === "locked" && (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-gray-400">
                  <Lock className="w-8 h-8 text-bauhaus-yellow" />
                </div>
                <h4 className="text-base font-bold mb-1">Protected Architecture Blueprint</h4>
                <p className="text-xs text-gray-400 max-w-md mb-6 leading-relaxed">
                  Full Zod rules, React 19 action patterns, and verified anti-hallucination configs are encrypted behind the x402 challenge.
                </p>
                <button
                  onClick={handleSimulatePayment}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 font-bold rounded-xl text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                  <Zap className="w-4 h-4" /> Simulate x402 Micropayment (${selectedSpec.priceUSDC})
                </button>
              </div>
            )}

            {simulatedState === "challenging" && (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mb-4 animate-spin">
                  <Zap className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="font-mono text-xs text-cyan-300 font-bold mb-1">
                  HTTP 402 Payment Required Received
                </div>
                <div className="font-mono text-[11px] text-gray-400">
                  Signing on-chain micropayment proof on Base L2...
                </div>
              </div>
            )}

            {simulatedState === "unlocked" && unlockedPayload && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-2 rounded-lg">
                  <ShieldCheck className="w-4 h-4" /> 200 OK — Payment Verified by Facilitator (Zero Build Error SLA)
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-mono text-gray-400 uppercase">Unlocked Critical Rules</div>
                  <ul className="space-y-1.5 text-xs text-gray-300 bg-black/60 p-4 rounded-xl border border-white/5">
                    {unlockedPayload.logic.criticalRules.map((rule: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-mono">0{idx + 1}.</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-xs font-mono text-gray-400 uppercase">Recommended Directory Tree</div>
                  <pre className="p-4 bg-black/80 rounded-xl font-mono text-[11px] text-cyan-300 border border-white/5 overflow-x-auto">
                    {unlockedPayload.logic.directoryStructure}
                  </pre>
                </div>
              </div>
            )}

            {/* Agent Curl Helper Box */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-mono text-gray-400 uppercase">Agent HTTP Request (cURL)</span>
                <button
                  onClick={() => copyToClipboard(curlCommand, "curl")}
                  className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {copiedCurl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedCurl ? "Copied!" : "Copy cURL"}
                </button>
              </div>
              <pre className="p-3 bg-black/90 rounded-lg font-mono text-[11px] text-gray-300 border border-white/5 overflow-x-auto whitespace-pre-wrap">
                {curlCommand}
              </pre>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}