<script>
	import { run, handlers } from 'svelte/legacy';

	import { headerHeight, menuOpen } from '$lib/stores/header';
	import { searchOpen, searchQuery } from '$lib/stores/search';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Menu from '$lib/components/Menu.svelte';
	import Search from '$lib/components/Search.svelte';
	import { lockscroll } from '@svelte-put/lockscroll';

	let navHeight = $state(0);

	run(() => {
		headerHeight.set(navHeight);
	});
	let locked = $derived($menuOpen ? true : false);

	const resetInput = () => {
		searchQuery.set('');
	};

	afterNavigate(() => {
		menuOpen.set(false);
	});
</script>

<svelte:body use:lockscroll={locked} />
<svelte:window
	onresize={() => {
		$menuOpen = false;
		$searchOpen = false;
	}}
/>

<nav class="w-full p-xs fixed top-0 left-0 z-99 nav" bind:clientHeight={navHeight}>Header</nav>
