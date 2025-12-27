<script>
	// @ts-nocheck
	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import TwoGalleriesSection from '$lib/components/sections/TwoGalleriesSection.svelte';
	import Gallery from '$lib/components/element/Gallery.svelte';
	import Image from '$lib/components/element/Image.svelte';
	import SEO from '$lib/components/seo/SEO.svelte';
	import { formatDate } from '$lib/utils';

	let { data } = $props();
	let about = $derived(data?.document?.data?.about);
	let press = $derived(data?.document?.data?.press);

	let viewportHeight = $state(0);
	let teamHeight = $state(0);
	let teamHeight2 = $state(0);
	let gallery = $state();
	let galleryHeight = $state(0);

	// Make gallery height reactive to resize
	let galleryClientHeight = $state(0);

	let differenceHeight = $derived(Math.abs(galleryClientHeight - teamHeight));
	let differenceHeight2 = $derived(Math.abs(galleryClientHeight - teamHeight2));

	onMount(() => {
		const hash = page.url.hash;
		if (hash === '#chefs') {
			setTimeout(() => {
				// Try mobile version first, fallback to desktop
				const element = document.querySelector('#chefs-mobile') || document.querySelector('#chefs');
				if (element) {
					const top = element.getBoundingClientRect().top + window.scrollY;
					window.scrollTo({ top, behavior: 'instant' });
				}
			}, 100);
		}
	});

	$effect(() => {
		if (gallery) {
			const resizeObserver = new ResizeObserver((entries) => {
				for (let entry of entries) {
					galleryClientHeight = entry.contentRect.height;
				}
			});

			resizeObserver.observe(gallery);

			// Initial measurement
			galleryClientHeight = gallery.clientHeight;

			return () => {
				resizeObserver.disconnect();
			};
		}
	});
</script>

<svelte:window bind:innerHeight={viewportHeight} />

<SEO data={about?.seo} pageTitle="About" locale={data?.locale} />

{#if about}
	<main>
		<div class="fade-in intro flex justify-center items-center small-caps text-center">Joia</div>
		<div class="fade-in px-1.5 mx-auto w-full">
			<PortableText data={about?.intro} />
		</div>
		{#if about.gallery}
			<div class="pt-1.5">
				<TwoGalleriesSection section={about?.twoGalleries} fit="contain" />
			</div>
		{/if}
		<div class="fade-in md:w-1/2 p-1.5"><PortableText data={about?.description} /></div>
		{#if about?.detailsSections}
			<div class="flex flex-col items-center w-full py-25">
				<div class="md:w-1/2 flex flex-col gap-6 p-1.5">
					{#each about?.detailsSections as section}
						<div class="fade-in">
							<div class="small-caps text-center pb-6">
								{section.heading}
							</div>
							<PortableText data={section.content} />
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if about?.team}
			<div id="chefs" class="fade-in team p-1.5 w-full hidden lg:block">
				<div class="flex-col hidden lg:flex">
					<h3 class="small-caps" style="padding-bottom: {differenceHeight / 2 - 30}px">
						{$LL.theChefs()}
					</h3>
					<div class="sticky bottom-0 pt-3">
						<div class="small-caps" style="padding-bottom: {differenceHeight / 2 - 30}px">
							{about?.team[0]?.heading}
						</div>
						<div class="sticky bottom-2 pt-3" bind:clientHeight={teamHeight}>
							<PortableText data={about?.team[0]?.content} />
						</div>
					</div>
				</div>

				{#if about?.teamGallery}
					<div class="hidden lg:block h-fit" bind:this={gallery}>
						<Gallery data={about.teamGallery} fit="contain" />
					</div>
				{/if}

				<div class="flex-col hidden lg:flex">
					<h3 class="small-caps opacity-0" style="padding-bottom: {differenceHeight / 2 - 30}px">
						{$LL.theChefs()}
					</h3>
					<div class="sticky bottom-0 pt-3">
						<div class="small-caps" style="padding-bottom: {differenceHeight2 / 2 - 30}px">
							{about?.team[1]?.heading}
						</div>
						<div class="sticky bottom-2 pt-3" bind:clientHeight={teamHeight2}>
							<PortableText data={about?.team[1]?.content} />
						</div>
					</div>
				</div>
			</div>

			<div id="chefs-mobile" class="w-full block lg:hidden">
				<Gallery data={about?.teamGallery} fit="contain" />
				<div class="p-1.5 grid-2 gap-1 pt-1.5">
					<div class="flex flex-col">
						<span class="small-caps pb-1.5">
							{about?.team[0]?.heading}
						</span>
						<PortableText data={about?.team[0]?.content} />
					</div>
					<div class="flex flex-col">
						<span class="small-caps pb-1.5">
							{about?.team[1]?.heading}
						</span>
						<PortableText data={about?.team[1]?.content} />
					</div>
				</div>
			</div>
		{/if}

		{#if about?.founder}
			<div class="pt-25 md:p-0 md:pt-25 md:grid-2">
				<div class="fade-in flex flex-col justify-between p-1.5 md:pb-0 md:items-end">
					<h3 class="small-caps h-full flex flex-col justify-center pb-2 md:pb-0 md:w-1/2">
						{about?.founder?.infoSection?.heading}
					</h3>
					<div class="md:w-1/2"><PortableText data={about?.founder?.infoSection?.content} /></div>
				</div>
				<div class="fade-in overflow-hidden hidden md:block">
					<Image image={about?.founder?.image} alt={about?.founder?.image?.alt} />
				</div>
			</div>
		{/if}

		{#if about?.location}
			<div class="fade-in pt-25 md:p-0 md:pt-25 md:grid-2">
				{#if about?.location?.gallery}
					<Gallery data={about?.location?.gallery} fit="contain" />
				{/if}

				<div class="flex flex-col justify-between p-1.5 md:pb-0">
					<h3 class="small-caps h-full flex flex-col justify-center pb-2 md:pb-0">Location</h3>
					<PortableText data={about?.location?.description} />
				</div>
			</div>
		{/if}

		{#if press && press.length > 0}
			<div class="flex flex-col gap-3 p-1.5 pt-25">
				<h3 class="small-caps text-center pb-25 fade-in">Press</h3>
				{#each press as item}
					<a class="press-item fade-in group" href={item?.link} target="_blank">
						<div
							class="small-caps flex w-full justify-between pb-3 md:pb-0 md:w-fit md:flex-col md:justify-normal group-hover:opacity-30 transition-fast"
						>
							<div>{item?.magazine}</div>
							{#if item?.releaseDate}
								<div>{formatDate(item?.releaseDate)}</div>
							{:else if item?.date}
								<div>{item?.date}</div>
							{:else}
								<div></div>
							{/if}
						</div>
						<div class="small-caps pb-3 md:pb-0 group-hover:opacity-30 transition-fast">
							{item?.title}
						</div>
						<div class="group-hover:opacity-30 transition-fast">
							<PortableText data={item?.description} />
						</div>
					</a>
				{/each}
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

		.team {
			display: grid;
			grid-template-columns: 1fr 2fr 1fr;
			grid-gap: 1rem;
		}

		.press-item {
			display: grid;
			grid-template-columns: 2fr 4fr 6fr;
			grid-gap: 1rem;
		}
	}
</style>
