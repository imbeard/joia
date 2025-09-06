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
	import { getPageLink } from '$lib/utils';

	let { data } = $props();
	let document = $derived(data?.document?.data);
</script>

{#if document}
	<main>
		<div class="intro flex justify-center items-center small-caps text-center">Joia</div>
		<div class="px-1.5 mx-auto w-full">
			<PortableText data={document.intro} />
		</div>
		{#if document.gallery}
			<div class="pt-1.5">
				<Gallery data={document.gallery} />
			</div>
		{/if}

		<div class="md:grid-2 gap-1.5">
			{#if document?.details?.infoSection}
				<div class="pt-1.5 pl-1.5">
					<div class="small-caps pb-1.5">
						{document?.details?.infoSection?.heading}
					</div>
					<div class="pb-2"><PortableText data={document?.details?.infoSection?.content} /></div>
					<a
						class="small-caps flex items-center gap-1 hidden md:block"
						href="mailto:{document?.details?.cta}"
						target="_blank"
					>
						<span>{$LL.contactUs()}</span>
						<ArrowRight fill="var(--color-green)" />
					</a>
				</div>
			{/if}
			{#if document?.courses && document?.courses?.length > 0}
				<div class="p-1.5 pt-25 md:pt-1.5 md:pl-0">
					{#each document?.courses as course}
						<Accordion>
							{#snippet head()}
								<div class="small-caps flex items-center gap-1">
									<span>{course?.title}</span>
									{#if course?.enrollmentOpen == 'yes'}
										<span class="bg-green text-white px-[3px] py-[1px] font-sans rounded-[2px]"
											>{$LL.enrolling()}</span
										>
									{/if}
								</div>
							{/snippet}
							{#snippet details()}
								<PortableText data={course?.description} />
							{/snippet}
						</Accordion>
					{/each}
				</div>
			{/if}
			<a
				class="small-caps flex items-center gap-1 block md:hidden px-1.5"
				href="mailto:{document?.details?.cta}"
				target="_blank"
			>
				<span>{$LL.contactUs()}</span>
				<ArrowRight fill="var(--color-green)" />
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
