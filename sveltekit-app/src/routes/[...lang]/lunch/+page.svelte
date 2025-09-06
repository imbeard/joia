<script>
	// @ts-nocheck

	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import TwoGalleriesSection from '$lib/components/sections/TwoGalleriesSection.svelte';

	let { data } = $props();
	let document = $derived(data?.document?.data);

	onMount(() => {
		console.log(document);
	});
</script>

{#if document}
	<main>
		<div class="intro flex justify-center items-center small-caps">{$LL.lunchOffer()}</div>
		<div class="px-1.5 mx-auto w-full md:w-1/2">
			<PortableText data={document.description} />
			<div class="pt-15 pb-10 md:py-30 flex flex-col gap-6">
				{#each document.choices as choice}
					<div class="flex flex-col gap-6">
						<div class="text-center small-caps">
							<h3>{choice.title}</h3>
							<h3>{choice.price}</h3>
						</div>
						<PortableText data={choice.description} />
					</div>
				{/each}
			</div>
		</div>
		<TwoGalleriesSection section={document.twoGalleries} />
		<div class="pt-15 pb-10 md:py-40 px-1.5 w-full md:w-1/2 mx-auto">
			<h3 class="small-caps text-center">{document.tastingNotes.heading}</h3>
			<PortableText data={document.tastingNotes.content} />
			<a href="/menu" class="mt-2.5 flex gap-1 items-center small-caps mx-auto w-fit"
				>{$LL.ourMenus()}
				<div><ArrowRight fill="var(--color-green)" /></div>
			</a>
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
