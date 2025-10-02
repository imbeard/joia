<script>
	import LL from '$i18n/i18n-svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import Gallery from '$lib/components/element/Gallery.svelte';
	import Logo from '$lib/components/svg/Logo.svelte';
	import SEO from '$lib/components/seo/SEO.svelte';
	import { getPageLink } from '$lib/utils';


	let { data } = $props();
	let home = $derived(data?.document?.data?.home);
	let menus = $derived(data?.document?.data?.menus);
	let aboutHeight = $state(0);

	const handleMenuLinks = (slug) => {
		const currentLang = data?.params?.lang || 'en';
		sessionStorage.setItem('scrollToHash', slug);
		goto(`/${currentLang}/menu`);
	};
</script>

<SEO data={home?.seo} />

{#if home}
	<main>
		<div class="fade-in p-2 pt-6 w-full h-screen flex flex-col justify-between">
			<div class="w-1/3 min-w-30"><Logo fill="var(--color-green)" /></div>
			<PortableText data={home?.intro} />
		</div>
		<div class="fade-in"><Gallery data={home?.gallery} fit="cover" /></div>
		<div class="px-1.5 md:w-1/2">
			<h3 class="fade-in small-caps py-3 pb-2">{home?.about?.heading}</h3>
			<div bind:clientHeight={aboutHeight}><PortableText data={home?.about?.content} /></div>

			<div class="sticky bottom-2 flex flex-col" style="padding-top: {aboutHeight * 1.4}px">
				<h3 class="small-caps" style="padding-bottom: {aboutHeight * 1.12}px">{$LL.ourMenus()}</h3>
				<div class="sticky bottom-2 pt-4">
					{#if menus}
						<div>
							{#each menus as menu, index}
								<button
									onclick={() => handleMenuLinks(menu?.slug)}
									class="w-full py-1.5 border-green border-b flex justify-between items-center"
									class:border-t={index === 0}
								>
									<h4 class="small-caps">{menu?.title}</h4>
									<ArrowRight fill="var(--color-green)" />
								</button>
							{/each}
							<div class="pt-1.5">
								<a class="small-caps w-fit flex gap-1 items-center" href="/menu">
									<span>{$LL.discoverOurMenus()}</span>
									<ArrowRight fill="var(--color-green)" />
								</a>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>

		{#if home.lunch}
			<div class="fade-in pt-24 px-1.5 flex flex-col gap-1.5 items-center">
				<h3 class="small-caps text-center">{home?.lunch?.heading}</h3>
				<PortableText data={home?.lunch?.content} />
				<a class="w-fit small-caps flex gap-1 items-center" href="/lunch">
					<span>{$LL.lunchOffer()}</span>
					<ArrowRight fill="var(--color-green)" />
				</a>
			</div>
		{/if}

		{#if home.chefs}
			<div class="md:grid-2 gap-2 pt-24">
				<Gallery data={home?.chefs?.gallery} fit="cover" />
				<div class="info flex flex-col justify-between px-1.5 pt-2 md:pt-0 md:px-0 md:pr-1.5">
					<div class="flex flex-col justify-center h-full">
						<h3 class="fade-in small-caps pb-2 md:pb-0">
							{home?.chefs?.title}
						</h3>
					</div>
					<div class="fade-in">
						<PortableText data={home?.chefs?.content} />
						<a
							href="/{getPageLink(home?.chefs?.cta?.url)}"
							class="mt-2.5 flex gap-1 items-center small-caps w-fit"
							>{home?.chefs?.cta?.label}
							<div><ArrowRight fill="var(--color-green)" /></div>
						</a>
					</div>
				</div>
			</div>
		{/if}
	</main>
{/if}
