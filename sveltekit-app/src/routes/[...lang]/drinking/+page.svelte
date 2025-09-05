<script>
	// @ts-nocheck
	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import TwoGalleriesSection from '$lib/components/sections/TwoGalleriesSection.svelte';
	import GallerySection from '$lib/components/sections/GallerySection.svelte';
	import { getPageLink } from '$lib/utils';

	let { data } = $props();
	let document = $derived(data?.document?.data);
	$effect(() => {
		console.log(document);
	});
</script>

{#if document}
	<main>
		<div class="intro flex justify-center items-center uppercase text-center">
			<PortableText data={document.heading} />
		</div>
		<div class="px-1.5 mx-auto w-full">
			<PortableText data={document.intro} />
		</div>
		<div class="flex flex-col pt-1.5 gap-24">
			{#if document.gallerySections && document.gallerySections.length > 0}
				{#each document.gallerySections as gallerySection, i}
					<GallerySection direction={i} section={gallerySection} />
				{/each}
			{/if}
		</div>

		<div class="pt-15 pb-10 md:py-40 px-1.5 w-full md:w-1/2 mx-auto">
			<h3 class="uppercase text-center">{document.tastingNotes.infoSection.heading}</h3>
			<PortableText data={document.tastingNotes.infoSection.content} />
			<a
				href="/{getPageLink(document.tastingNotes.cta.url)}"
				class="mt-2.5 flex gap-1 items-center uppercase mx-auto w-fit"
				>{document.tastingNotes.cta.label}
				<div><ArrowRight fill="var(--color-green)" /></div>
			</a>
		</div>
	</main>
{/if}

<style>
	.intro {
		height: 80vh;
		width: 100%;
		min-height: 400px;
	}
	@media screen and (min-width: 768px) {
		.intro {
			height: 65vh;
		}
	}
</style>
