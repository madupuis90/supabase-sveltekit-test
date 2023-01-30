<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';

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
</script>

<main>
	<slot />
</main>
