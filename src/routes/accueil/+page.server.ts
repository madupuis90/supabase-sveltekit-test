import type { PageServerLoadEvent } from './$types';


export async function load(event: PageServerLoadEvent) {
  console.log("acceuil page");
}