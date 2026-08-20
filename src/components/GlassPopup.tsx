"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { MindMapNodeContent } from "@/data/siteContent";

interface GlassPopupProps {
    isOpen: boolean;
    onClose: () => void;
    content: MindMapNodeContent | null;
}

export default function GlassPopup({
    isOpen,
    onClose,
    content,
}: GlassPopupProps) {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<"common" | "s" | "a" | "b">("common");

    // Reset tab when content changes or opens/closes
    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveTab("common");
        }
    }, [isOpen, content]);

    // Safe return if no content
    if (!content) return null;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Determine current content to display
    const currentData = activeTab === "common"
        ? { desc: content.desc, prompt: content.prompt, actionBtn: content.actionBtn }
        : content.tiers?.[activeTab]
            ? {
                desc: content.tiers[activeTab].desc,
                prompt: content.tiers[activeTab].prompt,
                actionBtn: content.tiers[activeTab].actionBtn
            }
            : { desc: content.desc, prompt: content.prompt, actionBtn: content.actionBtn }; // Fallback

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg z-50 max-h-[90vh] overflow-y-auto custom-scrollbar"
                    >
                        <div className="glass p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden bg-[#0a0a0a]/90">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="mb-6">
                                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
                                    {content.title}
                                </h3>
                                {/* Tier Tabs (Only if tiers exist) */}
                                {content.tiers && (
                                    <div className="flex gap-2 mb-4 p-1 bg-white/5 rounded-xl">
                                        {(["common", "s", "a", "b"] as const).map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab
                                                    ? "bg-indigo-500 text-white shadow-lg"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                                    }`}
                                            >
                                                {tab === "common" ? "ALL" : tab.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <p className="text-gray-300 leading-relaxed text-sm md:text-base min-h-[3rem]">
                                    {activeTab !== "common" && content.tiers?.[activeTab]?.title ? (
                                        <span className="block text-indigo-300 font-bold mb-1 text-xs uppercase tracking-wider">
                                            {content.tiers[activeTab].title}
                                        </span>
                                    ) : null}
                                    {currentData.desc}
                                </p>
                            </div>

                            {/* Sections */}
                            <div className="space-y-6">

                                {/* Why Important (Always Common) */}
                                <div className="bg-indigo-500/10 rounded-xl p-4 border border-indigo-500/20">
                                    <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
                                        Why Important
                                    </h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {content.whyImportant}
                                    </p>
                                </div>

                                {/* Core Prompt (Dynamic) */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                                            {activeTab === "common" ? "Core Prompt" : `${activeTab.toUpperCase()}-Tier Prompt`}
                                        </h4>
                                        <button
                                            onClick={() => handleCopy(currentData.prompt)}
                                            className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                                            {copied ? "Copied" : "Copy"}
                                        </button>
                                    </div>
                                    <div className="bg-black/50 rounded-xl p-4 border border-white/10 font-mono text-xs md:text-sm text-gray-300 break-words whitespace-pre-wrap selection:bg-cyan-900">
                                        {currentData.prompt}
                                    </div>
                                </div>

                                {/* Recommended Tools (Always Common) */}
                                <div>
                                    <h4 className="text-xs font-bold text-pink-300 uppercase tracking-wider mb-2">
                                        Recommended Tools
                                    </h4>
                                    <div className="flex gap-2 flex-wrap">
                                        {(content.tools as any[]).map((tool, idx) => (
                                            <a
                                                key={idx}
                                                href={tool.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 text-xs text-gray-300 hover:text-white transition-all flex items-center gap-1"
                                            >
                                                {tool.name} <ExternalLink className="w-3 h-3 opacity-50" />
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Button (Dynamic) */}
                                <button
                                    onClick={() => alert(`Action: ${currentData.actionBtn}\n\n(이 기능은 추후 실제 도구와 연동될 예정입니다.)`)}
                                    className={`w-full py-3 px-4 rounded-xl text-white font-semibold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 group mt-4 ${activeTab === "s" ? "bg-gradient-to-r from-blue-600 to-blue-500 shadow-blue-500/20" :
                                        activeTab === "a" ? "bg-gradient-to-r from-orange-600 to-orange-500 shadow-orange-500/20" :
                                            activeTab === "b" ? "bg-gradient-to-r from-purple-600 to-purple-500 shadow-purple-500/20" :
                                                "bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-indigo-500/20"
                                        }`}
                                >
                                    {currentData.actionBtn}
                                    <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                                </button>
                            </div>

                            {/* Decorative Glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
