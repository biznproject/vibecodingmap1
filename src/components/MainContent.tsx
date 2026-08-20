"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import MindMap from "@/components/MindMap";
import { ArrowRight, Globe } from "lucide-react";
import ContentSections from "@/components/ContentSections";
import { useState } from "react";
import DiagnosisModal from "@/components/DiagnosisModal";
import TypeDetailModal from "@/components/TypeDetailModal";
import { TypeDetail } from "@/data/siteContent";

import ManifestoModal from "@/components/ManifestoModal";

export default function MainContent() {
    const { t, language, setLanguage } = useLanguage();
    const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);
    const [isManifestoOpen, setIsManifestoOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<TypeDetail | null>(null);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <main className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden selection:bg-indigo-500/30">

            {/* Background Glows */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none -z-10 opacity-50" />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            {/* Navbar */}
            <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center transition-all bg-black/10 backdrop-blur-sm border-b border-white/5">
                <div onClick={() => scrollToSection("hero")} className="px-6 py-2 rounded-full font-bold text-sm tracking-wider flex items-center gap-2 cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    VIBECODINGMAP.COM
                </div>

                <nav className="hidden md:flex gap-6 text-sm text-gray-400 font-medium items-center">
                    <button onClick={() => setIsManifestoOpen(true)} className="hover:text-white transition-colors">{t.nav.manifesto}</button>
                    <button onClick={() => setIsDiagnosisOpen(true)} className="hover:text-white transition-colors">{t.nav.diagnosis}</button>
                    <button onClick={() => scrollToSection("tools")} className="hover:text-white transition-colors">{t.nav.tools}</button>

                    {/* Language Switcher */}
                    <button
                        onClick={() => setLanguage(language === "ko" ? "en" : "ko")}
                        className="flex items-center gap-1 px-3 py-1 rounded-full border border-white/10 hover:bg-white/10 transition-colors ml-4"
                    >
                        <Globe className="w-3 h-3" />
                        <span className="text-xs uppercase">{language}</span>
                    </button>
                </nav>

                <button
                    onClick={() => setIsDiagnosisOpen(true)}
                    className="glass px-4 py-2 rounded-full text-xs font-semibold hover:bg-white/10 transition-colors hidden md:block"
                >
                    {t.nav.start}
                </button>
            </header>

            {/* Hero Section */}
            <section id="hero" className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center max-w-4xl mx-auto">
                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-indigo-300">
                    <span>{t.hero.badge}</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                    {t.hero.titlePrefix} <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                        {t.hero.titleHighlight}
                    </span>
                    {t.hero.titleSuffix}
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed">
                    {t.hero.description}
                </p>

                <div className="flex gap-4">
                    <button
                        onClick={() => setIsDiagnosisOpen(true)}
                        className="group relative px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all flex items-center gap-2"
                    >
                        {t.hero.startDiagnosis}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={() => scrollToSection("mindmap")}
                        className="px-8 py-3 glass rounded-full hover:bg-white/10 transition-all font-medium text-gray-300 hover:text-white"
                    >
                        {t.hero.exploreMap}
                    </button>
                </div>
            </section>

            {/* Mind Map Section */}
            <section id="mindmap" className="w-full max-w-6xl mx-auto px-6 pb-24 scroll-mt-20">
                <div id="manifesto-wrapper" className="glass rounded-3xl p-1 md:p-10 border-white/5 bg-black/40 backdrop-blur-xl relative overflow-hidden min-h-[700px]">
                    {/* Inner Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 blur-[80px] pointer-events-none" />

                    <MindMap />
                </div>
            </section>

            {/* New Content Sections */}
            <div id="tools">
                <ContentSections />
            </div>

            {/* Footer */}
            <footer className="py-10 text-center text-gray-600 text-xs">
                <p>© 2025 VIBECODINGMAP. Built with Next.js, Tailwind, and Vibe.</p>
            </footer>

            {/* Modals */}
            <DiagnosisModal
                isOpen={isDiagnosisOpen}
                onClose={() => setIsDiagnosisOpen(false)}
                onShowType={(type) => setSelectedType(type)}
            />
            {/* Type Detail from Diagnosis Result */}
            <TypeDetailModal
                isOpen={!!selectedType}
                onClose={() => setSelectedType(null)}
                content={selectedType}
            />
            {/* Manifesto Modal */}
            <ManifestoModal
                isOpen={isManifestoOpen}
                onClose={() => setIsManifestoOpen(false)}
            />

        </main>
    );
}
