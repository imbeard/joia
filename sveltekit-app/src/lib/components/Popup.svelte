<script>
	import { fade } from 'svelte/transition';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import CloseIcon from '$lib/components/svg/CloseIcon.svelte';
	import { clickoutside } from '@svelte-put/clickoutside';
	import { popupToOpen } from '$lib/stores/popup';

	let { data } = $props();

	function closePopup() {
		popupToOpen.set(false);
		sessionStorage.setItem('popupShown', 'true');
	}
</script>

<div
	transition:fade={{ duration: 150 }}
	class="popup-container fixed top-0 left-0 w-full h-screen bg-green/20 backdrop-blur-lg z-99 flex items-center justify-center p-1 overflow-hidden"
>
	<div class="absolute right-2 top-2"><CloseIcon stroke="var(--color-green)" /></div>
	<div
		class="border border-green p-3 py-6 max-w-4xl bg-white flex flex-col items-center overflow-hidden"
		use:clickoutside
		onclickoutside={closePopup}
	>
		<div class="inner-popup overflow-auto">
			<h2 class="small-caps pb-5 text-center">{data?.heading}</h2>
			<div><PortableText data={data?.content} /></div>
		</div>
	</div>
</div>

<style lang="postcss">
	.inner-popup,
	.popup-container {
		scrollbar-width: none;
	}
</style>
