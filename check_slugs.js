
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cdmrdzqrunysknhtxmft.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkbXJkenFydW55c2tuaHR4bWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMTM2NjgsImV4cCI6MjA4Mzg4OTY2OH0.ADLXSyEFxIG7JiVoHNbwqHZ1eC1vzge10Pqsuos1HTY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSlugs() {
    console.log('Fetching webart slugs...');
    const { data, error } = await supabase
        .from('webart')
        .select('title, slug, is_published');

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('WebArt Entries:');
    data.forEach(item => {
        console.log(`- Title: ${item.title}`);
        console.log(`  Slug:  ${item.slug}`);
        console.log(`  Pub:   ${item.is_published}`);
    });
}

checkSlugs();
