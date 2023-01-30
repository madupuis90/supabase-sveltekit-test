import { createClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

console.log('lib/supabase called');
export default supabase;
