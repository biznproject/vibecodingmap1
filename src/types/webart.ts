export interface WebArt {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    category: string | null;
    author: string | null;
    thumbnail_url: string | null;
    is_published: boolean;
    view_count: number;
    created_at: string;
}
