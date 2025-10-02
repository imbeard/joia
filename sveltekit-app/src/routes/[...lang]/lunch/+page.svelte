<script>
	// @ts-nocheck

	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import TwoGalleriesSection from '$lib/components/sections/TwoGalleriesSection.svelte';
	import SEO from '$lib/components/seo/SEO.svelte';

	let { data } = $props();
	let document = $derived(data?.document?.data);
</script>

<SEO data={document?.seo} pageTitle={$LL.lunchOffer()} />

{#if document}
	<main>
		<div class="fade-in intro flex justify-center items-center small-caps">{$LL.lunchOffer()}</div>
		<div class="px-1.5 mx-auto w-full md:w-1/2">
			<div class="fade-in"><PortableText data={document.description} /></div>
			<div class="pt-15 pb-10 md:py-30 flex flex-col gap-6">
				{#each document.choices as choice}
					<div class="fade-in flex flex-col gap-6">
						<div class="text-center small-caps">
							<h3>{choice.title}</h3>
							<h3>{choice.price}</h3>
						</div>
						<PortableText data={choice.description} />
					</div>
				{/each}
				<div class="text-center typo-s"><PortableText data={document.notes} /></div>
			</div>
		</div>
		<TwoGalleriesSection section={document.twoGalleries} />
		<div class="fade-in pb-10 md:py-40 px-1.5 w-full flex flex-col items-center">
			<h3 class="small-caps text-center">{document.tastingNotes?.infoSection?.heading}</h3>
			<div class="text-center max-w-2xl">
				<PortableText data={document.tastingNotes?.infoSection?.content} />
			</div>
			<a href="/menu" class="mt-2.5 flex gap-1 items-center small-caps mx-auto w-fit"
				>{$LL.ourMenus()}
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
