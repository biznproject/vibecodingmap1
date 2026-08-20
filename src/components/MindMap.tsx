"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Plug, FileText, RefreshCw, Rocket, Smartphone, Layers, CheckCircle, UploadCloud } from "lucide-react";
import GlassPopup from "./GlassPopup";
import { useLanguage } from "@/contexts/LanguageContext";
import { MindMapNodeContent } from "@/data/siteContent";

export default function MindMap() {
    const { t } = useLanguage();
    const [track, setTrack] = useState<"web" | "app">("web");
    const [selectedNode, setSelectedNode] = useState<MindMapNodeContent | null>(null);

    // Icon Mapping Helper
    const getIcon = (id: number, track: "web" | "app") => {
        if (track === "web") {
            const icons = [Brain, Plug, FileText, RefreshCw, Rocket];
            return icons[id - 1] || Brain;
        } else {
            const icons = [Brain, Layers, Smartphone, CheckCircle, UploadCloud];
            return icons[id - 1] || Brain;
        }
    };

    // Position Mapping (Fixed Layout)
    const positions = [
        { x: 0, y: -180 },
        { x: 170, y: -50 },
        { x: 100, y: 150 },
        { x: -100, y: 150 },
        { x: -170, y: -50 },
    ];

    const currentData = track === "web" ? t.mindMap.web : t.mindMap.app;

    return (
        <div className="relative w-full h-[700px] flex flex-col items-center justify-center overflow-hidden">

            {/* Toggle Switch */}
            <div className="absolute top-4 md:right-10 z-30">
                <div className="glass p-1 rounded-full flex relative">
                    <motion.div
                        className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-indigo-500 rounded-full shadow-lg z-0"
                        animate={{
                            x: track === "web" ? 0 : "100%",
                            backgroundColor: track === "web" ? "#6366f1" : "#ec4899"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button
                        onClick={() => setTrack("web")}
                        className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold transition-colors duration-300 ${track === "web" ? "text-white" : "text-gray-400 hover:text-white"}`}
                    >
                        Web Track
                    </button>
                    <button
                        onClick={() => setTrack("app")}
                        className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold transition-colors duration-300 ${track === "app" ? "text-white" : "text-gray-400 hover:text-white"}`}
                    >
                        App Track
                    </button>
                </div>
            </div>

            {/* Central Hub */}
            <div className="absolute flex flex-col items-center justify-center z-20 pointer-events-none mt-20">
                <div className={`w-4 h-4 rounded-full shadow-[0_0_20px_white] animate-pulse transition-colors duration-500 ${track === "web" ? "bg-cyan-400 shadow-cyan-400" : "bg-pink-400 shadow-pink-400"}`} />
                <span className="mt-2 text-[10px] tracking-[0.2em] text-gray-500 uppercase font-bold">
                    {track === "web" ? "Vibe Web" : "Vibe App"}
                </span>
            </div>

            {/* SVG Layer for Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible mt-20">
                <AnimatePresence mode="wait">
                    {(currentData as MindMapNodeContent[]).map((node, index) => {
                        const pos = positions[index];
                        return (
                            <motion.path
                                key={`line-${track}-${node.id}`}
                                d={`M 50% 50% C 50% 50%, calc(50% + ${pos.x / 2}px) calc(50% + ${pos.y / 2}px), calc(50% + ${pos.x}px) calc(50% + ${pos.y}px)`}
                                stroke={`url(#gradient-line-${track})`}
                                strokeWidth="1.5"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.3 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                            />
                        )
                    })}
                </AnimatePresence>
                <defs>
                    <linearGradient id="gradient-line-web" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                    <linearGradient id="gradient-line-app" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Mind Map Area Wrapper */}
            <div className="relative w-full h-full flex items-center justify-center mt-20 scale-[0.6] md:scale-100 transition-transform origin-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={track}
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                    >
                        {(currentData as MindMapNodeContent[]).map((node, index) => {
                            const pos = positions[index];
                            const Icon = getIcon(node.id, track);

                            return (
                                <motion.div
                                    key={node.id}
                                    className="absolute z-10"
                                    style={{ x: pos.x, y: pos.y }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: [pos.y, pos.y - 10, pos.y]
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        y: {
                                            duration: 3 + (node.id * 0.2),
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                >
                                    <button
                                        onClick={() => setSelectedNode(node)}
                                        className="group relative flex flex-col items-center justify-center"
                                    >
                                        {/* Glass Node */}
                                        <div className={`glass w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.2)] ${track === 'app' ? 'shadow-pink-500/10' : ''}`}>
                                            <div className={`absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl -z-10 ${selectedNode?.id === node.id ? "animate-pulse" : "group-hover:animate-pulse"}`} />
                                            <Icon className={`w-8 h-8 md:w-10 md:h-10 transition-colors ${track === 'web' ? 'text-cyan-200 group-hover:text-white' : 'text-pink-300 group-hover:text-white'}`} />
                                        </div>

                                        {/* Label */}
                                        <div className="absolute top-full mt-3 flex flex-col items-center whitespace-nowrap">
                                            <span className="text-xs font-bold text-gray-500 mb-1">STEP 0{node.id}</span>
                                            <span className="text-sm font-semibold text-gray-200 bg-black/50 px-3 py-1 rounded-full border border-white/5 backdrop-blur-md">
                                                {node.title}
                                            </span>
                                        </div>
                                    </button>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Popup */}
            <GlassPopup
                isOpen={!!selectedNode}
                onClose={() => setSelectedNode(null)}
                content={selectedNode!}
            />
        </div>
    );
}
