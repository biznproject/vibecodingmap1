import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Eye } from 'lucide-react';
import { WebArt } from '@/types/webart';

export const revalidate = 60;

async function getWebArts(): Promise<WebArt[]> {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase env vars missing. Returning empty array for build.');
        return [];
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    try {
        const { data, error } = await supabase
            .from('webart')
            .select('*')
            .eq('is_published', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Supabase fetch error:", error);
            return [];
        }
        return data || [];
    } catch (err) {
        console.error("Error fetching webarts:", err);
        return [];
    }
}

export default async function WebArtPage() {
    const arts = await getWebArts();

    return (
        <div className="flex-1 flex flex-col w-full bg-white text-black min-h-screen pt-24 pb-12">
            {/* Header section with Bauhaus aesthetic */}
            <div className="px-8 mb-16">
                <div className="flex flex-col md:flex-row md:items-end gap-6 border-b-8 border-black pb-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-bauhaus-red" />
                            <div className="w-8 h-8 bg-bauhaus-yellow rounded-full" />
                            <div className="w-8 h-8 bg-bauhaus-blue" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                            Web<span className="text-white bg-black px-2">ART</span><br />
                            ARCHIVE
                        </h1>
                    </div>
                    <div className="max-w-md">
                        <p className="text-xl font-bold leading-tight uppercase italic mb-2 tracking-tighter">
                            A curated collection of structural web experiments and design orchestration logs.
                        </p>
                        <div className="h-2 w-32 bg-bauhaus-red" />
                    </div>
                </div>
            </div>

            {/* Content list */}
            <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l-8 border-t-8 border-black">
                {arts.length === 0 ? (
                    <div className="col-span-full py-32 flex flex-col items-center justify-center border-b-8 border-r-8 border-black bg-white/5">
                        <div className="text-4xl font-black opacity-20 uppercase tracking-tighter mb-4">No Entries Detected</div>
                        <div className="w-24 h-1 bg-black opacity-10" />
                    </div>
                ) : (
                    arts.map((art) => (
                        <Link
                            key={art.id}
                            href={`/webart/${art.slug}`}
                            className="group relative flex flex-col border-r-8 border-b-8 border-black hover:bg-black hover:text-white transition-all p-8"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100">
                                    {art.category || 'GENERAL'}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye size={12} />
                                    <span className="text-[10px] font-black">{art.view_count}</span>
                                </div>
                            </div>

                            {art.thumbnail_url && (
                                <div className="mb-8 border-4 border-black overflow-hidden bg-black aspect-video relative group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] transition-all">
                                    <Image
                                        src={art.thumbnail_url}
                                        alt={art.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-all duration-700 scale-105 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 border-2 border-white/10 pointer-events-none" />
                                </div>
                            )}

                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none group-hover:translate-x-2 transition-transform">
                                {art.title}
                            </h2>

                            <p className="text-sm font-medium leading-relaxed mb-8 opacity-70 line-clamp-3">
                                {art.excerpt || 'Discover the structural essence of this web experiment.'}
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-6 border-t-2 border-black group-hover:border-white/20">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 bg-bauhaus-yellow group-hover:bg-white" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Read More</span>
                                </div>
                                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </div>
                        </Link>
                    ))
                )}
            </div>

            {/* Aesthetic Footer Element */}
            <div className="px-8 mt-24">
                <div className="border-t-8 border-black pt-8 flex justify-between items-start opacity-30">
                    <div className="text-[10px] font-black tracking-[0.5em] uppercase">
                        VIBECODINGMAP // WEB DIRECTORY
                    </div>
                    <div className="flex gap-1">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-1 h-8 bg-black" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
