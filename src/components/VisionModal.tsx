"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import { VisionArticle } from "@/data/siteContent";

interface VisionModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: VisionArticle | null;
}

export default function VisionModal({
    isOpen,
    onClose,
    content,
}: VisionModalProps) {
    if (!content) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-3xl z-[60] max-h-[90vh] overflow-y-auto custom-scrollbar"
                    >
                        <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl bg-[#0a0a0a]">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="mb-8 border-b border-white/10 pb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 rounded bg-indigo-500 text-white text-[10px] font-bold tracking-widest uppercase">
                                        {content.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                                        <Calendar className="w-3 h-3" />
                                        <span>Today</span>
                                    </div>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    {content.title}
                                </h2>
                                <p className="text-xl text-gray-400 leading-relaxed font-light">
                                    {content.summary}
                                </p>
                            </div>

                            <div className="prose prose-invert prose-lg max-w-none">
                                {content.content.split("\\n\\n").map((paragraph: string, idx: number) => (
                                    <p key={idx} className="text-gray-300 leading-loose mb-6">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                                <span className="text-gray-500 text-sm">VIBE CODING INSIGHTS</span>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 text-sm transition-colors"
                                >
                                    Close Article
                                </button>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
