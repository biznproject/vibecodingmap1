"use client";

import { motion } from "framer-motion";
import { ArrowRight, Box, Code, Zap, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import TypeDetailModal from "./TypeDetailModal";
import VisionModal from "./VisionModal";
import { TypeDetail, VisionArticle } from "@/data/siteContent";

export default function ContentSections() {
    const { t } = useLanguage();

    // Modal States
    const [selectedType, setSelectedType] = useState<TypeDetail | null>(null);
    const [selectedVision, setSelectedVision] = useState<VisionArticle | null>(null);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 space-y-32 mb-40">

            {/* 1. 3 Vibe Coding Types */}
            <section className="relative">
                <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/5 blur-[100px] -z-10" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        {t.types.title}
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {(t.types.items as TypeDetail[]).map((type, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedType(type)}
                            className="glass p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-all duration-300 group cursor-pointer hover:scale-[1.02]"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {idx === 0 ? <Box className="text-indigo-400" /> : idx === 1 ? <Zap className="text-yellow-400" /> : <Code className="text-emerald-400" />}
                            </div>
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                {type.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                {type.shortDesc}
                            </p>
                            <div className="flex items-center text-sm font-medium text-indigo-400 group-hover:text-indigo-300">
                                View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 2. AI Platform Diagnosis */}
            <section className="relative">
                <div className="absolute right-0 top-1/2 w-1/2 h-1/2 bg-cyan-500/5 blur-[100px] -z-10" />
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.platforms.title}</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {(t.platforms.items as any[]).map((platform, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-1 h-full ${platform.key === 'claude' ? 'bg-orange-500' : platform.key === 'chatgpt' ? 'bg-green-500' : 'bg-gray-200'}`} />
                            <div className="pl-4">
                                <h3 className="text-lg font-bold mb-1 uppercase tracking-wider text-gray-200">{platform.key}</h3>
                                <span className="text-xs font-bold text-indigo-400 mb-3 block">{platform.role}</span>
                                <p className="text-sm text-gray-400">{platform.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3. Future Vision News */}
            <section>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold max-w-xl leading-tight">
                        {t.vision.title}
                    </h2>
                    <p className="text-gray-500 mt-4 md:mt-0">Updated: 2024.12.29</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {(t.vision.items as VisionArticle[]).map((news, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedVision(news)}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 mb-6 overflow-hidden relative">
                                <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold border border-white/10">
                                        {news.category}
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                                {news.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3">
                                {news.summary}
                            </p>
                            <div className="flex items-center text-sm font-bold text-gray-500 group-hover:text-white transition-colors">
                                Read Article <FileText className="w-4 h-4 ml-2" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Modals */}
            <TypeDetailModal
                isOpen={!!selectedType}
                onClose={() => setSelectedType(null)}
                content={selectedType}
            />
            <VisionModal
                isOpen={!!selectedVision}
                onClose={() => setSelectedVision(null)}
                content={selectedVision}
            />

        </div>
    );
}
