import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect, type ActionFailure } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions } from './$types';

const registerSchema = z.object({
  email: z
    .string({ required_error: 'email is required' })
    .email('invalid email'),
  password: z
    .string({ required_error: 'password required' })
    .min(8, 'password need to be at least 8 characters'),
});

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const formData = Object.fromEntries(await request.formData());

    const { data, error: err } = await locals.sb.auth.signInWithPassword({
      email: formData.email as string,
      password: formData.password as string,
    });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          data: {
            email: formData.email
          },
          error: 'Invalid credentials'
        });
      }
      return fail(500, {
        error: 'Server error. Try again later.'
      });
    }

    throw redirect(303, '/kingdom');
  },

  register: async ({ request, locals }) => {
    const formData = Object.fromEntries(await request.formData());

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      // return error to client 
      return {
        data: {
          email: formData.email as string
        },
        errors: result.error.flatten().fieldErrors
      }
    }

    // try to register
    const { data, error: err } = await locals.sb.auth.signUp({
      email: result.data.email,
      password: result.data.password
    });

    if (err) {
      console.log(err);
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          error: 'Invalid credentials'
        });
      }
      return fail(500, {
        error: 'Server error. Try again later.'
      });
    }

    // redirect to kingdom page
    throw redirect(303, '/kingdom');
  }
};
