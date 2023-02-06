<script lang="ts">
  import type { ActionData, PageData } from './$types';

  export let form: ActionData;
  export let data: PageData;
</script>

To start playing, you will need to set up your profile!
{#if form?.error} 
  <div>{form.error}</div>
{/if}
<form method="POST">

  <br>
  <label for="username">Username: </label>
  <input name="username" value="{form?.data?.username || data?.profile?.username || ''}">
  {#if form?.errors?.username}
  <span>{form?.errors?.username[0]}</span>
  {/if}

  <br>
  <label for="race">race: </label>
  <input name="race" value="{form?.data?.race || data?.profile?.race || ''}">
	{#if form?.errors?.race}
		<span>{form?.errors?.race[0]}</span>
	{/if}

  <br>
  <label for="alignment">alignment: </label>
  <input name="alignment" value="{form?.data?.alignment || data?.profile?.alignment || ''}">
	{#if form?.errors?.alignment}
		<span>{form?.errors?.alignment[0]}</span>
	{/if}

  <br>
  <br>
  <button type="submit">Update</button>
</form>
