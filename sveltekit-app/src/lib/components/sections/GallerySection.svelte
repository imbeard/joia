<script lang="ts">
	// @ts-nocheck
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import Image from '$lib/components/element/Image.svelte';
	import { getPageLink } from '$lib/utils';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	let { section, direction } = $props();
	let gallery = $derived(section?.gallery?.items);

	let emblaApi;

	let options = { loop: true, align: 'start' };
	let delay = 6000;
	let selectedIndex = 0;

	// Cursor navigation state
	let galleryHovered = $state(false);
	let cursorX = $state(0);
	let cursorY = $state(0);
	let showNext = $state(true);

	// Handle mouse movement for first gallery
	function handleGalleryMouseMove(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		cursorX = x;
		cursorY = y;
		showNext = x > rect.width * 0.5;
	}

	// Navigation functions
	function navigateGallery() {
		if (!emblaApi) return;

		if (showNext) {
			emblaApi.scrollNext();
		} else {
			emblaApi.scrollPrev();
		}
	}

	function initEmbla(embla) {
		emblaApi = embla.detail;
	}

	$effect(() => {
		console.log(section);
	});
</script>

{#if section}
	<div class="md:grid-2 gap-2 md:h-screen w-full" dir={direction % 2 === 0 ? 'ltr' : 'rtl'}>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="embla gallery-container"
			dir="ltr"
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
						{#if slide.caption}
							<div class="caption">{slide?.caption}</div>
						{/if}
					</div>
				{/each}
			</div>

			<!-- Navigation button for first gallery -->
			{#if galleryHovered && gallery.length > 1}
				<div
					class="nav-button py-0.5 px-1 backdrop-blur-xl uppercase"
					style="left: {cursorX}px; top: {cursorY}px;"
				>
					{#if showNext}
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

		<div
			class="h-full flex flex-col justify-between p-1.5 md:p-0"
			class:pl-2={direction % 2 === 1}
			dir="ltr"
		>
			<div class="flex items-center h-full uppercase">
				<h3>{section.title}</h3>
			</div>
			<div>{section.description}</div>
			<a
				class="mt-2.5 uppercase w-fit flex gap-1 items-center"
				href="/{getPageLink(section.cta.url)}"
			>
				<div>{section.cta.label}</div>
				<ArrowRight fill="green" />
			</a>
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
		.gallery-container {
			position: relative;
			cursor: pointer;
			height: 100svh;
		}
		.embla__container {
			min-height: 370px;
			height: 100%;
			width: 50vw;
			aspect-ratio: auto;
		}

		.embla__slide {
			transform: translate3d(0, 0, 0);
			aspect-ratio: auto;
			flex: 0 0 auto;
			min-width: 0;
			width: 50vw;
			min-height: 370px;
			height: 100%;
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
