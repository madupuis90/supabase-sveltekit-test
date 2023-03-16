<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>


<div class="main">
	<div class="sidenav">
		<div><a href="">Batiments</a></div>
		<div><a href="">Unités</a></div>
		<div><a href="">Déplacements</a></div>
	</div>
	<div class="content">
    <div class="ressource">
      wood: 10
      stone: 20
      gold: 100
      population: 200
    </div>
    <div>
			<slot />
    </div>
	</div>
</div>

<style>
	.main {
		display: flex;
		flex-direction: row;
    height: 100%;
    background-color: lightblue; /* TODO remove */
	}
	.sidenav {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.content {
		flex: 1;
    display: flex;
    flex-direction: column;
    background-color: lightcyan; /* TODO remove */
	}

  .ressource {
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: lightblue; /* TODO remove */
  }
</style>
