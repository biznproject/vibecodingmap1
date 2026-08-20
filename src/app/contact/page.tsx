"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Mail, Award, Cpu, Palette, Globe } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-bauhaus-blue/10 rounded-full translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-bauhaus-yellow/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

            <div className="max-w-4xl w-full relative z-10">
                {/* Header Section */}
                <div className="flex flex-col gap-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-bauhaus-blue flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <MessageSquare className="text-white" size={24} strokeWidth={3} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                            Let's <span className="text-bauhaus-red">Talk</span>
                        </h1>
                    </div>
                    <div className="relative">
                        <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight uppercase">
                            About the New Art Category <br />
                            <span className="text-bauhaus-yellow">"Web Art"</span> & Vibecoding
                        </h2>
                        <div className="absolute -left-6 top-0 bottom-0 w-2 bg-bauhaus-red" />
                    </div>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {/* Identity Card */}
                    <div className="bauhaus-border p-10 bg-white/5 backdrop-blur-md relative overflow-hidden group hover:border-bauhaus-yellow transition-all duration-500">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-bauhaus-yellow/5 -translate-y-1/2 translate-x-1/2 rotate-45 group-hover:bg-bauhaus-yellow/10 transition-colors" />

                        <div className="flex items-center gap-3 mb-8">
                            <Award className="text-bauhaus-yellow" size={24} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-bauhaus-yellow">Creator Profile</span>
                        </div>

                        <div className="space-y-6">
                            <p className="text-xl font-black leading-snug tracking-tighter uppercase">
                                VIBECODINGMAP.COM is an AI, algorithm, and content creator.
                            </p>

                            <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
                                <div className="flex items-start gap-3">
                                    <Cpu className="text-bauhaus-blue shrink-0 mt-1" size={18} />
                                    <p className="text-sm font-medium text-foreground/70 leading-relaxed">
                                        Holding patents for <span className="text-white font-bold underline decoration-bauhaus-blue underline-offset-4">AI data preprocessing technology</span> in both the USA and Korea.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Palette className="text-bauhaus-red shrink-0 mt-1" size={18} />
                                    <p className="text-sm font-medium text-foreground/70 leading-relaxed">
                                        Pioneering the intersection of technical orchestration and digital aesthetics.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inquiry Section */}
                    <div className="flex flex-col justify-between py-4">
                        <div className="space-y-8">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Globe className="text-foreground/30" size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">Network Junction</span>
                                </div>
                                <h3 className="text-3xl font-black uppercase italic tracking-tighter">Official Inquiry</h3>
                            </div>

                            <div className="bauhaus-border p-8 bg-black hover:bg-bauhaus-blue transition-colors group cursor-pointer duration-500 shadow-[8px_8px_0px_0px_rgba(69,123,157,0.3)] hover:shadow-none">
                                <a href="mailto:cyberhiphopofficial@gmail.com" className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Mail className="text-bauhaus-red group-hover:text-white transition-colors" size={20} />
                                        <span className="text-[10px] font-bold text-white/40 uppercase group-hover:text-white/60">Send Email</span>
                                    </div>
                                    <span className="text-lg md:text-xl font-black text-white tracking-wider break-all">
                                        cyberhiphopofficial@gmail.com
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="mt-12 md:mt-0 p-6 border-2 border-dashed border-white/10 flex items-center justify-between">
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 bg-bauhaus-red" />
                                <div className="w-1.5 h-1.5 bg-bauhaus-yellow" />
                                <div className="w-1.5 h-1.5 bg-bauhaus-blue" />
                            </div>
                            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em]">System Ready</span>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-1000 delay-500">
                    <Link
                        href="/"
                        className="group flex items-center gap-4 px-12 py-6 bg-foreground text-background font-black uppercase italic text-xl transition-all hover:bg-bauhaus-blue hover:text-white hover:scale-105 shadow-[12px_12px_0px_0px_rgba(69,123,157,0.3)] hover:shadow-none"
                    >
                        <ArrowLeft size={24} strokeWidth={3} className="group-hover:-translate-x-2 transition-transform" />
                        Back to <span className="text-bauhaus-red">Main Page</span>
                    </Link>

                    <div className="mt-12 flex gap-8 items-center opacity-20">
                        <div className="h-0.5 w-12 bg-white" />
                        <div className="text-[10px] font-black uppercase tracking-[0.5em]">Connect</div>
                        <div className="h-0.5 w-12 bg-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}
