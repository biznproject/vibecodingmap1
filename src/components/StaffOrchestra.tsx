"use client";

import React from "react";
import { useScenario } from "@/contexts/ScenarioContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Database, Server, Monitor, CreditCard, ShieldCheck, Search, Cpu, Box } from "lucide-react";

interface StaffNodeProps {
    id: string;
    name: string;
    role: string;
    icon: React.ReactNode;
    isActive: boolean;
    isDetected?: boolean;
    color: string;
    x: number;
    y: number;
}

const StaffNode = ({ name, role, icon, isActive, isDetected, color, x, y }: StaffNodeProps) => (
    <motion.div
        initial={false}
        animate={{
            opacity: isActive || isDetected ? 1 : 0.1,
            scale: isDetected ? 1.1 : isActive ? 1.05 : 1
        }}
        style={{ left: x, top: y }}
        className="absolute flex flex-col items-center gap-2 z-10"
    >
        <div className={`p-4 bauhaus-border-thick bg-white bauhaus-transition ${isDetected ? 'shadow-[8px_8px_0px_0px_rgba(255,0,0,1)] border-bauhaus-red' :
            isActive ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : ''
            }`}>
            <div style={{ color: isDetected ? '#FF0000' : isActive ? color : 'black' }}>
                {icon}
            </div>
        </div>
        <div className="text-center">
            <div className={`text-[8px] font-black uppercase tracking-tighter ${isDetected ? 'text-bauhaus-red' : 'opacity-60'}`}>{role}</div>
            <div className={`text-[10px] font-bold ${isDetected ? 'text-bauhaus-red' : ''}`}>{name}</div>
        </div>
        {isDetected && (
            <motion.div
                className="absolute -top-6 bg-bauhaus-red text-white text-[8px] font-black px-2 py-0.5 uppercase italic whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Detected
            </motion.div>
        )}
    </motion.div>
);

export default function StaffOrchestra() {
    const { scenario, isComplete } = useScenario();

    const featureIcons: Record<string, React.ReactNode> = {
        payment: <CreditCard className="w-8 h-8" />,
        ai: <Cpu className="w-8 h-8" />,
        database: <Database className="w-8 h-8" />,
        search: <Search className="w-8 h-8" />,
        security: <ShieldCheck className="w-8 h-8" />
    };

    const script = `
# Google Director Toolchain
# Built in Project IDX studio

$ gcloud auth login
$ firebase init
$ npx project-idx create --scenario "${scenario.logline.replace(/"/g, "'")}"
$ git commit -m "Web Debut: ${scenario.vibe}"
${scenario.detectedFeatures.includes('payment') ? '$ firebase ext:install stripe/firestore-stripe-payments' : ''}
$ firebase deploy
  `.trim();

    return (
        <div className="w-full py-12 px-6">
            <div className="mb-8 border-b-4 border-black pb-2 flex justify-between items-end">
                <h3 className="text-2xl font-black italic tracking-tighter">THE PRODUCTION PIPELINE</h3>
                <div className="text-[10px] font-black uppercase tracking-widest bg-bauhaus-yellow px-2">Stage: {isComplete ? 'READY' : 'DRAFTING'}</div>
            </div>

            <div className="relative h-[500px] bauhaus-grid bauhaus-border overflow-hidden bg-white mb-8">
                {/* Studio Backdrop: Project IDX */}
                <div className="absolute inset-0 border-[40px] border-bauhaus-blue/5 pointer-events-none flex items-center justify-center">
                    <div className="text-[120px] font-black opacity-[0.03] select-none rotate-12">PROJECT IDX</div>
                </div>

                {/* SVG Connections (Main Flow) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <AnimatePresence>
                        {isComplete && (
                            <motion.path
                                d="M 150 120 L 500 250 M 150 250 L 500 250 M 150 380 L 500 250"
                                fill="none"
                                stroke="black"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.2 }}
                            />
                        )}
                    </AnimatePresence>
                </svg>

                {/* Staff Nodes (Base Infrastructure) */}
                <StaffNode
                    id="gemini"
                    name="GEMINI"
                    role="Assistant Director"
                    icon={<Sparkles className="w-10 h-10" />}
                    isActive={scenario.logline.length > 0}
                    isDetected={scenario.detectedFeatures.includes('ai')}
                    color="#0000FF"
                    x={70}
                    y={40}
                />
                <StaffNode
                    id="firebase"
                    name="FIREBASE"
                    role="Stage Manager"
                    icon={<Database className="w-10 h-10" />}
                    isActive={scenario.target.length > 0}
                    isDetected={scenario.detectedFeatures.includes('database')}
                    color="#FFCC00"
                    x={70}
                    y={170}
                />
                <StaffNode
                    id="cloudrun"
                    name="CLOUD RUN"
                    role="Distributor"
                    icon={<Server className="w-10 h-10" />}
                    isActive={scenario.coreFunction.length > 0}
                    isDetected={scenario.detectedFeatures.includes('server')}
                    color="#FF0000"
                    x={70}
                    y={300}
                />

                {/* Dynamic Feature Nodes (Detected from Logline) */}
                <AnimatePresence>
                    {scenario.detectedFeatures.map((feat, idx) => (
                        !['ai', 'database', 'server'].includes(feat) && (
                            <StaffNode
                                key={feat}
                                id={feat}
                                name={feat.toUpperCase()}
                                role="Specialized Staff"
                                icon={featureIcons[feat] || <Box className="w-8 h-8" />}
                                isActive={true}
                                isDetected={true}
                                color="#FF0000"
                                x={300}
                                y={100 + (idx * 100)}
                            />
                        )
                    ))}
                </AnimatePresence>

                {/* Destination Node: THE CINEMA */}
                <StaffNode
                    id="chrome"
                    name="CHROME"
                    role="The Cinema (Frontend)"
                    icon={<Monitor className="w-14 h-14" />}
                    isActive={isComplete}
                    color="black"
                    x={550}
                    y={170}
                />

                {/* Status Overlay */}
                <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                    <div className="bauhaus-border p-2 bg-black text-white text-[8px] font-black uppercase tracking-widest">
                        Detected Specs: {scenario.detectedFeatures.length}
                    </div>
                </div>
            </div>

            {isComplete && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bauhaus-border p-6 bg-black text-bauhaus-yellow font-mono text-[10px] relative"
                    >
                        <div className="absolute -top-3 left-4 bg-white text-black px-2 py-1 text-[10px] font-black bauhaus-border">
                            PROJECT IDX SCRIPT
                        </div>
                        <pre className="overflow-x-auto">
                            <code>{script}</code>
                        </pre>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bauhaus-border p-6 bg-bauhaus-blue text-white"
                    >
                        <div className="text-[10px] font-black uppercase mb-2">Director&apos;s Memo</div>
                        <p className="text-xs font-bold leading-tight italic">
                            {scenario.detectedFeatures.length > 0
                                ? `"${scenario.detectedFeatures.join(', ')} 기능을 위한 특수 스태프를 배치했습니다. 인프라 준비가 가속됩니다."`
                                : `"모든 스태프가 대기 중입니다. 시나리오의 디테일이 추가되면 특수 장비가 자동으로 배치됩니다."`}
                        </p>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
