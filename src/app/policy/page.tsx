"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, EyeOff, Cookie, Database } from 'lucide-react';

export default function PolicyPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-24 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-bauhaus-red/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-bauhaus-blue/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

            <div className="max-w-4xl w-full relative z-10">
                {/* Header Section */}
                <div className="flex flex-col gap-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-bauhaus-yellow flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <Shield className="text-black" size={24} strokeWidth={3} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                            Privacy <span className="text-bauhaus-red">Policy</span>
                        </h1>
                    </div>
                    <p className="text-lg md:text-xl font-bold text-foreground/70 border-l-8 border-bauhaus-blue pl-6 py-2 leading-relaxed">
                        At Vibecodingmap.com, we prioritize your Web Art exploration and your privacy above all else.
                        Our service is built on the foundations of anonymity and data minimization.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {/* Section 1 */}
                    <div className="bauhaus-border p-8 bg-white/5 backdrop-blur-sm group hover:border-bauhaus-yellow transition-colors animate-in fade-in slide-in-from-bottom-12 duration-700 delay-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="text-bauhaus-yellow" size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-bauhaus-yellow">Security Protocol 01</span>
                        </div>
                        <h2 className="text-xl font-black mb-4 uppercase tracking-tight">No Registration</h2>
                        <p className="text-sm font-medium text-foreground/60 leading-relaxed">
                            No membership or login is required. We do not request, collect, or store any Personally Identifiable Information (PII) such as names, email addresses, or contact information.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="bauhaus-border p-8 bg-white/5 backdrop-blur-sm group hover:border-bauhaus-red transition-colors animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
                        <div className="flex items-center gap-3 mb-4">
                            <EyeOff className="text-bauhaus-red" size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-bauhaus-red">Privacy Protocol 02</span>
                        </div>
                        <h2 className="text-xl font-black mb-4 uppercase tracking-tight">No Tracking</h2>
                        <p className="text-sm font-medium text-foreground/60 leading-relaxed">
                            Your inputs and artistic outputs are processed locally on your device. No activity records or logs are stored on our servers. All temporary data is deleted when you close the browser.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div className="bauhaus-border p-8 bg-white/5 backdrop-blur-sm group hover:border-bauhaus-blue transition-colors animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300">
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="text-bauhaus-blue" size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-bauhaus-blue">Storage Protocol 03</span>
                        </div>
                        <h2 className="text-xl font-black mb-4 uppercase tracking-tight">Safest Data</h2>
                        <p className="text-sm font-medium text-foreground/60 leading-relaxed">
                            Non-existent data is the safest data. Since we do not store any information, there is no risk of data breaches, leaks, or unauthorized access.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div className="bauhaus-border p-8 bg-white/5 backdrop-blur-sm group hover:border-white transition-colors animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
                        <div className="flex items-center gap-3 mb-4">
                            <Cookie className="text-white" size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Utility Protocol 04</span>
                        </div>
                        <h2 className="text-xl font-black mb-4 uppercase tracking-tight">Minimal Cookies</h2>
                        <p className="text-sm font-medium text-foreground/60 leading-relaxed">
                            We do not use tracking or marketing cookies. Any cookies used are strictly for implementing essential site functionality and ensuring a smooth user experience.
                        </p>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-1000 delay-500">
                    <Link
                        href="/"
                        className="group flex items-center gap-4 px-12 py-6 bg-foreground text-background font-black uppercase italic text-xl transition-all hover:bg-bauhaus-yellow hover:scale-105 shadow-[12px_12px_0px_0px_rgba(255,183,3,0.3)] hover:shadow-none"
                    >
                        <ArrowLeft size={24} strokeWidth={3} className="group-hover:-translate-x-2 transition-transform" />
                        Back to <span className="text-bauhaus-red">Main Page</span>
                    </Link>

                    <div className="mt-12 flex gap-4">
                        <div className="w-16 h-1 bg-bauhaus-red" />
                        <div className="w-16 h-1 bg-bauhaus-yellow" />
                        <div className="w-16 h-1 bg-bauhaus-blue" />
                    </div>
                </div>
            </div>
        </div>
    );
}
