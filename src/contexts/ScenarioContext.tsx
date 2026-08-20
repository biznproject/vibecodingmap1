"use client";

import React, { createContext, useContext, useState } from "react";

export type VibeType = "bauhaus" | "noir" | "vaporwave" | "minimalist";

interface ScenarioState {
    logline: string;
    target: string;
    coreFunction: string;
    vibe: VibeType;
    detectedFeatures: string[]; // ['payment', 'ai', 'database', etc]
}

interface ScenarioContextType {
    scenario: ScenarioState;
    updateScenario: (updates: Partial<ScenarioState>) => void;
    isComplete: boolean;
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined);

const KEYWORDS: Record<string, string> = {
    "결제": "payment",
    "쇼핑": "shopping",
    "검색": "search",
    "AI": "ai",
    "데이터": "database",
    "서버": "server",
    "인증": "auth",
    "보안": "security"
};

export const ScenarioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [scenario, setScenario] = useState<ScenarioState>({
        logline: "",
        target: "",
        coreFunction: "",
        vibe: "bauhaus",
        detectedFeatures: []
    });

    const updateScenario = (updates: Partial<ScenarioState>) => {
        setScenario((prev) => {
            const newState = { ...prev, ...updates };

            // Dynamic Keyword Detection for Linkage
            if (updates.logline !== undefined) {
                const features = Object.entries(KEYWORDS)
                    .filter(([kw]) => newState.logline.includes(kw))
                    .map(([, val]) => val);
                newState.detectedFeatures = Array.from(new Set(features));
            }

            return newState;
        });
    };

    const isComplete =
        scenario.logline.length > 0 &&
        scenario.target.length > 0 &&
        scenario.coreFunction.length > 0;

    return (
        <ScenarioContext.Provider value={{ scenario, updateScenario, isComplete }}>
            {children}
        </ScenarioContext.Provider>
    );
}

export function useScenario() {
    const context = useContext(ScenarioContext);
    if (context === undefined) {
        throw new Error("useScenario must be used within a ScenarioProvider");
    }
    return context;
}
