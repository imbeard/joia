<script>
	// @ts-nocheck
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import GallerySection from '$lib/components/sections/GallerySection.svelte';
	import { getPageLink } from '$lib/utils';
	import SEO from '$lib/components/seo/SEO.svelte';

	let { data } = $props();
	let document = $derived(data?.document?.data);
</script>

<SEO data={document?.seo} pageTitle={document?.title || 'Soft Drinks'} locale={data?.locale} />

{#if document}
	<main>
		<div class="intro flex justify-center items-center small-caps fade-in">{document?.title}</div>
		<div class="fade-in px-1.5 mx-auto w-full md:w-1/2">
			<PortableText data={document?.description} />
		</div>
		{#if document?.sectionsHeading}
			<h3 class="fade-in pt-15 pb-10 md:py-30 small-caps text-center">
				{document?.sectionsHeading}
			</h3>
		{/if}
		<div class="flex flex-col gap-24">
			{#each document?.gallerySections ?? [] as gallerySection, i}
				<GallerySection direction={i} section={gallerySection} fit="contain" />
			{/each}
		</div>
		{#if document?.tastingNotes}
			<div class="pt-30 pb-10 px-1.5 md:pt-40">
				<div class="flex flex-col items-center justify-center text-center fade-in">
					<h3 class="small-caps">{document?.tastingNotes?.infoSection?.heading}</h3>
					<div class="max-w-lg">
						<PortableText data={document?.tastingNotes?.infoSection?.content} />
					</div>
					<a
						class="pt-2.5 flex items-center gap-0.5 small-caps hover:opacity-40 transition-opacity duration-350 ease-in-out"
						href={getPageLink(document?.tastingNotes?.cta?.url)}
						><span>{document?.tastingNotes?.cta?.label}</span><ArrowRight
							fill="var(--color-green)"
						/></a
					>
				</div>
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
