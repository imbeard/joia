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
	let settings = $derived(data?.settings?.data);
</script>

<SEO data={document?.seo} pageTitle={$LL.contacts()} locale={data?.locale} />

{#if document}
	<main>
		<div class="fade-in intro flex flex-col justify-center items-center small-caps text-center">
			<div>{$LL.contacts()}</div>
			<div>{settings?.settings?.companyName}</div>
			<div>{settings?.settings?.companyAddress}</div>
			<div class="flex gap-1">
				<a href="tel:{settings?.settings?.phone}">Tel {settings?.settings?.phone}</a>
				<a href="mailto:{settings?.settings?.email}">Email {settings?.settings?.email}</a>
			</div>
		</div>
		<div class="fade-in flex flex-col gap-15 md:grid-2 p-1.5 md:gap-1.5">
			<div class="flex flex-col gap-2">
				<div class="small-caps text-center md:text-left">{document?.hours?.heading}</div>
				<div class="max-w-xl"><PortableText data={document?.hours?.content} /></div>
			</div>
			<div>
				<div class="small-caps pb-2 text-center md:text-left">
					{document?.generalInformations?.heading}
				</div>
				<PortableText data={document?.generalInformations?.content} />
			</div>
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
</style>
