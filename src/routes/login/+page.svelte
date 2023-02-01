<script lang="ts">
	import type { ActionData } from './$types';

	// TODO: why isn't actiondata type generate properly
	export let form: any;
</script>

<h1>Login</h1>
<form action="?/login" method="POST">
	<label for=""> Email </label>
	<input type="text" value={form?.data?.email ?? ''} name="email" />
	{#if form?.errors?.email}
		<span>{form?.errors?.email[0]}</span>
	{/if}

	<label for=""> Password </label>
	<input type="password" value="" name="password" />
	{#if form?.errors?.password}
		<span>{form?.errors?.password[0]}</span>
	{/if}

	<button type="submit">Login</button>
	<button type="submit" formaction="?/register">Register</button>
</form>
{#if form?.error}
	<span>{form?.error}</span>
{/if}
