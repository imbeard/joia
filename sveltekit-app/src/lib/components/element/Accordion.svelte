<!-- @migration-task Error while migrating Svelte code: `<button>` cannot be a child of `<button>`. The browser will 'repair' the HTML (by moving, removing, or inserting elements) which breaks Svelte's assumptions about the structure of your components.
https://svelte.dev/e/node_invalid_placement -->
<script>
	import { text } from '@sveltejs/kit';
	import { slide } from 'svelte/transition';

	let {
		head,
		details,
		open = false,
		sticky = false,
		arrow = true,
		lineColor = '',
		openHeight = 0,
		aboutPage = false
	} = $props();

	const handleClick = () => (open = !open);
</script>

<div
	class="accordion py-1 border-y {lineColor} cursor-pointer"
	class:py-xs={aboutPage}
	class:border-t-0={aboutPage}
>
	<div class="w-full flex items-center" class:sticky class:top-0={sticky} on:click={handleClick}>
		<div class="flex justify-between w-full">
			{@render head()}
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
		<div class="details pt-2" style="min-height: {openHeight}px" transition:slide>
			{@render details()}
		</div>
	{/if}
</div>

<style>
	.accordion:not(:first-child) {
		border-top: none;
	}
</style>
