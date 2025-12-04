<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import Logo from '$lib/components/svg/Logo.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import NewsletterFormFooter from '$lib/components/NewsletterFormFooter.svelte';
	let { data } = $props();
	let currentYear = $derived(new Date().getFullYear());
</script>

<div class="fade-in h-screen w-full flex flex-col justify-between bg-white typo-s">
	<div class="pl-[1.2rem] pt-[8.4rem] w-20"><Logo fill="var(--color-green)" /></div>

	<div>
		<img class="pl-1.5 hidden md:block" src="/michelin.png" alt="" />
		<div class="p-1.5 flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between">
			<div>
				<div class="small-caps">{data?.companyName}</div>
				<div>{data?.companyAddress}</div>
				<div class="flex gap-1">
					<a href="tel:{data?.phone}">Tel {data?.phone}</a>
					<a href="mailto:{data?.email}">Email {data?.email}</a>
				</div>
			</div>
			<div class="hidden md:block small-caps">©JOIA {currentYear}</div>
			<div class="hidden md:flex flex-col">
				<a class="small-caps" href="https://www.iubenda.com/privacy-policy/65841559/cookie-policy"
					>Cookie Policy</a
				>
				<a class="small-caps" href="https://www.iubenda.com/privacy-policy/65841559" target="_blank"
					>Privacy Policy</a
				>
				<a class="small-caps" href="https://parco.studio" target="_blank">Design by Parco</a>
			</div>
			{#if data?.social}
				<div class="hidden md:flex flex-col">
					<div class="small-caps">{$LL.followUs()}</div>
					{#each data?.social as social}
						<a class="small-caps" href={social?.url} target="_blank">{social?.label}</a>
					{/each}
				</div>
			{/if}
			<div class="flex flex-col justify-between">
				<div class="small-caps">{$LL.newsletterSubscribe()}</div>
				<NewsletterFormFooter />
			</div>
			<!-- MOBILE VERSION -->
			<div class="flex justify-between place-items-end pb-1 md:hidden">
				<div class="flex flex-col gap-0.5">
					<a class="small-caps" href="https://www.iubenda.com/privacy-policy/65841559/cookie-policy"
						>Cookie Policy</a
					>
					<a
						class="small-caps"
						href="https://www.iubenda.com/privacy-policy/65841559"
						target="_blank">Privacy Policy</a
					>
					<a class="small-caps" href="https://parco.studio" target="_blank">Design by Parco</a>
				</div>
				{#if data?.social}
					<div class="flex flex-col gap-0.5">
						<div class="small-caps">Seguici su:</div>
						{#each data?.social as social}
							<a class="small-caps" href={social?.url} target="_blank">{social?.label}</a>
						{/each}
					</div>
				{/if}
				<div class="block small-caps">©JOIA {currentYear}</div>
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
