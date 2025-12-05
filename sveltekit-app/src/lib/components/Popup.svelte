<script>
	import { fade } from 'svelte/transition';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import CloseIcon from '$lib/components/svg/CloseIcon.svelte';
	import { clickoutside } from '@svelte-put/clickoutside';
	import { popupToOpen } from '$lib/stores/popup';
	import { onMount } from 'svelte';

	let { data } = $props();

	function closePopup() {
		popupToOpen.set(false);
	}

	// onMount(() => {
	// 	sessionStorage.setItem('popupShown', 'true');
	// });
</script>

<div
	transition:fade={{ duration: 150 }}
	class="popup-container fixed top-0 left-0 w-full h-screen bg-white/50 backdrop-blur-lg z-99 flex items-center justify-center p-1 overflow-hidden"
>
	<div class="absolute right-2 top-2"><CloseIcon stroke="var(--color-green)" /></div>
	<div
		class="box p-3 py-6 max-w-4xl bg-white flex flex-col items-center overflow-hidden"
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

	.box {
		box-shadow: 0 0 20px 0 rgb(05 121 82 / 20%);
	}

	:global(.box .rich-text) {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin: 1rem;
	}

	:global(.box .rich-text a) {
		background-color: var(--color-green);
		color: var(--color-white);
		padding: 0.5rem;
		backdrop-filter: blur(var(--blur-xl));
	}
</style>
