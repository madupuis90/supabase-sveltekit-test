import { fail, redirect, type Actions } from '@sveltejs/kit';
import z from 'zod';

// TODO: verify that this is okay with zod
const RACES = ['human', 'elf', 'dwarf', 'goblin', 'orc', 'demon'] as const;
const ALIGMENT = ['good', 'evil', 'neutral'] as const;

const profileSchema = z.object({
  username: z
    .string({ required_error: 'username is required' })
    .min(3, 'username needs to be at least 3 characters')
    .regex(/[a-zA-Z]+/, 'username can only be letters'),
  //TODO: figure out how to type a valid error message
  race: z
    .enum(RACES, { required_error: 'race required', invalid_type_error: 'wrong race' }),
  alignment: z
    .enum(ALIGMENT, { required_error: 'alignment required', invalid_type_error: 'wrong alignment' }),
});

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const formData = Object.fromEntries(await request.formData());

    const result = profileSchema.safeParse(formData);

    if (!result.success) {
      // return error to client 
      return {
        data: {
          username: formData.username as string,
          race: formData.race as string,
          alignment: formData.alignemnt as string,
        },
        errors: result.error.flatten().fieldErrors
      }
    }

    // save in database
    const { data, error: err } = await locals.sb
      .from('profiles')
      .update({
        username: formData.username,
        race: formData.race,
        alignment: formData.alignment
      })
      .eq("id", locals.session?.user.id)
      .select();


    console.log(data, err);
    if (err) {
      return fail(500, {
        error: 'Server error. Try again later.'
      });
    }

    // redirect to home page
    throw redirect(301, '/kingdom');

  }

};