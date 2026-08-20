"use client";

import React, { useState } from "react";
import { useScenario } from "@/contexts/ScenarioContext";
import { webGenres, GenreId } from "@/data/siteContent";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ExternalLink, ChevronRight, ChevronLeft, Play } from "lucide-react";

interface KnowledgeOverlayProps {
    tag: string;
    sentence: string;
    linkText: string;
}

const KnowledgeOverlay: React.FC<KnowledgeOverlayProps> = ({ tag, sentence, linkText }) => (
    <div className="absolute -right-4 top-0 translate-x-full ml-4 w-48 group select-none">
        <div className="bauhaus-border p-1 px-2 text-[8px] font-black uppercase bg-bauhaus-yellow inline-block mb-1">
            {tag}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
            <div className="bauhaus-border p-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold leading-tight shadow-xl mb-2 border-dashed">
                {sentence}
            </div>
            <div className="flex items-center gap-1 text-[8px] font-black uppercase text-bauhaus-blue cursor-pointer hover:underline">
                <ExternalLink className="w-2 h-2" /> {linkText}
            </div>
        </div>
    </div>
);

const ScenarioBuilder: React.FC = () => {
    const { scenario, updateScenario } = useScenario();
    const [step, setStep] = useState(1);

    const nextStep = () => setStep((s) => Math.min(4, s + 1));
    const prevStep = () => setStep((s) => Math.max(1, s - 1));

    return (
        <div className="max-w-4xl mx-auto py-20 px-6 relative">
            <div className="bauhaus-border-thick p-12 bg-white relative">
                <div className="absolute top-0 right-0 p-4 font-black opacity-10 text-4xl">
                    0{step}
                </div>

                <div className="mb-12">
                    <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Director&apos;s Script</h2>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Drafting the architectural intent</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-8 relative">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <label className="block text-xs font-black mb-2 uppercase flex items-center gap-2">
                                        01. Intent (Logline)
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            value={scenario.logline}
                                            onChange={(e) => updateScenario({ logline: e.target.value })}
                                            placeholder="코딩의 중력을 이겨내는 사람들을 위한 관제 센터..."
                                            className="w-full h-32 bauhaus-border p-4 focus:ring-4 focus:ring-bauhaus-blue/10 outline-none text-lg font-medium resize-none shadow-sm"
                                        />
                                        <KnowledgeOverlay
                                            tag="바우하우스: 기능 우선"
                                            sentence="의도는 간결해야 합니다. 장식 없는 문장이 설계를 가속합니다."
                                            linkText="1923 전시회 원칙 보기"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <label className="block text-xs font-black mb-2 uppercase">02. Audience (Target)</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={scenario.target}
                                            onChange={(e) => updateScenario({ target: e.target.value })}
                                            placeholder="새로운 질서를 찾는 크리에이터들"
                                            className="w-full h-16 bauhaus-border p-4 focus:ring-4 focus:ring-bauhaus-blue/10 outline-none text-lg font-medium shadow-sm"
                                        />
                                        <KnowledgeOverlay
                                            tag="미니멀리즘: 여백 설계"
                                            sentence="관객은 여백에서 숨을 쉽니다. 타겟의 동선을 비워두세요."
                                            linkText="디터 람스의 10계명"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <label className="block text-xs font-black mb-2 uppercase">03. Machine (Core Function)</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={scenario.coreFunction}
                                            onChange={(e) => updateScenario({ coreFunction: e.target.value })}
                                            placeholder="실시간 데이터 오케스트레이션"
                                            className="w-full h-16 bauhaus-border p-4 focus:ring-4 focus:ring-bauhaus-blue/10 outline-none text-lg font-medium shadow-sm"
                                        />
                                        <KnowledgeOverlay
                                            tag="구글: 기술적 평등"
                                            sentence="함수는 도구입니다. 누구나 사용할 수 있는 유니버설 설계를 지향하십시오."
                                            linkText="머티리얼 디자인 철학"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <label className="block text-xs font-black mb-4 uppercase">04. Atmosphere (Genre)</label>
                                    <div className="grid grid-cols-2 gap-4 relative">
                                        {(Object.keys(webGenres) as GenreId[]).map((v) => (
                                            <button
                                                key={v}
                                                onClick={() => updateScenario({ vibe: v })}
                                                className={`p-4 bauhaus-border text-left uppercase font-black text-[10px] tracking-widest transition-all ${scenario.vibe === v ? "bg-black text-white" : "hover:bg-bauhaus-blue/5"
                                                    }`}
                                            >
                                                {v}
                                            </button>
                                        ))}
                                        <KnowledgeOverlay
                                            tag="상업 예술: 바이브"
                                            sentence="장르는 감정의 해상도입니다. 프로젝트의 온도에 맞는 색을 고르세요."
                                            linkText="현대 웹 미학 가이드"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-12 flex gap-4">
                            {step > 1 && (
                                <button
                                    onClick={prevStep}
                                    className="px-6 py-2 bauhaus-border font-black text-xs uppercase hover:bg-black hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                            )}
                            <button
                                onClick={step === 4 ? undefined : nextStep}
                                className={`flex-1 bauhaus-border-thick p-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:translate-y-1 active:shadow-none ${step === 4 ? "bg-bauhaus-red text-white" : "bg-black text-white hover:bg-bauhaus-blue"
                                    }`}
                            >
                                {step === 4 ? (
                                    <>Action! <Play className="w-4 h-4 fill-current" /></>
                                ) : (
                                    <>Next Step <ChevronRight className="w-6 h-6" /></>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-4 border-l-2 border-dashed border-black/10 pl-8">
                        <div className="sticky top-12">
                            <h4 className="text-[10px] font-black uppercase mb-4 opacity-40">Director&apos;s Memo</h4>
                            <p className="text-sm font-bold leading-tight italic opacity-60">
                                {step === 1 && "모든 장식은 배제됩니다. 오직 목적만이 형태를 결정합니다."}
                                {step === 2 && "관객의 눈은 당신이 설계한 그리드를 따라 이동해야 합니다."}
                                {step === 3 && "기술은 보이지 않아야 합니다. 오직 유용함만이 남아야 합니다."}
                                {step === 4 && "마침내 웹은 현대 상업 예술로 완성됩니다."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScenarioBuilder;
