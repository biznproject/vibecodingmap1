"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, RefreshCw, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TypeDetail } from "@/data/siteContent";

interface DiagnosisModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShowType: (type: TypeDetail) => void;
}

type QuizState = "start" | "question" | "result";

export default function DiagnosisModal({ isOpen, onClose, onShowType }: DiagnosisModalProps) {
    const { t } = useLanguage();
    const [step, setStep] = useState<QuizState>(() => {
        if (typeof window !== 'undefined' && localStorage.getItem("vibe_diagnosis_result")) {
            return "result";
        }
        return "start";
    });
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [scores, setScores] = useState({ s: 0, a: 0, b: 0 });
    const [resultType, setResultType] = useState<"s" | "a" | "b" | null>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("vibe_diagnosis_result") as "s" | "a" | "b" | null;
        }
        return null;
    });

    const handleAnswer = (type: "s" | "a" | "b") => {
        const newScores = { ...scores, [type]: scores[type] + 1 };
        setScores(newScores);

        if (currentQIndex < t.diagnosis.questions.length - 1) {
            setCurrentQIndex(currentQIndex + 1);
        } else {
            // Finish Quiz
            const finalType = Object.keys(newScores).reduce((a, b) => newScores[a as keyof typeof scores] > newScores[b as keyof typeof scores] ? a : b) as "s" | "a" | "b";
            setResultType(finalType);
            localStorage.setItem("vibe_diagnosis_result", finalType);
            setStep("result");
        }
    };

    const handleRestart = () => {
        localStorage.removeItem("vibe_diagnosis_result");
        setScores({ s: 0, a: 0, b: 0 });
        setCurrentQIndex(0);
        setResultType(null);
        setStep("question");
    };

    const handleViewDetails = () => {
        if (resultType) {
            const typeData = (t.types.items as TypeDetail[]).find(item => item.id === resultType);
            if (typeData) {
                onShowType(typeData);
                onClose();
            }
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="glass w-full max-w-md p-8 rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl relative overflow-hidden"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* INTRO SCREEN - Only if no saved result */}
                    {step === "start" && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                                <RefreshCw className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">{t.hero.startDiagnosis}</h2>
                            <p className="text-gray-400 mb-8">{t.hero.description}</p>
                            <button
                                onClick={() => setStep("question")}
                                className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                            >
                                Start Quiz
                            </button>
                        </div>
                    )}

                    {/* QUESTION SCREEN */}
                    {step === "question" && (
                        <div>
                            <div className="mb-6 flex justify-between items-end">
                                <span className="text-xs font-bold text-indigo-400 tracking-widest">QUESTION 0{currentQIndex + 1}</span>
                                <span className="text-xs text-gray-500">{currentQIndex + 1} / {t.diagnosis.questions.length}</span>
                            </div>

                            <h3 className="text-xl font-bold mb-8 min-h-[60px]">
                                {t.diagnosis.questions[currentQIndex].question}
                            </h3>

                            <div className="space-y-3">
                                {t.diagnosis.questions[currentQIndex].answers.map((ans: { text: string; type: string }, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(ans.type as "s" | "a" | "b")}
                                        className="w-full text-left p-4 rounded-xl border border-white/10 hover:bg-white/5 hover:border-indigo-500/50 transition-all active:scale-98"
                                    >
                                        {ans.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* RESULT SCREEN */}
                    {step === "result" && resultType && (
                        <div className="text-center py-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mx-auto flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 animate-pulse">
                                <Trophy className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-gray-400 text-sm mb-2 uppercase tracking-widest">{t.diagnosis.resultTitle}</h3>
                            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                {resultType.toUpperCase()}
                            </h2>
                            <p className="text-gray-400 mb-8 text-sm">
                                {t.diagnosis.resultDesc}
                            </p>

                            <div className="space-y-3">
                                <button
                                    onClick={handleViewDetails}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                                >
                                    {t.diagnosis.checkTypeBtn} <ArrowRight className="w-4 h-4 inline ml-1" />
                                </button>
                                <button
                                    onClick={handleRestart}
                                    className="w-full py-3 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-sm"
                                >
                                    {t.diagnosis.restartBtn}
                                </button>
                            </div>
                        </div>
                    )}

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
