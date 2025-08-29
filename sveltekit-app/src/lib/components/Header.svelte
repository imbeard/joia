<script>
	import LL from '$i18n/i18n-svelte';

	import { onMount } from 'svelte';
	import { headerHeight, menuOpen } from '$lib/stores/header';
	import { afterNavigate } from '$app/navigation';
	import { lockscroll } from '@svelte-put/lockscroll';
	import { on } from 'svelte/events';

	import MenuIcon from '$lib/components/svg/MenuIcon.svelte';

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
	class="w-full p-1.5 fixed top-0 left-0 z-99 flex justify-between uppercase"
	bind:clientHeight={navHeight}
>
	<a href="/" class="p-0.5 backdrop-blur-xl">{name}</a>
	<div class="absolute left-1/2 -translate-x-1/2 p-0.5 w-auto">{season}</div>
	<div class="flex gap-3 items-center">
		<a href="/"  class="p-0.5 backdrop-blur-xl">{$LL.book()}</a>
		<a href="/"  class="p-0.5 backdrop-blur-xl">{$LL.gift()}</a>
		<div class="p-0.5">
			<MenuIcon on:click={() => ($menuOpen = !$menuOpen)} />
		</div>
	</div>
</nav>
