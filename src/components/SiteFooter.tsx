"use client";

import React from "react";
import Link from "next/link";

const SiteFooter = () => {
    return (
        <footer className="w-full bg-black py-8 px-12 mt-auto border-t border-white/10 relative z-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Site Credits */}
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">
                        © 2026 VIBECODINGMAP.COM
                    </span>
                    <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">
                        Experimental Web Orchestration System
                    </span>
                </div>

                {/* Footer Links */}
                <div className="flex items-center gap-8">
                    <Link
                        href="/policy"
                        className="text-[10px] font-bold text-white/50 hover:text-bauhaus-yellow transition-colors uppercase tracking-widest"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="/terms"
                        className="text-[10px] font-bold text-white/50 hover:text-bauhaus-red transition-colors uppercase tracking-widest"
                    >
                        Terms of Service
                    </Link>
                </div>

                {/* Bauhaus Element */}
                <div className="flex gap-2">
                    <div className="w-2 h-2 bg-bauhaus-red" />
                    <div className="w-2 h-2 bg-bauhaus-yellow" />
                    <div className="w-2 h-2 bg-bauhaus-blue" />
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
