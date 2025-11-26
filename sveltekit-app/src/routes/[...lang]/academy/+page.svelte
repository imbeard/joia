<script>
	// @ts-nocheck
	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import Accordion from '$lib/components/element/Accordion.svelte';
	import TwoGalleriesSection from '$lib/components/sections/TwoGalleriesSection.svelte';
	import Gallery from '$lib/components/element/Gallery.svelte';
	import Image from '$lib/components/element/Image.svelte';
	import SEO from '$lib/components/seo/SEO.svelte';
	import { getPageLink } from '$lib/utils';

	let { data } = $props();
	let document = $derived(data?.document?.data);
	let viewportHeight = $state(0);
	let viewportWidth = $state(0);
	let detailsHeight = $state(0);
	let courseDescriptionHeight = $state(Array(document?.courses?.length || 0).fill(0));
</script>

<svelte:window bind:innerHeight={viewportHeight} bind:innerWidth={viewportWidth} />

<SEO data={document?.seo} pageTitle="Academy" />

{#if document}
	<main>
		<div class="intro flex justify-center items-center small-caps text-center fade-in">
			Joia Academy
		</div>
		<div class="px-1.5 mx-auto w-full fade-in">
			<PortableText data={document.intro} />
		</div>
		{#if document.gallery}
			<div class="pt-1.5">
				<Gallery data={document.gallery} />
			</div>
		{/if}

		<div class="md:grid-2 gap-1.5">
			{#if document?.details?.infoSection}
				<div
					class="pt-1.5 pl-1.5 fade-in flex flex-col justify-between"
					style="height: {viewportHeight - 10}px"
				>
					<div bind:clientHeight={detailsHeight}>
						<div class="small-caps pb-1.5">
							{document?.details?.infoSection?.heading}
						</div>
						<div class="pb-2">
							<PortableText data={document?.details?.infoSection?.content} />
						</div>
					</div>
					<a
						class="sticky bottom-2 small-caps items-center gap-1 hidden md:flex"
						style="padding-top: 200px"
						href="mailto:{document?.details?.cta}"
						target="_blank"
					>
						<span>{$LL.contactUsToKnowMore()}</span>
						<ArrowRight fill="var(--color-green)" />
					</a>
				</div>
			{/if}
			{#if document?.courses && document?.courses?.length > 0}
				<div class="p-1.5 pt-25 md:pt-1.5 md:pl-0 fade-in">
					{#each document?.courses as course, index}
						<Accordion>
							{#snippet head()}
								<div class="enrolling small-caps flex items-center gap-1">
									<span class="head">{course?.title}</span>
									{#if course?.enrollmentOpen == 'yes'}
										<span
											class="bg-green text-white px-[3px] font-sans rounded-[2px] whitespace-nowrap mr-1"
											>{$LL.enrolling()}</span
										>
									{/if}
								</div>
							{/snippet}
							{#snippet details()}
								<div class="flex flex-col">
									<div
										class="course-description"
										bind:clientHeight={courseDescriptionHeight[index]}
									>
										<PortableText data={course?.description} />
									</div>
									{#if course?.contact}
										<!-- OLD VERSION WITH BIG SPACING -->
										<!-- <a
											href="mailto:{course?.contact}"
											class="small-caps flex items-center gap-1"
											style="padding-block: {viewportWidth > 768
												? viewportHeight / 2 - 150
												: viewportHeight / 5}px"
										>
											<span>{$LL.contactUs()}</span>
											<ArrowRight fill="var(--color-green)" />
										</a> -->

										<a
											href="mailto:{course?.contact}"
											class="small-caps flex items-center gap-1 py-5"
										>
											<span>{$LL.contactUs()}</span>
											<ArrowRight fill="var(--color-green)" />
										</a>
									{/if}
								</div>
							{/snippet}
						</Accordion>
					{/each}
				</div>
			{/if}
			<a
				class="small-caps flex items-center gap-1 block md:hidden px-1.5"
				href="mailto:{document?.details?.cta}"
				target="_blank"
			>
				<span>{$LL.contactUs()}</span>
				<ArrowRight fill="var(--color-green)" />
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
	.enrolling {
		text-box-edge: cap alphabetic;
	}
	.enrolling span:not(.head) {
		text-box-trim: trim-start;
	}
</style>
