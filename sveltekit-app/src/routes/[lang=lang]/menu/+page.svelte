<script>
	import LL from '$i18n/i18n-svelte';
    import {onMount} from 'svelte';

	let { data } = $props();
    onMount(() => {
        console.log(data)
    })
</script>

<main></main>

<style>
</style>
