<script>
	// @ts-nocheck

	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import Accordion from '$lib/components/element/Accordion.svelte';

	let { data } = $props();
	let document = $derived(data?.document?.data);
	$effect(() => {
		console.log(document);
	});
</script>

{#if document}
	<main class="p-1.5">
		<div class="intro flex justify-center items-center uppercase">{document?.title}</div>
		<div class="flex flex-col gap-10">
			{#each document?.categories as category}
				<div>
					<h3 class="pb-3 uppercase text-center">{category?.title}</h3>
					<ul>
						{#each category?.groups as group}
							<Accordion>
								{#snippet head()}
									<div class="uppercase text-center mx-auto">{group?.title}</div>
								{/snippet}
								{#snippet details()}
									<PortableText data={group?.wines} />
								{/snippet}
							</Accordion>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
		{#if document?.tastingNotes}
			<div class="pt-40">
				<div class="w-1/2 flex flex-col items-center justify-center text-center">
					<h3 class="uppercase">{document?.tastingNotes?.heading}</h3>
					<div class="max-w-lg"><PortableText data={document?.tastingNotes?.content} /></div>
					<a
						class="pt-2.5 flex items-center gap-0.5 uppercase hover:opacity-40 transition-opacity duration-350 ease-in-out"
						href={document?.link?.url}
						><span>{document?.link?.label}</span><ArrowRight fill="var(--color-green)" /></a
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
