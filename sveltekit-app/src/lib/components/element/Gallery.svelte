<script lang="ts">
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import { setupTweenParallax } from '$lib/utils/emblaCarouselTweenParallax';
	import Autoplay from 'embla-carousel-autoplay';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import Image from '$lib/components/element/Image.svelte';
	import Video from '$lib/components/element/Video.svelte';
	let { data, fit } = $props();
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
		showNext =
			(gallery?.[selectedIndex + 1] && !isCurrentSlideVideo && x > rect.width * 0.5) ||
			(gallery?.[selectedIndex + 1] && isCurrentSlideVideo && x > rect.width * 0.7)
				? true
				: false;
		showPrev =
			(gallery?.[selectedIndex - 1] && !isCurrentSlideVideo && x < rect.width * 0.5) ||
			(gallery?.[selectedIndex - 1] && isCurrentSlideVideo && x < rect.width * 0.3)
				? true
				: false;
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

		// Setup parallax effect
		setupTweenParallax(emblaApi);
	}

	onMount(() => {
		isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	});
</script>

{#if data}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="embla gallery-container" class:default={!showNext && !showPrev}>
		<div
			class="embla__viewport"
			use:emblaCarouselSvelte={{ options }}
			onemblaInit={initEmbla}
			onmouseenter={() => (galleryHovered = true)}
			onmouseleave={() => (galleryHovered = false)}
			onmousemove={handleGalleryMouseMove}
			onclick={navigateGallery}
		>
			<div class="embla__container flex" class:cover={fit == 'cover'}>
				{#each gallery as slide, index}
					<div class="embla__slide">
						{#if slide._type == 'elementImage'}
							<div class="embla__parallax">
								<div class="embla__parallax__layer">
									<div
										class="image-parallax embla__parallax__img {index === selectedIndex
											? 'image-blur-animate'
											: ''}"
									>
										<Image image={slide} {fit} />
									</div>
								</div>
							</div>
						{/if}
						{#if slide._type == 'elementVideo'}
							<div class="image-container video-container">
								<Video src={slide.url} alt={slide.alt} poster={slide.poster} />
								<!-- Navigation overlay zones to prevent video clicks in nav areas -->
								<div class="nav-overlay nav-overlay-left"></div>
								<div class="nav-overlay nav-overlay-right"></div>
							</div>
						{/if}
						{#if slide.caption}
							<div class="caption">{slide?.caption}</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Navigation button for desktop only -->
		{#if !isMobile && galleryHovered && gallery.length > 1}
			{#if showNext || showPrev}
				<div
					class="nav-button py-0.5 px-1 backdrop-blur-xl small-caps"
					style="left: {cursorX}px; top: {cursorY}px;"
				>
					{#if showNext}
						<div class="flex gap-1 items-center">
							<div class="text-black">Next</div>
							<div><ArrowRight fill="black" /></div>
						</div>
					{/if}
					{#if showPrev}
						<div class="flex gap-1 items-center">
							<div class="rotate-180"><ArrowRight fill="black" /></div>
							<div class="text-black">Prev</div>
						</div>
					{/if}
				</div>
			{/if}
		{/if}
	</div>
{/if}

<style lang="postcss">
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
		touch-action: pan-x pinch-zoom;
		min-height: 205px;
		width: 100%;
		&.cover {
			height: 100%;
		}
	}

	.embla__slide {
		transform: translate3d(0, 0, 0);
		flex: 0 0 auto;
		min-width: 0;
		width: 100%;
		/* overflow: hidden; */
	}

	.embla__parallax {
		height: 100%;
		overflow: hidden;
	}

	.image-parallax {
		height: 110%;
		width: 100%;
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

	:global(.embla__parallax__img) {
		max-width: none;
		width: 115%;
		height: 100%;
		object-fit: cover;
	}

	.video-container {
		position: relative;
	}

	.nav-overlay {
		position: absolute;
		top: 0;
		bottom: 0;
		z-index: 5;
		pointer-events: auto;
	}

	.nav-overlay-left {
		left: 0;
		width: 30%;
	}

	.nav-overlay-right {
		right: 0;
		width: 30%;
	}

	.nav-overlay-left {
		left: 0;
		width: 30%;
	}

	.nav-overlay-right {
		right: 0;
		width: 30%;
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
		.image-parallax {
			height: 120%;
			width: 100%;
		}

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
			overflow: hidden;
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
