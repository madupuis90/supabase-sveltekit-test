<script lang="ts">
	import { enhance } from '$app/forms';

	export let form: FormData;
</script>

{JSON.stringify(form)}
<main>
	<h1>Login</h1>
	<form action="?/login" method="POST" class="auth-form" use:enhance>
		<label for=""> Email </label>
		<input type="text" value="" name="email" />
		<label for=""> Password </label>
		<input type="password" value="" name="password" />
		<button type="submit" class="btn btn-primary">Login</button>
		<button type="submit" formaction="?/register" class="btn btn-primary">Register</button>
	</form>
</main>
