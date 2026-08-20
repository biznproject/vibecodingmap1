"use client";

import React from "react";
import { useScenario } from "@/contexts/ScenarioContext";
import { webGenres } from "@/data/siteContent";
import { motion } from "framer-motion";
import { Activity, Users, Box } from "lucide-react";

const DirectorStatusBar: React.FC = () => {
    const { scenario } = useScenario();

    // Calculate Gravity Index (Performance/Complexity simulation)
    // Base gravity is 5%, adds 5% per input field filled, plus complexity based on genre
    const fieldsFilled = [scenario.logline, scenario.target, scenario.coreFunction].filter(Boolean).length;
    const baseGravity = 5 + (fieldsFilled * 5);
    const genreComplexity = scenario.vibe === "vaporwave" ? 15 : scenario.vibe === "noir" ? 10 : 5;
    const totalGravity = baseGravity + genreComplexity;

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[100] bg-black text-white p-2 px-6 flex justify-between items-center bauhaus-border border-l-0 border-r-0 border-b-0"
        >
            <div className="flex gap-8 items-center">
                {/* Genre Context */}
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-bauhaus-yellow bauhaus-border" />
                    <div className="text-[10px] font-black uppercase tracking-widest text-bauhaus-yellow">
                        Genre: <span className="text-white">{scenario.vibe.toUpperCase()}</span>
                    </div>
                </div>

                {/* Gravity Index */}
                <div className="flex items-center gap-4 border-l border-white/20 pl-8">
                    <div className="text-[10px] font-black uppercase tracking-widest text-bauhaus-red">
                        Gravity Index
                    </div>
                    <div className="w-32 h-2 bg-white/10 bauhaus-border relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-bauhaus-red"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: totalGravity / 100 }}
                            transition={{ type: "spring", stiffness: 50 }}
                            style={{ originX: 0 }}
                        />
                    </div>
                    <div className="text-[10px] font-black">{totalGravity}%</div>
                </div>

                {/* Staff Count */}
                <div className="flex items-center gap-2 border-l border-white/20 pl-8">
                    <Box className="w-3 h-3 text-bauhaus-blue" />
                    <div className="text-[10px] font-black uppercase tracking-widest">
                        Active Staff: <span className="text-bauhaus-blue">{scenario.detectedFeatures.length + 3}</span>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="text-[10px] font-black uppercase tracking-widest opacity-60">
                    Director Context: Online
                </div>
            </div>
        </motion.div>
    );
};

export default DirectorStatusBar;
