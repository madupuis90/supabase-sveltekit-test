<script lang="ts">
  import '../app.css';
  import '../reset.css';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

  // Invalidate all load functions if Auth status changes
	onMount(async () => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			invalidateAll();
		});
		return () => {
			subscription.unsubscribe();
		};
	});

  // Handle logout client side
	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

<div class="header">
	<div class="header__title">Bahagon2</div>
	{#if data.session}
		<div class="header__content">
			<span>Welcome {data.profile?.username},</span>
			<span>Visit your <a href="/royaume">Royaume</a></span>
			<span>or edit your <a href="/profil">Profil</a></span>
		</div>

		<form action="/logout" method="POST" use:enhance={submitLogout}>
			<button type="submit">Logout</button>
		</form>
	{:else}
		<div>
			<a href="/connexion">Se connecter</a>
		</div>
	{/if}
</div>

<main>
  <slot></slot>
</main>

<style>
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
    background-color: lightgray ; /* TODO remove */
	}
	.header > * {
		margin: 0 1rem;
	}
	.header__title {
		font-size: 1.6rem;
		font-weight: bold;
	}
	.header__content {
		flex: 1;
	}

  main {
    height: 100%;
  }

</style>
