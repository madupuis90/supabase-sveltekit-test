import type { LayoutServerLoadEvent } from './$types';

export async function load(event: LayoutServerLoadEvent) {
  console.log("layout load");
}