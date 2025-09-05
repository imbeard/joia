<script lang="ts">
	// @ts-nocheck
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import { onMount } from 'svelte';

	import Image from '$lib/components/element/Image.svelte';
	import Video from '$lib/components/element/Video.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import { fade } from 'svelte/transition';

	let { section } = $props();
	let firstGallery = $derived(section?.firstGallery);
	let secondGallery = $derived(section?.secondGallery);

	// Embla API references for each gallery
	let firstEmblaApi;
	let secondEmblaApi;

	let options = { loop: true, align: 'start' };
	let delay = 6000;

	// Cursor navigation state
	let firstGalleryHovered = $state(false);
	let secondGalleryHovered = $state(false);
	let firstCursorX = $state(0);
	let secondCursorX = $state(0);
	let firstCursorY = $state(0);
	let secondCursorY = $state(0);
	let firstShowNext = $state(true);
	let secondShowNext = $state(true);

	// Handle mouse movement for first gallery
	function handleFirstGalleryMouseMove(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		firstCursorX = x;
		firstCursorY = y;
		firstShowNext = x > rect.width * 0.5;
	}

	// Handle mouse movement for second gallery
	function handleSecondGalleryMouseMove(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		secondCursorX = x;
		secondCursorY = y;
		secondShowNext = x > rect.width * 0.5;
	}

	// Navigation functions
	function navigateFirstGallery() {
		if (!firstEmblaApi) return;

		if (firstShowNext) {
			firstEmblaApi.scrollNext();
		} else {
			firstEmblaApi.scrollPrev();
		}
	}

	function navigateSecondGallery() {
		if (!secondEmblaApi) return;

		if (secondShowNext) {
			secondEmblaApi.scrollNext();
		} else {
			secondEmblaApi.scrollPrev();
		}
	}

	// Initialize embla APIs
	function initFirstEmbla(embla) {
		firstEmblaApi = embla.detail;
	}

	function initSecondEmbla(embla) {
		secondEmblaApi = embla.detail;
	}
</script>

{#if section}
	<div class="block md:grid md:grid-cols-2 w-full h-full">
		<!-- First Gallery -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="embla gallery-container"
			use:emblaCarouselSvelte={{ options }}
			onemblaInit={initFirstEmbla}
			onmouseenter={() => (firstGalleryHovered = true)}
			onmouseleave={() => (firstGalleryHovered = false)}
			onmousemove={handleFirstGalleryMouseMove}
			onclick={navigateFirstGallery}
		>
			<div class="embla__container flex">
				{#each firstGallery as slide, index}
					<div class="embla__slide">
						{#if slide._type == 'elementImage'}
							<div class="image-container">
								<Image image={slide} fit="cover" />
							</div>
						{/if}
						{#if slide._type == 'elementVideo'}
							<div class="image-container">
								<Video src={slide.url} alt={slide.alt} poster={slide.poster} />
							</div>
						{/if}
						{#if slide.caption}
							<div class="caption">{slide?.caption}</div>
						{/if}
					</div>
				{/each}
			</div>

			<!-- Navigation button for first gallery -->
			{#if firstGalleryHovered}
				<div
					class="nav-button py-0.5 px-1 backdrop-blur-xl uppercase"
					style="left: {firstCursorX}px; top: {firstCursorY}px;"
				>
					{#if firstShowNext}
						<div class="flex gap-1 items-center">
							<div>Next</div>
							<div><ArrowRight fill="black" /></div>
						</div>
					{:else}
						<div class="flex gap-1 items-center">
							<div class="rotate-180"><ArrowRight fill="black" /></div>
							<div>Prev</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Second Gallery -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="embla gallery-container"
			use:emblaCarouselSvelte={{ options }}
			onemblaInit={initSecondEmbla}
			onmouseenter={() => (secondGalleryHovered = true)}
			onmouseleave={() => (secondGalleryHovered = false)}
			onmousemove={handleSecondGalleryMouseMove}
			onclick={navigateSecondGallery}
		>
			<div class="embla__container flex">
				{#each secondGallery as slide, index}
					<div class="embla__slide">
						{#if slide._type == 'elementImage'}
							<div class="image-container">
								<Image image={slide} fit="cover" />
							</div>
						{/if}
						{#if slide.caption}
							<div class="caption">{slide?.caption}</div>
						{/if}
					</div>
				{/each}
			</div>

			<!-- Navigation button for second gallery -->
			{#if secondGalleryHovered}
				<div
					class="nav-button py-0.5 px-1 backdrop-blur-xl uppercase"
					style="left: {secondCursorX}px; top: {secondCursorY}px;"
				>
					{#if secondShowNext}
						<div class="flex gap-1 items-center">
							<div>Next</div>
							<div><ArrowRight fill="black" /></div>
						</div>
					{:else}
						<div class="flex gap-1 items-center">
							<div class="rotate-180"><ArrowRight fill="black" /></div>
							<div>Prev</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.gallery-container {
		position: relative;
		cursor: pointer;
	}

	.embla {
		overflow: hidden;
		width: 100%;
	}

	.embla__container {
		display: flex;
		touch-action: pan-y pinch-zoom;
		min-height: 205px;
		aspect-ratio: 4/5;
		width: 100%;
	}

	.embla__slide {
		transform: translate3d(0, 0, 0);
		flex: 0 0 auto;
		min-width: 0;
		aspect-ratio: 4/5;
		width: 100%;
	}

	.image-container {
		height: 100%;
	}

	.caption {
		height: 100%;
	}

	.nav-button {
		position: absolute;
		pointer-events: none;
		transform: translate(-50%, -50%);
		background-color: rgba(255, 255, 255, 0.2);
		color: black;
		z-index: 10;
		white-space: nowrap;
		user-select: none;
		transition: opacity 0.2s ease;
	}

	@media (min-width: 768px) {
		.embla__container {
			min-height: 370px;
			height: 100svh;
			aspect-ratio: auto;
		}

		.embla__slide {
			transform: translate3d(0, 0, 0);
			aspect-ratio: auto;
			flex: 0 0 auto;
			min-width: 0;
			width: 50vw;
			min-height: 370px;
			height: 100svh;
		}
	}

	@media (hover: hover) {
		.gallery-container:hover .nav-button {
			opacity: 1;
		}
	}

	/* Hide buttons on touch devices */
	@media (hover: none) {
		.nav-button {
			display: none;
		}
	}
</style>
