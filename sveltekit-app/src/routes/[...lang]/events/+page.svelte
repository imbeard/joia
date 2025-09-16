<script>
	// @ts-nocheck
	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import Accordion from '$lib/components/element/Accordion.svelte';
	import GallerySection from '$lib/components/sections/GallerySection.svelte';
	import Gallery from '$lib/components/element/Gallery.svelte';
	import Image from '$lib/components/element/Image.svelte';
	import { getPageLink } from '$lib/utils';

	let { data } = $props();
	let document = $derived(data?.document?.data);
</script>

{#if document}
	<main>
		<div class="intro flex justify-center items-center small-caps text-center fade-in">
			{$LL.eventsAndCatering()}
		</div>
		<div class="px-1.5 mx-auto w-full fade-in">
			<PortableText data={document.intro} />
		</div>
		{#if document.gallery}
			<div class="md:w-1/2 ml-auto">
				<div class="pt-1.5">
					<div class="fade-in">
						<Gallery data={document.gallery} fit="cover" />
					</div>
					<h3 class="py-25 small-caps fade-in">
						{document.eventsBlock?.heading}
					</h3>
					<div class="fade-in">
						<PortableText data={document.eventsBlock?.content} />
					</div>
				</div>
			</div>
		{/if}
		{#if document?.gallerySection}
			<div class="pt-25">
				<GallerySection direction={2} section={document.gallerySection} fit="cover" />
			</div>
		{/if}
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
