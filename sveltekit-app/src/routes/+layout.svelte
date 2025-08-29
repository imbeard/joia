<script>
	import '../assets/css/main.css';
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import { page } from '$app/state';
	import LiveMode from '$lib/components/LiveMode.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeadHrefLangs from '$lib/components/HeaderHrefLangs.svelte';

	import { dev } from '$app/environment';

	let { data, children } = $props();
	setLocale(data.locale);

	let settings = $derived(data?.settings?.data);
	let name = $derived(settings?.companyName);
	let season = $derived(settings?.season);
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

{#if $isPreviewing && !dev}
	<VisualEditing />
	<LiveMode />
{/if}
