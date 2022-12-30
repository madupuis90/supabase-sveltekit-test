import supabase from './supabase';

export function getUser() {
  return supabase.auth.getUser();
}

export async function signIn() {

}