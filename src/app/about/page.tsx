"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, ShieldCheck, Zap, Bot, Terminal, Layers, Cpu, Globe } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-24 relative overflow-hidden bg-black text-white selection:bg-cyan-500/30">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

            <div className="max-w-4xl w-full relative z-10">
                {/* Header Section */}
                <div className="flex flex-col gap-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cyan-400 flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(34,211,238,0.5)]">
                            <Cpu className="text-black" size={24} strokeWidth={3} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
                            About <span className="text-cyan-400">x402 Protocol</span>
                        </h1>
                    </div>
                    <div className="w-32 h-1.5 bg-cyan-400" />
                </div>

                {/* Content Section 1: x402 Micropayments */}
                <div className="mb-20 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="px-4 py-1 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] font-mono">Section 01</div>
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Machine-to-Machine Autonomous Commerce</h2>
                    </div>

                    <div className="bauhaus-border p-8 md:p-10 bg-white/5 backdrop-blur-md border-l-[12px] border-l-cyan-400">
                        <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-300 mb-8">
                            VibeCodingMap implements the <span className="text-cyan-400 font-bold underline decoration-cyan-400 underline-offset-4 decoration-2">x402 Protocol</span>, an internet-native standard built on the HTTP 402 "Payment Required" status code. It allows autonomous AI agents to buy and consume digital specifications directly on Base L2.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-400 leading-relaxed font-mono">
                            <div className="flex gap-4">
                                <Zap className="text-cyan-400 shrink-0" size={20} />
                                <p>
                                    <strong className="text-white">Zero-Friction Billing:</strong> AI agents can request resources, sign cryptographic payment proofs, and receive decrypted spec payloads in less than 1.5 seconds without human subscription management.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <Bot className="text-indigo-400 shrink-0" size={20} />
                                <p>
                                    <strong className="text-white">Built for SLMs & Agents:</strong> Local models like Phi-3.5 obtain high-grade configurations dynamically to prevent hallucinations and structural build errors, making small agents highly competitive.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section 2: Dual-Track Architecture */}
                <div className="mb-20 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="px-4 py-1 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] font-mono">Section 02</div>
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Dual-Track Architecture Engine</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Human Track */}
                        <div className="bauhaus-border p-8 bg-white/5 hover:border-cyan-400 transition-colors group">
                            <Compass className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-lg font-black mb-4 uppercase tracking-tighter">Human Directors</h3>
                            <p className="text-xs font-medium text-gray-400 leading-relaxed">
                                Formulate high-level project goals, logic constraints, and validation criteria using our visual A-L-V (Aim-Logic-Val) mind-map framework.
                            </p>
                        </div>

                        {/* Agent Track */}
                        <div className="bauhaus-border p-8 bg-white/5 hover:border-indigo-400 transition-colors group">
                            <Terminal className="text-indigo-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-lg font-black mb-4 uppercase tracking-tighter">AI Coding Agents</h3>
                            <p className="text-xs font-medium text-gray-400 leading-relaxed">
                                Connect local CLI tools, Cursor, Windsurf, or custom Pydantic AI scripts to query the decentralized catalog API directly.
                            </p>
                        </div>

                        {/* Monetization */}
                        <div className="bauhaus-border p-8 bg-white/10 hover:border-emerald-400 transition-colors group">
                            <ShieldCheck className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-lg font-black mb-4 uppercase tracking-tighter">Decentralized Earning</h3>
                            <p className="text-xs font-medium text-gray-300 leading-relaxed">
                                Upload your verified blueprints. When external coding agents buy your rules, USDC payments settle directly to your MetaMask wallet.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-1000 delay-500">
                    <Link
                        href="/"
                        className="group flex items-center gap-4 px-12 py-6 bg-white text-black font-black uppercase text-xl transition-all hover:bg-cyan-400 hover:shadow-[12px_12px_0px_0px_rgba(34,211,238,0.3)] hover:scale-105"
                    >
                        <ArrowLeft size={24} strokeWidth={3} className="group-hover:-translate-x-2 transition-transform" />
                        <span>Return to Studio</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}