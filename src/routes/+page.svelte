<script lang="ts">
	import type { PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import supabase from '$lib/supabase';
	export let data: PageData;
</script>

<main />
