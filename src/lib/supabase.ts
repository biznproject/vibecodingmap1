import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// During server-side build, env vars may not be available.
// We export a lazy getter so createClient is never called with empty values at build time.
function createSupabaseClient() {
    if (!supabaseUrl || !supabaseAnonKey) {
        // Return a dummy object during SSR/build when env vars are absent.
        // Prevent "Cannot read properties of null (reading 'from')"
        return {
            from: () => ({
                select: () => ({ eq: () => ({ order: () => ({ limit: () => ({ single: () => ({ data: null, error: null }) }) }) }) }),
                insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }),
                update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }) }),
                delete: () => ({ eq: () => ({ data: null, error: null }) })
            }),
            auth: {
                getSession: async () => ({ data: { session: null }, error: null }),
                getUser: async () => ({ data: { user: null }, error: null }),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } })
            },
            rpc: async () => ({ data: null, error: null })
        } as any;
    }
    return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createSupabaseClient();
