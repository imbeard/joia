<script>
	// @ts-nocheck
	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import TwoGalleriesSection from '$lib/components/sections/TwoGalleriesSection.svelte';
	import Gallery from '$lib/components/element/Gallery.svelte';
	import Image from '$lib/components/element/Image.svelte';
	import { getPageLink } from '$lib/utils';

	let { data } = $props();
	let page = $derived(data?.document?.data?.about);
	let press = $derived(data?.document?.data?.press);

	onMount(() => {
		console.log(page);
	});
</script>

{#if page}
	<main>
		<div class="fade-in intro flex justify-center items-center small-caps text-center">Joia</div>
		<div class="fade-in px-1.5 mx-auto w-full">
			<PortableText data={page?.intro} />
		</div>
		{#if page.gallery}
			<div class="pt-1.5">
				<Gallery data={page?.gallery} fit="cover" />
			</div>
		{/if}
		<div class="fade-in md:w-1/2 p-1.5"><PortableText data={page?.description} /></div>
		{#if page?.detailsSections}
			<div class="flex flex-col items-center w-full py-25">
				<div class="md:w-1/2 flex flex-col gap-6 p-1.5">
					{#each page?.detailsSections as section}
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
		{#if page?.team}
			<div class="fade-in team p-1.5 w-full hidden md:block">
				<div class="flex-col justify-between hidden md:flex">
					<h3 class="small-caps">{$LL.theChefs()}</h3>
					<div class="small-caps">
						{page?.team[0]?.heading}
					</div>
					<PortableText data={page?.team[0]?.content} />
				</div>
				{#if page?.teamGallery}
					<Gallery data={page.teamGallery} fit="cover" />
				{/if}
				<div class="flex flex-col justify-between hidden md:flex">
					<div class="small-caps flex flex-col h-full justify-center">
						{page?.team[1]?.heading}
					</div>
					<PortableText data={page?.team[1]?.content} />
				</div>
			</div>

			<div class="w-full block md:hidden">
				<Gallery data={page?.teamGallery} fit="cover" />
				<div class="p-1.5 grid-2 gap-1 pt-1.5">
					<div class="flex flex-col">
						<span class="small-caps pb-1.5">
							{page?.team[0]?.heading}
						</span>
						<PortableText data={page?.team[0]?.content} />
					</div>
					<div class="flex flex-col">
						<span class="small-caps pb-1.5">
							{page?.team[1]?.heading}
						</span>
						<PortableText data={page?.team[1]?.content} />
					</div>
				</div>
			</div>
		{/if}

		{#if page?.founder}
			<div class="fade-in pt-25 md:p-0 md:pt-25 md:grid-2">
				<div class="flex flex-col justify-between p-1.5 md:pb-0">
					<h3 class="small-caps h-full flex flex-col justify-center pb-2 md:pb-0">
						{page?.founder?.infoSection?.heading}
					</h3>
					<PortableText data={page?.founder?.infoSection?.content} />
				</div>
				<Image image={page?.founder?.image} alt={page?.founder?.image?.alt} />
			</div>
		{/if}

		{#if page?.location}
			<div class="fade-in pt-25 md:p-0 md:pt-25 md:grid-2">
				{#if page?.location?.gallery}
					<Gallery data={page?.location?.gallery} fit="cover" />
				{/if}

				<div class="flex flex-col justify-between p-1.5 md:pb-0">
					<h3 class="small-caps h-full flex flex-col justify-center pb-2 md:pb-0">Location</h3>
					<PortableText data={page?.location?.description} />
				</div>
			</div>
		{/if}

		{#if press && press.length > 0}
			<div class="flex flex-col gap-3 p-1.5 pt-25">
				<h3 class="small-caps text-center pb-25 fade-in">Press</h3>
				{#each press as item}
					<div class="press-item fade-in">
						<div
							class="small-caps flex w-full justify-between pb-3 md:pb-0 md:w-fit md:flex-col md:justify-normal"
						>
							<div>{item?.magazine}</div>
							<div>{item?.date}</div>
						</div>
						<div class="small-caps pb-3 md:pb-0">{item?.title}</div>
						<div><PortableText data={item?.description} /></div>
					</div>
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
