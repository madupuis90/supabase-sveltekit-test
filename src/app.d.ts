// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit/dist/types';
import type { Session } from '@supabase/supabase-js';

export interface Profile {
  username: string;
  race: string;
  alignment: string;
}
declare global {
  // and what to do when importing types
  declare namespace App {
    // interface Error {}
    interface Locals {
      sb: TypedSupabaseClient;
      session: Session | null;
      profile: Profile | null;
    }
    interface PageData {
      session: Session | null;
      // TODO: figure out why this breaks my kingdom page data types
      // profile: Profile | null;
    }
    // interface Platform {}
  }
}
