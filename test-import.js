
const { createClient } = require('@supabase/supabase-js');

async function testImport() {
    console.log('Testing import...');
    try {
        console.log('Supabase client type:', typeof createClient);
    } catch (e) {
        console.error('Import failed:', e);
    }
}

testImport();
