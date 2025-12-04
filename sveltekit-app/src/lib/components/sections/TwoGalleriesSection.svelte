<script lang="ts">
	// @ts-nocheck
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import { setupTweenParallax } from '$lib/utils/emblaCarouselTweenParallax.ts';
	import { onMount } from 'svelte';

	import Image from '$lib/components/element/Image.svelte';
	import Video from '$lib/components/element/Video.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import { fade } from 'svelte/transition';

	let { section, fit } = $props();
	let firstGallery = $derived(section?.firstGallery);
	let secondGallery = $derived(section?.secondGallery);

	// Embla API references for each gallery
	let firstEmblaApi;
	let secondEmblaApi;

	let options = { loop: true, align: 'start' };
	let delay = 6000;

	// Current slide tracking
	let firstSelectedIndex = $state(0);
	let secondSelectedIndex = $state(0);

	// Cursor navigation state
	let firstGalleryHovered = $state(false);
	let secondGalleryHovered = $state(false);
	let firstCursorX = $state(0);
	let secondCursorX = $state(0);
	let firstCursorY = $state(0);
	let secondCursorY = $state(0);
	let firstShowNext = $state(true);
	let firstShowPrev = $state(true);
	let secondShowNext = $state(true);
	let secondShowPrev = $state(true);
	let isFirstCurrentSlideVideo = $derived(
		firstGallery?.[firstSelectedIndex]._type === 'elementVideo'
	);
	let isSecondCurrentSlideVideo = $derived(
		secondGallery?.[secondSelectedIndex]._type === 'elementVideo'
	);

	// Handle mouse movement for first gallery
	function handleFirstGalleryMouseMove(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		firstCursorX = x;
		firstCursorY = y;
		firstShowNext =
			(firstGallery?.[firstSelectedIndex + 1] &&
				!isFirstCurrentSlideVideo &&
				x > rect.width * 0.5) ||
			(firstGallery?.[firstSelectedIndex + 1] && isFirstCurrentSlideVideo && x > rect.width * 0.7)
				? true
				: false;
		firstShowPrev =
			(firstGallery?.[firstSelectedIndex - 1] &&
				!isFirstCurrentSlideVideo &&
				x < rect.width * 0.5) ||
			(firstGallery?.[firstSelectedIndex - 1] && isFirstCurrentSlideVideo && x < rect.width * 0.3)
				? true
				: false;
	}

	// Handle mouse movement for second gallery
	function handleSecondGalleryMouseMove(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		secondCursorX = x;
		secondCursorY = y;
		secondShowNext =
			(secondGallery?.[secondSelectedIndex + 1] &&
				!isSecondCurrentSlideVideo &&
				x > rect.width * 0.5) ||
			(secondGallery?.[secondSelectedIndex + 1] &&
				isSecondCurrentSlideVideo &&
				x > rect.width * 0.7)
				? true
				: false;
		secondShowPrev =
			(secondGallery?.[secondSelectedIndex - 1] &&
				!isSecondCurrentSlideVideo &&
				x < rect.width * 0.5) ||
			(secondGallery?.[secondSelectedIndex - 1] &&
				isSecondCurrentSlideVideo &&
				x < rect.width * 0.3)
				? true
				: false;
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
		firstEmblaApi.on('select', () => {
			firstSelectedIndex = firstEmblaApi.selectedScrollSnap();
		});

		// Setup parallax effect
		const removeTweenParallax = setupTweenParallax(firstEmblaApi);
		firstEmblaApi.on('destroy', removeTweenParallax);
	}

	function initSecondEmbla(embla) {
		secondEmblaApi = embla.detail;
		secondEmblaApi.on('select', () => {
			secondSelectedIndex = secondEmblaApi.selectedScrollSnap();
		});

		// Setup parallax effect
		const removeTweenParallax = setupTweenParallax(secondEmblaApi);
		secondEmblaApi.on('destroy', removeTweenParallax);
	}
</script>

{#if section}
	<div class="block md:grid md:grid-cols-2 w-full h-full">
		<!-- First Gallery -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="embla gallery-container" class:default={!firstShowNext && !firstShowPrev}>
			<div
				class="embla__viewport"
				use:emblaCarouselSvelte={{ options }}
				onemblaInit={initFirstEmbla}
				onmouseenter={() => (firstGalleryHovered = true)}
				onmouseleave={() => (firstGalleryHovered = false)}
				onmousemove={handleFirstGalleryMouseMove}
				onclick={navigateFirstGallery}
			>
				<div class="embla__container flex" class:cover={fit == 'cover'}>
					{#each firstGallery as slide, index}
						<div class="embla__slide">
							{#if slide._type == 'elementImage'}
								<div class="embla__parallax">
									<div class="embla__parallax__layer">
										<div
											class="image-parallax embla__parallax__img {index === firstSelectedIndex
												? 'image-blur-animate'
												: ''}"
										>
											<Image image={slide} {fit} />
										</div>
									</div>
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
			</div>

			<!-- Navigation button for first gallery -->
			{#if firstGalleryHovered}
				<div class="absolute" style="left: {firstCursorX}px; top: {firstCursorY}px;">
					{#if firstShowNext}
						<div class="flex gap-1 items-center nav-button py-0.5 px-1 backdrop-blur-xl small-caps">
							<div class="text-[rgba(0,0,0,1)]">Next</div>
							<div><ArrowRight fill="rgba(0,0,0,1)" /></div>
						</div>
					{/if}
					{#if firstShowPrev}
						<div class="flex gap-1 items-center nav-button py-0.5 px-1 backdrop-blur-xl small-caps">
							<div class="rotate-180"><ArrowRight fill="rgba(0,0,0,1)" /></div>
							<div class="text-[rgba(0,0,0,1)]">Prev</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Second Gallery -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="embla gallery-container" class:default={!secondShowNext && !secondShowPrev}>
			<div
				class="embla__viewport"
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
								<div class="embla__parallax">
									<div class="embla__parallax__layer">
										<div
											class="image-parallax embla__parallax__img {index === secondSelectedIndex
												? 'image-blur-animate'
												: ''}"
										>
											<Image image={slide} fit="contain" />
										</div>
									</div>
								</div>
							{/if}
							{#if slide.caption}
								<div class="caption">{slide?.caption}</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<!-- Navigation button for second gallery -->
			{#if secondGalleryHovered}
				<div class="absolute" style="left: {secondCursorX}px; top: {secondCursorY}px;">
					{#if secondShowNext}
						<div class="flex gap-1 items-center nav-button py-0.5 px-1 backdrop-blur-xl small-caps">
							<div>Next</div>
							<div><ArrowRight fill="black" /></div>
						</div>
					{/if}
					{#if secondShowPrev}
						<div class="flex gap-1 items-center nav-button py-0.5 px-1 backdrop-blur-xl small-caps">
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

	.embla__viewport {
		overflow: hidden;
		height: 100%;
	}

	.embla__container {
		display: flex;
		touch-action: pan-y pinch-zoom;
		min-height: 205px;
		aspect-ratio: 4/5;
		width: 100%;
		&.cover {
			height: 100%;
		}
	}

	.embla__slide {
		transform: translate3d(0, 0, 0);
		flex: 0 0 auto;
		min-width: 0;
		aspect-ratio: 4/5;
		width: 100%;
		overflow: hidden;
	}

	.embla__parallax {
		height: 100%;
		overflow: hidden;
	}

	.embla__parallax__layer {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.image-container {
		height: 100%;
		overflow: hidden;
	}

	.image-parallax {
		height: 110%;
		width: 100%;
	}

	:global(.embla__parallax__img) {
		max-width: none;
		width: 115%;
		height: 100%;
		object-fit: cover;
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
			overflow: hidden;
		}

		.image-parallax {
			height: 120%;
			width: 100%;
		}

		:global(.embla__parallax__img) {
			width: 120%;
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
