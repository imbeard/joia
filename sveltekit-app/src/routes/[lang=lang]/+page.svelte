<script lang="ts">
	// @ts-nocheck
	import LL from '$i18n/i18n-svelte';
	import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';

	import { headerHeight } from '$lib/stores/header';
	import Image from '$lib/components/element/Image.svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import Marquee from '$lib/components/element/Marquee.svelte';

	// let { data } = $props();
</script>

<main>
	<section>{$LL.welcome()}</section>
	<LocaleSwitcher />
</main>

<style>
</style>
