<script>
	import '../assets/css/main.css';
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import { page } from '$app/state';
	import LiveMode from '$lib/components/LiveMode.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeadHrefLangs from '$lib/components/HeaderHrefLangs.svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let { data, children } = $props();
	setLocale(data.locale);

	let settings = $derived(data?.settings?.data);
	let name = $derived(settings?.companyName);
	let season = $derived(settings?.season);

	let pluginsInitialized = $state(false);

	// Initialize GSAP plugins once
	onMount(() => {
		if (!pluginsInitialized) {
			gsap.registerPlugin(ScrollTrigger);

			// Disable browser scroll restoration
			if ('scrollRestoration' in history) {
				history.scrollRestoration = 'manual';
			}

			pluginsInitialized = true;
		}
	});

	$effect(() => {
		// Access page.url to make this reactive to route changes
		const currentUrl = page.url.pathname;

		// Ensure GSAP is initialized before proceeding
		if (!pluginsInitialized) return;

		// Scroll to top on route changes
		window.scrollTo(0, 0);
		setTimeout(() => window.scrollTo(0, 0), 0);

		// Initialize animations
		setTimeout(() => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

			requestAnimationFrame(() => {
				// Initialize fade-in animations
				gsap.set('.fade-in', { opacity: 0 });
				ScrollTrigger.batch('.fade-in', {
					onEnter: (elements) => {
						gsap.to(elements, {
							opacity: 1,
							stagger: 0.2
						});
					},
					start: 'top 80%'
				});

				// Initialize image blur animations
				gsap.set('.image-blur-animate', { filter: 'blur(20px)' });
				ScrollTrigger.batch('.image-blur-animate', {
					onEnter: (elements) => {
						gsap.to(elements, {
							filter: 'blur(0px)',
							duration: 1.2,
							ease: 'power3.out',
							stagger: 0.15
						});
					},
					start: 'top 85%'
				});

				// Initialize parallax effects for image containers
				gsap.utils.toArray('.image-parallax').forEach((element) => {
					gsap.fromTo(
						element,
						{ yPercent: -10 },
						{
							yPercent: 10,
							ease: 'none',
							scrollTrigger: {
								trigger: element.closest('.embla__slide') || element,
								start: 'top bottom',
								end: 'bottom top',
								scrub: true
							}
						}
					);
				});

				const visibleElements = document.querySelectorAll('.image-blur-animate');
				visibleElements.forEach((element) => {
					const rect = element.getBoundingClientRect();
					const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
					if (isVisible) {
						gsap.to(element, {
							filter: 'blur(0px)',
							scale: 1,
							duration: 1.2,
							ease: 'power3.out'
						});
					}
				});

				// Handle elements already in view for blur animations
				setTimeout(() => {
					// Watch for new .image-blur-animate elements being added
					const observer = new MutationObserver(() => {
						setTimeout(() => {
							const newElements = document.querySelectorAll('.image-blur-animate');
							newElements.forEach((element) => {
								const rect = element.getBoundingClientRect();
								const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
								if (isVisible) {
									gsap.to(element, {
										filter: 'blur(0px)',
										scale: 1,
										duration: 1.2,
										ease: 'power3.out'
									});
								}
							});
						}, 50);
					});

					observer.observe(document.body, {
						childList: true,
						subtree: true,
						attributes: true,
						attributeFilter: ['class']
					});
				}, 200);

				ScrollTrigger.refresh();
			});
		}, 100);

		// Cleanup on unmount
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<svelte:head>
	<HeadHrefLangs />
</svelte:head>

{#if $isPreviewing}
	<a href={`/preview/disable?redirect=${page.url.pathname}`} class="preview-toggle">
		<span>Preview Enabled</span>
		<span>Disable Preview</span>
	</a>
{/if}

<div class="typo-base">
	<Header {name} {season} />
	{@render children?.()}
	<div class="mt-24">
		<Footer data={settings} />
	</div>
</div>

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}
