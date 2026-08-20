
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cdmrdzqrunysknhtxmft.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkbXJkenFydW55c2tuaHR4bWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMTM2NjgsImV4cCI6MjA4Mzg4OTY2OH0.ADLXSyEFxIG7JiVoHNbwqHZ1eC1vzge10Pqsuos1HTY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDetailedSugs() {
    const { data, error } = await supabase
        .from('webart')
        .select('id, title, slug')
        .ilike('title', '%Exploring the New Aura 3%');

    if (error) {
        console.error('Error:', error);
        return;
    }

    data.forEach(item => {
        console.log(`ID: ${item.id}`);
        console.log(`Title: "${item.title}" (length: ${item.title.length})`);
        console.log(`Slug:  "${item.slug}" (length: ${item.slug.length})`);

        // Show hex to be sure about characters
        console.log('Slug Hex:', Buffer.from(item.slug).toString('hex'));
    });
}

checkDetailedSugs();
