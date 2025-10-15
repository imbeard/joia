<script>
	// @ts-nocheck
	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import Accordion from '$lib/components/element/Accordion.svelte';
	import SEO from '$lib/components/seo/SEO.svelte';

	let { data } = $props();
	let document = $derived(data?.document?.data);
	$effect(() => {
		console.log(document);
	});
</script>

<SEO data={document?.seo} pageTitle={document?.title} />

{#if document}
	<main class="p-1.5">
		<div class="intro flex justify-center items-center small-caps fade-in">{document?.title}</div>
		<div class="grid-12 w-full gap-1">
			<div class="col-start-1 col-end-13 md:col-start-2 md:col-end-12 flex flex-col gap-10">
				{#each document?.categories as category}
					<div>
						<h3 class="pb-1.5 small-caps text-center fade-in">{category?.title}</h3>
						<ul class="fade-in">
							{#each category?.subCategories as group}
								<Accordion>
									{#snippet head()}
										<div class="small-caps text-center mx-auto">{group?.title}</div>
									{/snippet}
									{#snippet details()}
										{#if group?.wines && group?.wines.length > 0}
											{#each group?.wines as drink}
												<div class="w-full">
													<li class="grid-10 gap-1 w-full py-1.5">
														<div class="col-start-1 col-end-11 md:col-end-2 small-caps">
															{drink?.region}
														</div>
														<div class="col-start-2 col-end-11 md:col-end-4 small-caps">
															{drink?.winery}
														</div>
														<div class="col-start-2 col-end-11 md:col-end-8">
															<div>{drink?.title}</div>
															<div>({drink?.secondaryTitle})</div>
														</div>
														{#if drink?.bottles && drink?.bottles.length > 0}
															<div class="col-start-2 md:col-start-8 col-end-11 flex flex-col">
																{#each drink?.bottles as bottle}
																	<div class="w-full flex justify-between">
																		<div>{bottle?.year}</div>
																		<div>{bottle?.price}</div>
																	</div>
																{/each}
															</div>
														{/if}
													</li>
												</div>
											{/each}
										{/if}
									{/snippet}
								</Accordion>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
		{#if document?.tastingNotes}
			<div class="pt-40">
				<div class="flex flex-col items-center justify-center text-center fade-in">
					<h3 class="small-caps">{document?.tastingNotes?.infoSection?.heading}</h3>
					<div class="max-w-lg">
						<PortableText data={document?.tastingNotes?.infoSection?.content} />
					</div>
					<a
						class="pt-2.5 flex items-center gap-0.5 small-caps hover:opacity-40 transition-opacity duration-350 ease-in-out"
						href={document?.tastingNotes?.cta?.url}
						><span>{document?.tastingNotes?.cta?.label}</span><ArrowRight
							fill="var(--color-green)"
						/></a
					>
				</div>
			</div>
		{/if}
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
