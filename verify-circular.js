
const { createClient } = require('@supabase/supabase-js');

async function testCircularNav() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        console.error('Missing env vars');
        return;
    }

    const supabase = createClient(url, key);

    // 1. Get the oldest item
    const { data: oldest } = await supabase
        .from('webart')
        .select('slug, created_at')
        .order('created_at', { ascending: true })
        .limit(1)
        .single();

    console.log('Oldest:', oldest.slug);

    // 2. Simulate getNextSlug logic for the oldest item
    const { data: nextOlder } = await supabase
        .from('webart')
        .select('slug')
        .lt('created_at', oldest.created_at)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (!nextOlder) {
        console.log('No older item found (correct for oldest item). Wrapping around...');
        const { data: newest } = await supabase
            .from('webart')
            .select('slug')
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        console.log('Circular NEXT target:', newest.slug);

        // Final sanity check: newest should be different from oldest unless only 1 item
        const { count } = await supabase.from('webart').select('*', { count: 'exact', head: true });
        console.log('Total items:', count);
    } else {
        console.error('Logic failure: Found older item for the supposedly oldest entry');
    }
}

testCircularNav();
