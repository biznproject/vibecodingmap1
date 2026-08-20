"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle, Scale, Copyright, Mail, Zap } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-24 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-bauhaus-yellow/10 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-bauhaus-red/10 rounded-full translate-x-1/2 blur-3xl pointer-events-none" />

            <div className="max-w-4xl w-full relative z-10">
                {/* Header Section */}
                <div className="flex flex-col gap-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-bauhaus-red flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <FileText className="text-white" size={24} strokeWidth={3} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                            Terms of <span className="text-bauhaus-yellow">Service</span>
                        </h1>
                    </div>
                    <p className="text-lg md:text-xl font-bold text-foreground/70 border-l-8 border-bauhaus-yellow pl-6 py-2 leading-relaxed">
                        Welcome to Vibecodingmap.com. By using our tool, you agree to these fundamental operational principles
                        designed to protect the creative freedom and privacy of all users.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 gap-12 mb-20">

                    {/* Section 1 & 2: Agreement & Data Volatility */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bauhaus-border p-8 bg-white/5 backdrop-blur-sm group hover:border-bauhaus-blue transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <Scale className="text-bauhaus-blue" size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-bauhaus-blue">Article 01</span>
                            </div>
                            <h2 className="text-xl font-black mb-4 uppercase tracking-tight">Agreement</h2>
                            <p className="text-sm font-medium text-foreground/60 leading-relaxed">
                                Vibecodingmap.com is an open tool for immediate coding blueprint design.
                                By accessing the site and creating your first node, you are deemed to have agreed to these terms.
                            </p>
                        </div>

                        <div className="bauhaus-border p-8 bg-black/40 border-bauhaus-red border-4 shadow-[8px_8px_0px_0px_rgba(230,57,70,0.3)] group hover:-translate-y-1 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="text-bauhaus-red" size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-bauhaus-red">Crucial: Article 02</span>
                            </div>
                            <h2 className="text-xl font-black mb-4 uppercase tracking-tight text-white">Data Volatility</h2>
                            <p className="text-sm font-bold text-white/80 leading-relaxed mb-4">
                                We maintain a 'Zero-Log' policy. No personal data is collected, and no session data is stored on our servers.
                            </p>
                            <div className="p-3 bg-bauhaus-red/20 border-l-4 border-bauhaus-red text-[10px] font-black uppercase text-bauhaus-red italic">
                                Closing or refreshing the browser will immediately destroy your progress. Use the [EXPORT] function frequently.
                            </div>
                        </div>
                    </div>

                    {/* Section 3 & 4: Liability & Property */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bauhaus-border p-8 bg-white/5 backdrop-blur-sm group hover:border-bauhaus-yellow transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="text-bauhaus-yellow" size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-bauhaus-yellow">Article 03</span>
                            </div>
                            <h2 className="text-xl font-black mb-4 uppercase tracking-tight">Responsibility</h2>
                            <p className="text-sm font-medium text-foreground/60 leading-relaxed">
                                Users are solely responsible for specifications and AI-generated outputs based on them.
                                The site is not liable for technical errors or legal disputes arising from information usage.
                            </p>
                        </div>

                        <div className="bauhaus-border p-8 bg-white/5 backdrop-blur-sm group hover:border-bauhaus-blue transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <Copyright className="text-bauhaus-blue" size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-bauhaus-blue">Article 04</span>
                            </div>
                            <h2 className="text-xl font-black mb-4 uppercase tracking-tight">Ownership</h2>
                            <p className="text-sm font-medium text-foreground/60 leading-relaxed">
                                Tool logic (A-L-V) and UI are Site property. User-created blueprints (MD/TXT) belong entirely
                                to the creator for any commercial or non-commercial use.
                            </p>
                        </div>
                    </div>

                    {/* Section 5 & 6: Fair Use & Contact */}
                    <div className="bauhaus-border p-8 bg-foreground/5 border-dashed">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-4">05 Fair Use Policy</h3>
                                <p className="text-sm font-medium text-foreground/60 leading-relaxed italic">
                                    Systems must not be overloaded or disrupted. Malicious reverse engineering that damages
                                    the creative essence of this tool is strictly prohibited.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-foreground/40">06 Contact Inquiry</h3>
                                <a href="mailto:cyberhiphopofficial@gmail.com" className="flex items-center gap-3 text-bauhaus-blue hover:text-bauhaus-yellow transition-colors group">
                                    <Mail size={18} />
                                    <span className="text-sm font-black tracking-wider group-hover:underline">cyberhiphopofficial@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Navigation */}
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-1000 delay-500">
                    <Link
                        href="/"
                        className="group flex items-center gap-4 px-12 py-6 bg-foreground text-background font-black uppercase italic text-xl transition-all hover:bg-bauhaus-red hover:text-white hover:scale-105 shadow-[12px_12px_0px_0px_rgba(230,57,70,0.3)] hover:shadow-none"
                    >
                        <ArrowLeft size={24} strokeWidth={3} className="group-hover:-translate-x-2 transition-transform" />
                        Back to <span className="text-bauhaus-yellow">Main Page</span>
                    </Link>

                    <div className="mt-12 flex gap-4 opacity-30">
                        <div className="w-1 h-1 bg-foreground rounded-full" />
                        <div className="w-1 h-1 bg-foreground rounded-full" />
                        <div className="w-1 h-1 bg-foreground rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
