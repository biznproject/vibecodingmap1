"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { TypeDetail } from "@/data/siteContent";

interface TypeDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: TypeDetail | null;
}

export default function TypeDetailModal({
    isOpen,
    onClose,
    content,
}: TypeDetailModalProps) {
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
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl z-[60] max-h-[90vh] overflow-y-auto custom-scrollbar"
                    >
                        <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl bg-[#0a0a0a]">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="mb-8">
                                <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-3 border border-indigo-500/30">
                                    {content.tag}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    {content.title}
                                </h2>
                                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                    {content.shortDesc}
                                </p>

                                {/* Stat Visualization */}
                                {content.stats && (
                                    <div className="grid grid-cols-3 gap-2 bg-white/5 rounded-xl p-4 border border-white/5">
                                        {Object.entries(content.stats).map(([key, value]) => (
                                            <div key={key} className="flex flex-col items-center gap-1">
                                                <span className="text-[10px] uppercase tracking-wider text-gray-400">{key}</span>
                                                <div className="flex gap-0.5 mt-1">
                                                    {[1, 2, 3, 4, 5].map((i: number) => (
                                                        <div
                                                            key={i}
                                                            className={`w-1.5 h-6 rounded-full transition-all duration-500 ${i <= value ? "bg-gradient-to-t from-indigo-500 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "bg-white/10"}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                {/* Pros */}
                                <div className="bg-emerald-500/5 rounded-2xl p-6 border border-emerald-500/10">
                                    <h3 className="flex items-center gap-2 text-emerald-400 font-bold mb-4 uppercase tracking-wider text-sm">
                                        <CheckCircle className="w-5 h-5" />
                                        Pros (장점)
                                    </h3>
                                    <ul className="space-y-3">
                                        {content.pros.map((pro: string, idx: number) => (
                                            <li key={idx} className="flex gap-3 text-sm text-gray-300 items-start">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                                {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Cons */}
                                <div className="bg-orange-500/5 rounded-2xl p-6 border border-orange-500/10">
                                    <h3 className="flex items-center gap-2 text-orange-400 font-bold mb-4 uppercase tracking-wider text-sm">
                                        <AlertTriangle className="w-5 h-5" />
                                        Cons (단점)
                                    </h3>
                                    <ul className="space-y-3">
                                        {content.cons.map((con: string, idx: number) => (
                                            <li key={idx} className="flex gap-3 text-sm text-gray-300 items-start">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                                                {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Learning Path */}
                            <div className="bg-indigo-600/10 rounded-2xl p-6 border border-indigo-500/20">
                                <h3 className="flex items-center gap-2 text-indigo-300 font-bold mb-4 uppercase tracking-wider text-sm">
                                    <BookOpen className="w-5 h-5" />
                                    Recommended Path
                                </h3>
                                <div className="flex flex-col md:flex-row gap-4">
                                    {content.learningPath.map((step: string, idx: number) => (
                                        <div key={idx} className="flex-1 flex items-center md:flex-col md:items-start md:text-left gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                                {idx + 1}
                                            </div>
                                            <span className="text-gray-200 font-medium text-sm">
                                                {step}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
