<script lang="ts">
	// @ts-nocheck
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import Image from '$lib/components/element/Image.svelte';
	import Video from '$lib/components/element/Video.svelte';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	let { data } = $props();
	let gallery = $derived(data?.items);

	let emblaApi;
	let isMobile = $state(false);

	let options = {
		loop: true,
		align: 'start'
	};
	let delay = 6000;
	let selectedIndex = $state(0);

	// Cursor navigation state
	let galleryHovered = $state(false);
	let cursorX = $state(0);
	let cursorY = $state(0);
	let showNext = $state(true);
	let showPrev = $state(true);

	let currentSlide = $derived(gallery?.[selectedIndex]);
	let isCurrentSlideVideo = $derived(currentSlide?._type == 'elementVideo');

	// Handle mouse movement for first gallery
	function handleGalleryMouseMove(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		cursorX = x;
		cursorY = y;
		showNext = !isCurrentSlideVideo ? x > rect.width * 0.5 : x > rect.width * 0.7;
		showPrev = !isCurrentSlideVideo ? x < rect.width * 0.5 : x < rect.width * 0.3;
	}

	// Navigation functions
	function navigateGallery() {
		if (!emblaApi) return;

		if (showNext) {
			emblaApi.scrollNext();
		}
		if (showPrev) {
			emblaApi.scrollPrev();
		}
	}

	function initEmbla(embla) {
		emblaApi = embla.detail;
		emblaApi.on('select', () => {
			selectedIndex = emblaApi.selectedScrollSnap();
		});
	}

	onMount(() => {
		isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	});
</script>

{#if data}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="embla gallery-container"
		use:emblaCarouselSvelte={{ options }}
		onemblaInit={initEmbla}
		onmouseenter={() => (galleryHovered = true)}
		onmouseleave={() => (galleryHovered = false)}
		onmousemove={handleGalleryMouseMove}
		onclick={navigateGallery}
	>
		<div class="embla__container flex">
			{#each gallery as slide, index}
				<div class="embla__slide">
					{#if slide._type == 'elementImage'}
						<div class="image-container">
							<Image image={slide} />
						</div>
					{/if}
					{#if slide._type == 'elementVideo'}
						<div class="image-container video-container">
							<Video src={slide.url} alt={slide.alt} poster={slide.poster} />
						</div>
					{/if}
					{#if slide.caption}
						<div class="caption">{slide?.caption}</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Navigation button for desktop only -->
		{#if !isMobile && galleryHovered && gallery.length > 1}
			{#if showNext || showPrev}
				<div
					class="nav-button py-0.5 px-1 backdrop-blur-xl uppercase"
					style="left: {cursorX}px; top: {cursorY}px;"
				>
					{#if showNext}
						<div class="flex gap-1 items-center">
							<div>Next</div>
							<div><ArrowRight fill="black" /></div>
						</div>
					{/if}
					{#if showPrev}
						<div class="flex gap-1 items-center">
							<div class="rotate-180"><ArrowRight fill="black" /></div>
							<div>Prev</div>
						</div>
					{/if}
				</div>
			{/if}
		{/if}
	</div>
{/if}

<style>
	.embla {
		overflow: hidden;
		width: 100%;
	}

	.embla__container {
		display: flex;
		touch-action: pan-x pinch-zoom;
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

	.video-container {
		position: relative;
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
		.gallery-container {
			position: relative;
			cursor: pointer;
			width: 100%;
		}
		.embla__container {
			min-height: 370px;
			width: 100%;
			aspect-ratio: auto;
		}

		.embla__slide {
			transform: translate3d(0, 0, 0);
			aspect-ratio: auto;
			flex: 0 0 auto;
			min-width: 0;
			width: 100%;
			min-height: 370px;
			height: 100%;
		}
	}

	@media (hover: hover) {
		.gallery-container:hover .nav-button {
			opacity: 1;
		}
	}

	/* Hide navigation buttons on mobile */
	@media (max-width: 767px) {
		.nav-button {
			display: none;
		}

		.gallery-container {
			cursor: default;
		}

		/* Allow swiping on videos on mobile */
		.video-container {
			pointer-events: none;
		}
	}
</style>
