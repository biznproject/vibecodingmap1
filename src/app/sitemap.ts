import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 3600;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodingmap.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. 기본 정적 경로 정의
    const routes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/webart`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        }
    ];

    // 2. Supabase에서 동적 경로 가져오기 (/webart/[slug])
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseKey) {
            const supabase = createClient(supabaseUrl, supabaseKey);

            // [수정] .select()에서 존재하지 않는 updated_at 제거
            const { data: arts, error } = await supabase
                .from('webart')
                .select('slug, created_at')
                .eq('is_published', true);

            if (error) {
                console.error('Supabase fetch error:', error);
            }

            if (arts) {
                const dynamicRoutes = arts.map((art) => ({
                    url: `${baseUrl}/webart/${art.slug}`,
                    // [수정] updated_at 대신 실제 존재하는 created_at 사용
                    lastModified: new Date(art.created_at),
                    changeFrequency: 'weekly' as const,
                    priority: 0.7,
                }));

                routes.push(...dynamicRoutes);
            }
        }
    } catch (err) {
        console.error("Error generating sitemap:", err);
    }

    return routes;
}