"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, Brain, CircleDollarSign, Map, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ManifestoItem {
    icon: string;
    title: string;
    desc: string;
}

interface ManifestoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ManifestoModal({ isOpen, onClose }: ManifestoModalProps) {
    const { t } = useLanguage();
    const content = t.manifesto;

    // Icon helper
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "Rocket": return Rocket;
            case "Brain": return Brain;
            case "CircleDollarSign": return CircleDollarSign;
            case "Map": return Map;
            default: return Globe;
        }
    };

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
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="relative w-full max-w-4xl h-auto max-h-[90vh] overflow-y-auto custom-scrollbar pointer-events-auto">

                            {/* Glass Container */}
                            <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-[#050510]/80 shadow-[0_0_100px_rgba(99,102,241,0.2)] relative overflow-hidden">

                                {/* Background Effects */}
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white z-20"
                                >
                                    <X className="w-8 h-8" />
                                </button>

                                {/* Header */}
                                <div className="text-center mb-16">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-6"
                                    >
                                        <Rocket className="w-4 h-4" />
                                        Manifesto
                                    </motion.div>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                                    >
                                        {content.title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                                    >
                                        {content.desc}
                                    </motion.p>
                                </div>

                                {/* Items Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                    {content.items.map((item: ManifestoItem, idx: number) => {
                                        const Icon = getIcon(item.icon);
                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 + idx * 0.1 }}
                                                className="group relative p-8 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-1"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

                                                <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-500">
                                                    <Icon className="w-6 h-6" />
                                                </div>

                                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-400 leading-relaxed text-sm">
                                                    {item.desc}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Footer */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="text-center mt-12 pt-8 border-t border-white/5 text-gray-500 text-sm font-medium tracking-wider uppercase"
                                >
                                    {content.footer}
                                </motion.div>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
