"use client";

import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function ViewCountTracker({ id }: { id: string }) {
    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!url || !key) {
            return;
        }

        const supabase = createClient(url, key);

        async function incrementView() {
            const { error: rpcError } = await supabase.rpc('increment_view_count', { row_id: id });
            if (rpcError) {
                // Fallback: manual update
                await supabase.from('webart')
                    .update({ view_count: 1 })
                    .eq('id', id);
            }
        }

        incrementView();
    }, [id]);

    return null; // UI 없음 - 조회수만 증가
}
