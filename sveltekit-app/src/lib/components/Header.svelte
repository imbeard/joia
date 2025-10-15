<script>
	import LL from '$i18n/i18n-svelte';

	import { onMount } from 'svelte';
	import { headerHeight, menuOpen } from '$lib/stores/header';
	import { afterNavigate } from '$app/navigation';
	import { lockscroll } from '@svelte-put/lockscroll';
	import MenuIcon from '$lib/components/svg/MenuIcon.svelte';
	import AsideMenu from '$lib/components/element/AsideMenu.svelte';

	let { name, season } = $props();
	let navHeight = $state(0);

	let locked = $derived($menuOpen ? true : false);

	onMount(() => {
		headerHeight.set(navHeight);
	});

	afterNavigate(() => {
		menuOpen.set(false);
	});
</script>

<svelte:body use:lockscroll={locked} />
<svelte:window
	onresize={() => {
		$menuOpen = false;
	}}
/>

<nav
	class="w-full p-1.5 fixed top-0 left-0 z-10 flex justify-between small-caps"
	bind:clientHeight={navHeight}
>
	<a href="/" class="py-0.5 px-1 backdrop-blur-xl md:hidden">Joia</a>
	<a href="/" class="py-0.5 px-1 backdrop-blur-xl hidden md:block">{name}</a>
	<div class="absolute left-1/2 -translate-x-1/2 backdrop-blur-xl py-0.5 px-1 w-auto">{season}</div>
	<div class="flex gap-3 items-center">
		<a
			href="https://widget.thefork.com/en/29bf668f-ed19-4b43-ae1b-c6505084fecc"
			target="_blank"
			class="py-0.5 px-1 backdrop-blur-xl hidden md:block">{$LL.book()}</a
		>
		<a
			href="https://joia.bonkdo.com/en/"
			target="_blank"
			class="py-0.5 px-1 backdrop-blur-xl hidden md:block">{$LL.gift()}</a
		>
		<button class="py-0.5 px-1" onclick={() => ($menuOpen = !$menuOpen)}>
			<MenuIcon />
		</button>
	</div>
</nav>

<AsideMenu />
