"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, Palette, Eye, BookOpen, Rocket, Terminal, Layers } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-bauhaus-red/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-bauhaus-blue/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

            <div className="max-w-4xl w-full relative z-10">
                {/* Header Section */}
                <div className="flex flex-col gap-6 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-bauhaus-yellow flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <Compass className="text-black" size={24} strokeWidth={3} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                            About <span className="text-bauhaus-blue">Vibecodingmap</span>
                        </h1>
                    </div>
                    <div className="w-32 h-1.5 bg-bauhaus-red" />
                </div>

                {/* Content Section 1: Navigation Compass */}
                <div className="mb-24 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="px-4 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em]">Section 01</div>
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">An Orchestration Compass for the Agentic Era</h2>
                    </div>

                    <div className="bauhaus-border p-10 bg-white/5 backdrop-blur-md border-l-[12px] border-l-bauhaus-yellow">
                        <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground/80 mb-8">
                            In the era of <span className="text-white font-bold underline decoration-bauhaus-red underline-offset-4 decoration-2">"Agentic AI,"</span> where AI agents write and execute code directly, the human role has evolved from mere typing to <span className="text-bauhaus-yellow font-black uppercase">"Strategic Orchestration."</span>
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-medium text-foreground/60 leading-relaxed">
                            <div className="flex gap-4">
                                <Terminal className="text-bauhaus-blue shrink-0" size={20} />
                                <p>
                                    Vibecodingmap is a mind-map-style checklist tool—a procedural specification helper that assists in topic selection and goal setting to ensure agents perform optimally.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <Layers className="text-bauhaus-red shrink-0" size={20} />
                                <p>
                                    By following our A-L-V (Aim, Logic, Val) structure, users gain a 3D understanding of project architecture, naturally leading to high-level Vibe Coding education.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section 2: Web ART */}
                <div className="mb-24 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="px-4 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em]">Section 02</div>
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Web ART: The Intersection of Technology & Art</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Critique */}
                        <div className="bauhaus-border p-8 bg-white/5 hover:border-bauhaus-red transition-colors group">
                            <Eye className="text-bauhaus-red mb-6 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-lg font-black mb-4 uppercase tracking-tighter">Systematic Critique</h3>
                            <p className="text-xs font-medium text-foreground/60 leading-relaxed">
                                Multimodal AI analyzes global websites through artistic and technical lenses, generating sophisticated critique content based on our proprietary evaluation index.
                            </p>
                        </div>

                        {/* Hub */}
                        <div className="bauhaus-border p-8 bg-white/5 hover:border-bauhaus-blue transition-colors group">
                            <BookOpen className="text-bauhaus-blue mb-6 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-lg font-black mb-4 uppercase tracking-tighter">Knowledge Hub</h3>
                            <p className="text-xs font-medium text-foreground/60 leading-relaxed">
                                Essential information for project success: latest Vibe Coding trends, educational specification templates, and AI agent optimization tips.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bauhaus-border p-8 bg-black hover:bg-bauhaus-yellow hover:text-black transition-all group duration-500">
                            <Rocket className="text-bauhaus-yellow group-hover:text-black mb-6 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-lg font-black mb-4 uppercase tracking-tighter">Spreading Inspiration</h3>
                            <p className="text-xs font-bold leading-relaxed">
                                A future where code becomes art and design becomes a masterpiece. Vibecodingmap is the basecamp where Vibe Coders find inspiration and grow.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-1000 delay-500">
                    <Link
                        href="/"
                        className="group flex items-center gap-4 px-16 py-8 bg-foreground text-background font-black uppercase italic text-2xl transition-all hover:bg-bauhaus-yellow hover:shadow-[16px_16px_0px_0px_rgba(255,183,3,0.3)] hover:scale-105"
                    >
                        <ArrowLeft size={32} strokeWidth={3} className="group-hover:-translate-x-2 transition-transform" />
                        Back to <span className="text-bauhaus-red">Main Page</span>
                    </Link>

                    <div className="mt-16 flex gap-12 items-center opacity-30">
                        <div className="w-2 h-2 bg-bauhaus-red" />
                        <div className="w-2 h-2 bg-bauhaus-yellow" />
                        <div className="w-2 h-2 bg-bauhaus-blue" />
                    </div>
                </div>
            </div>
        </div>
    );
}
