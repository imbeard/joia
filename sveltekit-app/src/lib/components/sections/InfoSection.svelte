<script lang="ts">
	import PortableText from '../element/PortableText.svelte';
	let { section } = $props();
</script>

<div class="md:grid-2 w-full">
	<div>
		{#if section.heading}<h3 class="heading pb-3 typo-lg">{section.heading}</h3>{/if}
		<div class="max-w-5xl">
			<PortableText data={section.content} />
		</div>
	</div>
</div>

<style>
	.heading:not(:first-child) {
		padding-top: calc(5rem - var(--spacing-s));
	}
</style>
