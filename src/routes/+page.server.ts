import supabase from '$lib/supabase'
import type { PageServerLoadEvent } from './$types';



export async function load(event: PageServerLoadEvent) {
  const { data, error } = await supabase.from('users').select();
  // const { data, error } = await supabase.from('users').insert({
  //   name: 'oooo'
  // });
  console.log(data, error);

  return { data };
}