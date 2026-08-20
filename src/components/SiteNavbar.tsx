"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SiteNavbar = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Change background when scrolled past Tier 1 (approx 80vh)
            if (window.scrollY > window.innerHeight * 0.5) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-64px)] max-w-5xl">
            <div className={`px-8 py-4 rounded-full flex items-center justify-between border transition-all duration-500 ${isScrolled
                    ? "bg-black/80 border-white/20 shadow-2xl backdrop-blur-lg"
                    : "bg-black/50 border-white/10 shadow-xl backdrop-blur-md"
                } scale-[0.98]`}>
                {/* Branding */}
                <Link href="/" className="group flex items-center gap-3">
                    <div className="w-3 h-3 bg-bauhaus-red rounded-full group-hover:animate-ping" />
                    <span className="text-base font-black tracking-tighter text-white 
  mr-6 sm:mr-8 md:mr-12
">
                        VIBECODINGMAP
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    <Link
                        href="/about"
                        className="text-xs font-bold text-white/70 hover:text-white transition-colors tracking-tight uppercase"
                    >
                        About
                    </Link>
                    <Link
                        href="/webart"
                        className="relative group px-4 py-2"
                    >
                        <span className="relative z-10 text-xs font-black text-bauhaus-yellow tracking-widest uppercase group-hover:text-black transition-colors duration-300">
                            WebART
                        </span>
                        <div className="absolute inset-0 bg-bauhaus-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-sm" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-bauhaus-red rounded-full opacity-0 group-hover:opacity-100 animate-pulse" />
                    </Link>
                    <Link
                        href="/x402"
                        className="relative group px-4 py-2"
                    >
                        <span className="relative z-10 text-xs font-black text-cyan-400 tracking-widest uppercase group-hover:text-black transition-colors duration-300">
                            x402 Market
                        </span>
                        <div className="absolute inset-0 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-sm" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
                    </Link>
                    <Link
                        href="/contact"
                        className="text-xs font-bold text-white/70 hover:text-white transition-colors tracking-widest uppercase"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default SiteNavbar;
