<script lang="ts">
	// @ts-nocheck
	import LL from '$i18n/i18n-svelte';

	import { headerHeight } from '$lib/stores/header';
	import Image from '$lib/components/element/Image.svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import Marquee from '$lib/components/element/Marquee.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	onMount(() => {
		console.log(data)
	})
</script>

<main>
</main>

<style>
</style>
