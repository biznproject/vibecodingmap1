"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { WebArt } from '@/types/webart';
import { ArrowLeft, Clock, User, Share2, Eye, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function WebArtDetailClient() {
    const params = useParams();
    const router = useRouter();
    const [art, setArt] = useState<WebArt | null>(null);
    const [nextSlug, setNextSlug] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetail() {
            if (!params?.slug) return;

            const { data, error } = await supabase
                .from('webart')
                .select('*')
                .eq('slug', params.slug)
                .single();

            if (error) {
                console.error('Error fetching detail:', error);
                if (error.code === 'PGRST116') {
                    // Not found
                }
            } else if (data) {
                setArt(data);
                // Increment view count (simple)
                const { error: rpcError } = await supabase.rpc('increment_view_count', { row_id: data.id });

                if (rpcError) {
                    console.warn('RPC increment failed, falling back to manual update:', rpcError);
                    // Fallback if RPC doesn't exist: manually update
                    await supabase.from('webart')
                        .update({ view_count: (data.view_count || 0) + 1 })
                        .eq('id', data.id);
                }

                // Fetch next art (chronologically older/next in list)
                const { data: nextData } = await supabase
                    .from('webart')
                    .select('slug')
                    .lt('created_at', data.created_at)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (nextData) {
                    setNextSlug(nextData.slug);
                } else {
                    // Circular navigation: if no older art, fetch the newest one
                    const { data: newestData } = await supabase
                        .from('webart')
                        .select('slug')
                        .order('created_at', { ascending: false })
                        .limit(1)
                        .maybeSingle();

                    if (newestData) {
                        setNextSlug(newestData.slug);
                    }
                }
            }
            setLoading(false);
        }

        fetchDetail();
    }, [params?.slug]);

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-background">
                <div className="w-16 h-1 bg-bauhaus-red animate-pulse" />
                <span className="mt-4 font-black uppercase text-[10px] tracking-widest">Retrieving Data...</span>
            </div>
        );
    }

    if (!art) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-background p-8">
                <h1 className="text-6xl font-black uppercase mb-4 tracking-tighter">404 // NOT FOUND</h1>
                <p className="text-xl font-bold uppercase opacity-50 mb-8 tracking-widest">THE ARCHIVE IS EMPTY AT THIS ADDRESS</p>
                <Link
                    href="/webart"
                    className="px-8 py-4 border-4 border-black font-black uppercase hover:bg-black hover:text-white transition-all flex items-center gap-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                    <ArrowLeft size={20} /> RETURN TO ARCHIVE
                </Link>
            </div>
        );
    }

    return (
        <article className="flex-1 flex flex-col w-full bg-white text-black min-h-screen pt-24 pb-32">
            {/* Top Navigation */}
            <div className="px-8 mb-12">
                <Link href="/webart" className="inline-flex items-center gap-2 group">
                    <div className="w-10 h-10 flex items-center justify-center border-2 border-black group-hover:bg-black group-hover:text-white transition-all">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Back to Gallery</span>
                </Link>
            </div>

            {/* Title Section */}
            <header className="px-8 mb-16 max-w-6xl">
                <div className="text-[10px] font-black text-bauhaus-red uppercase tracking-[0.3em] mb-4">
                    {art.category || 'ARCHIVE ENTRY'}
                </div>
                <h1 className="text-5xl md:text-8xl font-black uppercase leading-none tracking-tighter mb-8 break-words">
                    {art.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-12 gap-y-6 border-y-4 border-black py-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black flex items-center justify-center">
                            <User size={18} className="text-white" />
                        </div>
                        <div>
                            <div className="text-[8px] font-black uppercase opacity-40">Author</div>
                            <div className="text-xs font-black uppercase tracking-widest">{art.author || 'SYSTEM DIRECTOR'}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-bauhaus-yellow flex items-center justify-center">
                            <Clock size={18} className="text-black" />
                        </div>
                        <div>
                            <div className="text-[8px] font-black uppercase opacity-40">Date</div>
                            <div className="text-xs font-black uppercase tracking-widest">
                                {new Date(art.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-bauhaus-blue flex items-center justify-center">
                            <Eye size={18} className="text-white" />
                        </div>
                        <div>
                            <div className="text-[8px] font-black uppercase opacity-40">Visibility</div>
                            <div className="text-xs font-black uppercase tracking-widest">{art.view_count} ARCHIVE CALLS</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Section */}
            <div className="px-8 flex flex-col md:flex-row gap-16 max-w-7xl mx-auto w-full">
                {/* Main Content */}
                <div className="flex-1">
                    {art.thumbnail_url && (
                        <div className="mb-12 border-[12px] border-black overflow-hidden bg-black shadow-[24px_24px_0px_0px_rgba(255,255,255,0.05)]">
                            <img
                                src={art.thumbnail_url}
                                alt={art.title}
                                className="w-full h-auto object-cover transition-all duration-700"
                            />
                        </div>
                    )}

                    <div className="prose max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-strong:font-black prose-img:border-4 prose-img:border-black prose-a:text-bauhaus-red prose-a:no-underline hover:prose-a:underline">
                        <div
                            dangerouslySetInnerHTML={{ __html: art.content || '' }}
                        />
                    </div>

                    {/* Back to Gallery Button at the bottom */}
                    <div className="mt-20 pt-12 border-t-4 border-black">
                        <Link
                            href="/webart"
                            className="inline-flex items-center gap-4 px-8 py-4 border-4 border-black font-black uppercase hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none bg-white"
                        >
                            <ArrowLeft size={20} /> BACK TO GALLERY
                        </Link>
                    </div>
                </div>

                {/* Sidebar Information */}
                <aside className="w-full md:w-80 shrink-0">
                    <div className="sticky top-32 flex flex-col gap-12">
                        <div className="border-4 border-black p-8 bg-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-bauhaus-red -mr-8 -mt-8 rotate-45 group-hover:scale-150 transition-transform" />
                            <h3 className="text-xl font-black uppercase mb-6 tracking-widest border-b-2 border-black pb-2">Entry Metadata</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center border-b border-black/10 pb-2">
                                    <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest">Entry ID</span>
                                    <span className="text-[10px] font-black font-mono">#{art.id.slice(0, 8)}</span>
                                </li>
                                <li className="flex justify-between items-center border-b border-black/10 pb-2">
                                    <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest">Status</span>
                                    <span className="text-[10px] font-black uppercase text-green-600">VERIFIED</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest">Category</span>
                                    <span className="text-[10px] font-black uppercase">{art.category || 'STRUCTURAL'}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Link
                                href={nextSlug ? `/webart/${nextSlug}` : "/webart"}
                                className="w-full py-4 bg-black text-white font-black uppercase flex items-center justify-center gap-3 hover:bg-bauhaus-red transition-all"
                            >
                                <ChevronRight size={18} /> NEXT
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>
        </article>
    );
}
