<script lang="ts">
	import { getImageDimensions } from '@sanity/asset-utils';
	import { urlFor } from '$lib/sanity/image';

	interface Props {
		image: any;
		fit?: string;
		alt?: string;
		lazy?: boolean;
		preload?: boolean;
		height?: string;
	}

	let {
		image,
		fit = 'cover',
		alt = 'Image',
		lazy = false,
		preload = false,
		height = 'auto'
	}: Props = $props();

	let innerWidth = $state(1280);

	let src = $derived(innerWidth < 768 && image.mobileImage ? image.mobileImage.asset : image.asset);
	let dimensions = $derived(getImageDimensions(src));
	let aspectRatio = $derived(dimensions.width / dimensions.height);
	let imageUrl = $derived(urlFor(src).width(dimensions.width).url() + '&auto=format');
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	{#if preload}
		<link rel="preload" as="image" href={imageUrl} />
	{/if}
</svelte:head>

<img
	class="max-h-full max-w-full w-full
	{fit === 'contain' ? 'object-contain' : 'object-cover h-full w-full'}
	{height === 'full' ? 'h-full' : 'h-auto'}"
	
	loading={lazy ? 'lazy' : 'eager'}
	fetchpriority={lazy ? 'low' : 'high'}
	data-sizes="auto"
	width={dimensions.width}
	height={dimensions.height}
	style="aspect-ratio: {aspectRatio}"
	alt={src.alt || alt}
	src={imageUrl}
/>
