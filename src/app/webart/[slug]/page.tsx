import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User, Eye, ChevronRight } from 'lucide-react';
import { WebArt } from '@/types/webart';
import ViewCountTracker from './ViewCountTracker';

export const revalidate = 60;

async function getWebArtBySlug(slug: string): Promise<WebArt | null> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
        return null;
    }

    const supabase = createClient(url, key);
    const { data } = await supabase
        .from('webart')
        .select('*')
        .eq('slug', slug)
        .single();
    return data ?? null;
}

async function getNextSlug(createdAt: string): Promise<string | null> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
        return null;
    }

    const supabase = createClient(url, key);

    // 1. Try to get the next older art
    const { data: nextOlder } = await supabase
        .from('webart')
        .select('slug')
        .lt('created_at', createdAt)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (nextOlder) return nextOlder.slug;

    // 2. If no older art, wrap around to the newest art (circular navigation)
    const { data: newest } = await supabase
        .from('webart')
        .select('slug')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    return newest?.slug ?? null;
}

export default async function WebArtDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const decodedSlug = decodeURIComponent(resolvedParams.slug);
    const art = await getWebArtBySlug(decodedSlug);

    if (!art) notFound();

    const nextSlug = await getNextSlug(art.created_at);

    return (
        <article className="flex-1 flex flex-col w-full bg-white text-black min-h-screen pt-24 pb-32">
            {/* 조회수 증가 - 클라이언트에서만 실행 */}
            <ViewCountTracker id={art.id} />

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
                        <div className="mb-12 border-[12px] border-black bg-black shadow-[24px_24px_0px_0px_rgba(255,255,255,0.05)] relative w-full h-auto">
                            <Image
                                src={art.thumbnail_url}
                                alt={art.title}
                                width={1920}
                                height={2160}
                                sizes="(max-width: 768px) 100vw, 70vw"
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>
                    )}

                    <div className="prose max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-strong:font-black prose-img:border-4 prose-img:border-black prose-a:text-bauhaus-red prose-a:no-underline hover:prose-a:underline">
                        <div dangerouslySetInnerHTML={{ __html: art.content || '' }} />
                    </div>

                    <div className="mt-20 pt-12 border-t-4 border-black">
                        <Link
                            href="/webart"
                            className="inline-flex items-center gap-4 px-8 py-4 border-4 border-black font-black uppercase hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none bg-white"
                        >
                            <ArrowLeft size={20} /> BACK TO GALLERY
                        </Link>
                    </div>
                </div>

                {/* Sidebar */}
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
                                href={nextSlug ? `/webart/${nextSlug}` : '/webart'}
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
