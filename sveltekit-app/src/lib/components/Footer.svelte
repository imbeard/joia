<script lang="ts">
	import Logo from '$lib/components/svg/Logo.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	let { data } = $props();
	let currentYear = $derived(new Date().getFullYear());
</script>

<div class="h-screen w-full flex flex-col justify-between bg-white typo-s">
	<div class="pl-[1.2rem] pt-[4.4rem]"><Logo /></div>
	<div class="p-1.5 flex justify-between">
		<div>
			<div class="uppercase">{data?.companyName}</div>
			<div>{data?.companyAddress}</div>
			<div class="flex gap-1">
				<a href="tel:{data?.phone}">Tel {data?.phone}</a>
				<a href="mailto:{data?.email}">Email {data?.email}</a>
			</div>
		</div>
		<div>©JOIA {currentYear}</div>
		<div class="flex flex-col">
			<a class="uppercase" href="/">Cookie Policy</a>
			<a class="uppercase" href="/">Privacy Policy</a>
			<a class="uppercase" href="/">Design by Parco</a>
		</div>
		{#if data?.social}
			<div class="flex flex-col">
				<a class="uppercase" href="/">Seguici su:</a>
				{#each data?.social as social}
					<a class="uppercase" href={social?.url} target="_blank">{social?.label}</a>
				{/each}
			</div>
		{/if}
		<div class="flex flex-col justify-between">
			<div class="uppercase">Iscriviti alla newsletter:</div>
			<div class="flex justify-between border-b border-b-green">
				<input type="text" placeholder="Inserisci email" />
				<button class="uppercase w-fit">
					<ArrowRight />
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	input::placeholder {
		color: var(--color-green);
	}
	input {
		outline: none;
		appearance: none;
		width: 100%;
	}
</style>
