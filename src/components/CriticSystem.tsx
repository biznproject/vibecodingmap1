"use client";

import React from "react";
import { useScenario } from "@/contexts/ScenarioContext";
import { webGenres, googleEcosystem } from "@/data/siteContent";
import { motion } from "framer-motion";
import { Activity, Users, ShieldCheck, Zap, Quote } from "lucide-react";

export default function CriticSystem() {
    const { scenario, isComplete } = useScenario();

    if (!isComplete) return null;

    const genre = webGenres[scenario.vibe];

    return (
        <div className="w-full py-12 px-6">
            <div className="mb-8 border-b-4 border-black pb-2 flex justify-between items-end">
                <h3 className="text-2xl font-black italic tracking-tighter">THE DIRECTOR&apos;S CRITIQUE</h3>
                <div className="text-[10px] font-black uppercase tracking-widest bg-bauhaus-red text-white px-2">Ecosystem: Verified</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Column 1: Artistic Critique */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bauhaus-border p-8 bg-bauhaus-red text-white relative flex flex-col h-full overflow-hidden"
                >
                    <Quote className="w-24 h-24 absolute -bottom-4 -right-4 text-white opacity-10" />
                    <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest border border-white/30 px-2">Artistic</div>
                    <h4 className="text-[12px] font-black uppercase mb-6 tracking-widest border-b border-white/20 pb-2">평론가적 시점 (Artistic Critique)</h4>
                    <p className="text-2xl font-bold italic leading-tight mb-8 z-10">
                        &quot;{genre.criticism}&quot;
                    </p>
                    <div className="mt-auto pt-6 border-t border-white/20">
                        <div className="text-[10px] font-black uppercase mb-2 opacity-60">Genre Philosophy</div>
                        <p className="text-sm font-medium leading-relaxed">{genre.philosophy}</p>
                    </div>
                </motion.div>

                {/* Column 2: Technical Critique (Web Vitals) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bauhaus-border p-8 bg-white relative flex flex-col h-full"
                >
                    <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest border border-black/20 px-2">Technical</div>
                    <h4 className="text-[12px] font-black uppercase mb-6 tracking-widest border-b border-black/10 pb-2">기술 심사 (Web Vitals Monitor)</h4>

                    <div className="space-y-6">
                        <div className="flex justify-between items-end border-b border-black/5 pb-2">
                            <div>
                                <div className="text-[10px] font-black mb-1">LCP (Largest Contentful Paint)</div>
                                <div className="text-2xl font-black text-bauhaus-blue">{genre.benchmarks.lcp}</div>
                            </div>
                            <Zap className="w-6 h-6 text-bauhaus-yellow" />
                        </div>

                        <div className="flex justify-between items-end border-b border-black/5 pb-2">
                            <div>
                                <div className="text-[10px] font-black mb-1">FID (First Input Delay)</div>
                                <div className="text-2xl font-black text-bauhaus-blue">{genre.benchmarks.fid}</div>
                            </div>
                            <Activity className="w-6 h-6 text-bauhaus-red" />
                        </div>

                        <div className="flex justify-between items-end border-b border-black/5 pb-2">
                            <div>
                                <div className="text-[10px] font-black mb-1">CLS (Cumulative Layout Shift)</div>
                                <div className="text-2xl font-black text-bauhaus-blue">{genre.benchmarks.cls}</div>
                            </div>
                            <ShieldCheck className="w-6 h-6 text-bauhaus-blue" />
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 bauhaus-border border-dashed border-gray-300">
                        <div className="text-[9px] font-black uppercase mb-1">Ecosystem Note</div>
                        <p className="text-[10px] font-bold text-gray-600">
                            &quot;{googleEcosystem.vitals.desc}&quot;
                        </p>
                    </div>
                </motion.div>

                {/* Column 3: Audience Analysis (Google Analytics) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bauhaus-border p-8 bg-black text-white relative flex flex-col h-full"
                >
                    <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest border border-white/30 px-2">Audience</div>
                    <h4 className="text-[12px] font-black uppercase mb-6 tracking-widest border-b border-white/20 pb-2">관객 분석 (Audience Analysis)</h4>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-bauhaus-yellow -rotate-3">
                            <Users className="w-10 h-10 text-black" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black opacity-60">Estimated Impression</div>
                            <div className="text-2xl font-black tracking-tighter">GLOBAL DEBUT</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white/10 p-4 border-l-4 border-bauhaus-red">
                            <div className="text-[9px] font-black uppercase mb-1 text-bauhaus-yellow">Target Audience Memo</div>
                            <p className="text-[11px] leading-tight opacity-90">{scenario.target}</p>
                        </div>

                        <div className="p-4 border border-white/20">
                            <div className="text-[9px] font-black uppercase mb-2">GA4 Prediction</div>
                            <p className="text-[10px] italic opacity-60 leading-tight">
                                &quot;{googleEcosystem.analytics.desc}&quot;
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="w-full bg-bauhaus-yellow text-black text-center py-2 text-[10px] font-black opacity-30">
                            DASHBOARD CONNECTING...
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
