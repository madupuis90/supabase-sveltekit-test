// import supabase from '$lib/supabase';
import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
	const { data, error: err } = await event.locals.sb.from('clicks').select('*');
	return { data: data };
}

export const actions: Actions = {
	add: async ({ request, locals }) => {
		if (!locals.session) {
			return fail(403, { error: 'Must be logged in' });
		}

		const body = Object.fromEntries(await request.formData());
		const { data, error } = await locals.sb
			.from('clicks')
			.upsert({ count: body.clicks, user_id: locals.session.user.id }, { onConflict: 'user_id' })
			.select();

		console.log({ data, error });
	}
};
