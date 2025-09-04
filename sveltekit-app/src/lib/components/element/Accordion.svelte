<!-- @migration-task Error while migrating Svelte code: `<button>` cannot be a child of `<button>`. The browser will 'repair' the HTML (by moving, removing, or inserting elements) which breaks Svelte's assumptions about the structure of your components.
https://svelte.dev/e/node_invalid_placement -->
<script>
	import { text } from '@sveltejs/kit';
	import { slide } from 'svelte/transition';

	export let open = false;
	export let sticky = false;
	export let arrow = true;
	export let lineColor = '';
	export let aboutPage = false;

	const handleClick = () => (open = !open);
</script>

<div
	class="accordion py-1 border-y {lineColor} cursor-pointer"
	class:py-xs={aboutPage}
	class:border-t-0={aboutPage}
>
	<div class="w-full flex items-center" class:sticky class:top-0={sticky} on:click={handleClick}>
		<div class="flex justify-between w-full">
			<slot name="head"></slot>
		</div>
		<button
			class:button={aboutPage}
			class:theme-red-pink={aboutPage}
			class:w-3={aboutPage}
			class:aspect-square={aboutPage}
			class:text-red={aboutPage && open}
			class:bg-pink={aboutPage && open}
		>
			{#if !open}
				+
			{:else}
				-
			{/if}
		</button>
	</div>

	{#if open}
		<div class="details pt-2" transition:slide>
			<slot name="details"></slot>
		</div>
	{/if}
</div>

<style>
	.accordion:not(:first-child) {
		border-top: none;
	}
</style>
