<script>
	// @ts-nocheck

	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';

	let { data } = $props();
	let pageData = $derived(data?.document?.data);

	onMount(() => {
		const storedHash = sessionStorage.getItem('scrollToHash');

		if (storedHash) {
			setTimeout(() => {
				const element = document.getElementById(storedHash);

				if (element) {
					element.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
				sessionStorage.removeItem('scrollToHash');
			}, 300);
		}
	});
</script>

{#if pageData}
	<main class="p-1.5">
		<div class="intro flex justify-center items-center uppercase">{pageData?.heading}</div>
		{#if pageData?.menus.length > 0}
			<div class="flex flex-col gap-16">
				{#each pageData?.menus as menu, index}
					<div id={menu.slug.current} class="md:grid-2 gap-1.5 pt-6">
						<div class="pb-2">
							<h3 class="uppercase">
								<span>{menu?.title}, {menu?.price}</span>
							</h3>
							<PortableText data={menu?.description} />
						</div>
						<div class="pl-6 md:pl-0 flex flex-col gap-3">
							{#each menu?.courses as course}
								<div>
									<h4 class="uppercase">{course?.heading}</h4>
									<PortableText data={course?.content} />
								</div>
							{/each}
							<div class="py-3 uppercase text-center">
								{menu?.dessert?.title}
							</div>
							{#each menu?.dessert?.desserts as dessert}
								<div>
									<h4 class="uppercase">{dessert?.heading}</h4>
									<PortableText data={dessert?.content} />
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<div class="sm:grid-2 place-items-center pt-40">
			{#if pageData?.drink}
				<div class="w-1/2 flex flex-col items-center justify-center text-center">
					<h3 class="uppercase">{pageData?.drink?.heading}</h3>
					<div class="max-w-lg"><PortableText data={pageData?.drink?.content} /></div>
					<a
						class="pt-2.5 flex items-center gap-0.5 uppercase hover:opacity-40 transition-opacity duration-350 ease-in-out"
						href="/wines"
						><span>{$LL.drinkSelection()}</span><ArrowRight fill="var(--color-green)" /></a
					>
				</div>
			{/if}
			{#if pageData?.lunch}
				<div class="pt-10 sm:pt-0 w-1/2 flex flex-col items-center justify-center text-center">
					<h3 class="uppercase">{pageData?.lunch?.heading}</h3>
					<div class="max-w-lg"><PortableText data={pageData?.lunch?.content} /></div>
					<a
						class="pt-2.5 flex items-center gap-0.5 uppercase hover:opacity-40 transition-opacity duration-350 ease-in-out"
						href="/lunch"><span>{$LL.lunchOffer()}</span><ArrowRight fill="var(--color-green)" /></a
					>
				</div>
			{/if}
		</div>
	</main>
{/if}

<style>
	.intro {
		height: calc(80vh - 24rem);
		width: 100%;
		min-height: 400px;
	}
	@media screen and (min-width: 768px) {
		.intro {
			height: 65vh;
		}
	}
</style>
