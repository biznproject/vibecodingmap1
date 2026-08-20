
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


async function testSitemap() {
    console.log('Testing Supabase connection...');
    console.log('URL:', supabaseUrl);
    console.log('Key:', supabaseKey ? 'PRESENT' : 'MISSING');

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing environment variables');
        return;
    }

    console.log('Initializing Supabase client...');
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Client initialized. Fetching data...');

    const { data: arts, error } = await supabase
        .from('webart')
        .select('slug, updated_at, created_at')
        .eq('is_published', true);

    console.log('Query finished.');

    if (error) {
        console.error('Error fetching webart:', error);
    } else {
        console.log('Fetched', arts.length, 'arts');
        if (arts.length > 0) {
            console.log('Sample slugs:', arts.slice(0, 5).map(a => a.slug));
        }
    }
}

testSitemap();
