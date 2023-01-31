import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';

const registerSchema = z.object({
  email: z
    .string({ required_error: "email is required"})
    .email("invalid email"),
  password: z
    .string({required_error: "password required"})
    .min(8, "password need to be at least 8 characters"),
});

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const { data, error: err } = await locals.sb.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid credentials'
				});
			}
			return fail(500, {
				message: 'Server error. Try again later.'
			});
		}

		throw redirect(303, '/');
	},

  register: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
    console.log(111)
    try {
      const result = registerSchema.parse(body);
            console.log(result);
    } catch (err: any) {
      const { fieldErrors: errors } = err.flatten();
      console.log(errors);
    }

		const { data, error: err } = await locals.sb.auth.signUp({
			email: body.email as string,
			password: body.password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid credentials'
				});
			}
			return fail(500, {
				message: 'Server error. Try again later.'
			});
		}

		throw redirect(303, '/');
	}
};
