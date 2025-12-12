<script>
	//@ts-nocheck
	import '../assets/css/main.css';
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import LiveMode from '$lib/components/LiveMode.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeadHrefLangs from '$lib/components/HeaderHrefLangs.svelte';
	import Popup from '$lib/components/Popup.svelte';
	import { scrollAnimations } from '$lib/animations';
	import { popupToOpen } from '$lib/stores/popup';

	let { data, children } = $props();
	setLocale(data.locale);

	let settings = $derived(data?.settings?.data?.settings);
	let popup = $derived(data?.settings?.data?.popup);
	let name = $derived(settings?.companyName);
	let season = $derived(settings?.season);
	let mounted = $state(false);
	let initialUrl = $state('');
	let popupActive = $derived(popup?.isActive === true);
	let showPopup = $derived(
		mounted &&
			$popupToOpen &&
			popupActive &&
			browser &&
			sessionStorage &&
			sessionStorage.getItem('popupShown') === 'false'
	);

	let pluginsInitialized = $state(false);

	onMount(() => {
		if (browser && !sessionStorage.getItem('popupShown')) {
			sessionStorage.setItem('popupShown', 'false');
		} else if (browser && sessionStorage.getItem('popupShown') === 'true') {
			popupToOpen.set(false);
		}

		// Initialize GSAP
		if (!pluginsInitialized) {
			gsap.registerPlugin(ScrollTrigger);

			// Disable browser scroll restoration
			if ('scrollRestoration' in history) {
				history.scrollRestoration = 'manual';
			}

			pluginsInitialized = true;
		}

		mounted = true;
		initialUrl = page.url.pathname;
	});

	$effect(() => {
		// Access page.url to make this reactive to route changes
		const currentUrl = page.url.pathname;

		// Close popup on navigation (but not on initial load)
		if (mounted && $popupToOpen && currentUrl !== initialUrl) {
			popupToOpen.set(false);
		}

		if (!pluginsInitialized) return;

		// Scroll to top on route changes
		window.scrollTo(0, 0);
		setTimeout(() => window.scrollTo(0, 0), 0);

		setTimeout(() => {
			scrollAnimations();
		}, 100);

		// Cleanup on unmount
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});

	// $effect(() => {
	// 	if (showPopup && browser) {
	// 		document.body.classList.add('overflow-hidden');
	// 	} else {
	// 		document.body.classList.remove('overflow-hidden');
	// 	}
	// });
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
