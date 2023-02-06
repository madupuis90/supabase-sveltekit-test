import '$lib/supabase';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const { session, supabaseClient } = await getSupabase(event);

  // Load the user profile
  const { data: profile, error } = await supabaseClient
    .from('profiles')
    .select()
    .eq('id', session?.user.id)
    .single();

  console.log('hooks.server called');

  // Give access to the client & session in all server functions
  event.locals.sb = supabaseClient;
  event.locals.session = session;
  event.locals.profile = profile;

  // Protected routes for authenticated users
  if (event.url.pathname.startsWith('/kingdom')) {
    if (!session) {
      throw redirect(303, '/')
    }
    if (!profile) {
      throw redirect(303, '/profile')
    }
  }

  if (event.url.pathname.startsWith('/profile')) {
    if (!session) {
      throw redirect(303, '/')
    }
  }
  return resolve(event);
};
