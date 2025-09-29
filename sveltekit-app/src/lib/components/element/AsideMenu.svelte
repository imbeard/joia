<script>
	import LL from '$i18n/i18n-svelte';
	import { menuOpen } from '$lib/stores/header';
	import CloseIcon from '$lib/components/svg/CloseIcon.svelte';
	import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
	import Logo from '$lib/components/svg/Logo.svelte';
	import { clickoutside } from '@svelte-put/clickoutside';

	let clickOutsideEnabled = $state(false);

	function handleClickOutside() {
		if ($menuOpen) {
			$menuOpen = false;
		}
	}

	// Enable clickoutside with a delay when menu opens
	$effect(() => {
		if ($menuOpen) {
			setTimeout(() => {
				clickOutsideEnabled = true;
			}, 100);
		} else {
			clickOutsideEnabled = false;
		}
	});
</script>

<aside
	class="fixed z-20 h-[100dvh] w-full md:w-1/2 right-0 top-0 bg-green text-white p-xs text-center p-1.5 flex flex-col justify-between items-center overflow-y-auto"
	class:open={$menuOpen}
	use:clickoutside={{ enabled: clickOutsideEnabled }}
	onclickoutside={handleClickOutside}
>
	<button
		class="fixed z-99 right-2 top-2 md:hidden"
		class:hidden={!$menuOpen}
		onclick={() => ($menuOpen = false)}><CloseIcon /></button
	>
	<div class="hidden md:block">
		<div class="small-caps">{$LL.discover()}</div>
		<button class="fixed z-99 right-2 top-2" onclick={() => ($menuOpen = false)}
			><CloseIcon /></button
		>
	</div>
	<div class="w-1/2 p-2 mb-4 md:w-full md:mb-0 md:hidden"><Logo fill="var(--color-white)" /></div>
	<ul class="flex flex-col gap-1.5 md:pb-0 md:gap-4.5 -mt-5">
		<li><a href="/about" class="small-caps menu-btn">Joia</a></li>
		<li><a href="/menu" class="small-caps menu-btn">{$LL.ourMenus()}</a></li>
		<li><a href="/drinking" class="small-caps menu-btn">{$LL.drinkAtJoia()}</a></li>
		<li><a href="/academy" class="small-caps menu-btn">Joia Academy</a></li>
		<li><a href="/events" class="small-caps menu-btn">{$LL.eventsAndCatering()}</a></li>
		<li><a href="/contacts" class="small-caps menu-btn">{$LL.contacts()}</a></li>
	</ul>
	<div class="flex flex-col gap-1">
		<button class="button border border-white w-12 small-caps menu-btn">{$LL.book()}</button>
		<button class="button border border-white w-12 small-caps menu-btn">{$LL.gift()}</button>
	</div>
	<div class="flex flex-col gap-0.2 md:gap-1">
		<div class="text-[12px] small-caps">{$LL.language()}</div>
		<LocaleSwitcher />
	</div>
	<div class="flex flex-col gap-2 w-full border-b border-b-white pb-0.5">
		<div class="small-caps">Newsletter</div>
		<div class="flex justify-between">
			<input type="text" placeholder={$LL.newsletter()} />
			<button><ArrowRight fill="var(--color-white)" /></button>
		</div>
	</div>
</aside>

<style lang="postcss">
	aside {
		will-change: transform;
		transform: translateX(100%);
		transition: transform 600ms cubic-bezier(0.51, 0.19, 0.1, 1);
		transition-delay: 200ms;
	}

	aside.open {
		transform: translateX(0);
	}

	.button {
		border-radius: 3px;
	}

	input::placeholder {
		color: var(--color-white);
	}
	input {
		outline: none;
		appearance: none;
		width: 100%;
	}

	.menu-btn {
		opacity: 1;
		will-change: opacity;
		transition: opacity 200ms cubic-bezier(0.51, 0.19, 0.1, 1);
		&:hover {
			opacity: 0.4;
		}
	}
</style>
