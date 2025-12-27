<script>
	import { slide } from 'svelte/transition';

	let {
		head,
		details,
		open = false,
		sticky = false,
		arrow = true,
		lineColor = '',
		openHeight = 0
	} = $props();

	const handleClick = () => (open = !open);
</script>

<div
	class="accordion py-1 border-y {lineColor} cursor-pointer group"
	onclick={handleClick}
	onkeydown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleClick() : null)}
	role="button"
	tabindex="0"
>
	<div class="w-full flex items-center relative" class:sticky class:top-0={sticky}>
		<div class="flex justify-between w-full group-hover:opacity-30 transition-fast">
			{@render head()}
		</div>
		<button class="group-hover:opacity-30 transition-fast absolute right-0">
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
