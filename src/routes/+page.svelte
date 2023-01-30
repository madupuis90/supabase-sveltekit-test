<script lang="ts">
	import type { PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import supabase from '$lib/supabase';
	export let data: PageData;

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

<main>
	<h1>Bahagon2</h1>
	{#if data.session}
		<p>Welcome, {data.session.user.email}</p>

		<form action="/deconnexion" method="POST" use:enhance={submitLogout}>
			<button type="submit">Logout</button>
		</form>
	{:else}
		<div>
			<a href="/connexion">Se connecter</a>
		</div>
	{/if}
</main>
