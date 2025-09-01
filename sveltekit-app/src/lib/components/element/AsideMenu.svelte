<script>
	import LL from '$i18n/i18n-svelte';
	import { menuOpen } from '$lib/stores/header';
	import CloseIcon from '$lib/components/svg/CloseIcon.svelte';
	import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
</script>

<aside
	class="fixed z-99 h-[100dvh] w-1/2 right-0 top-0 bg-green text-white p-xs text-center p-1.5 flex flex-col justify-between items-center"
	class:open={$menuOpen}
>
	<div>
		<div class="uppercase">Scopri:</div>
		<button class="absolute right-2 top-2" onclick={() => ($menuOpen = false)}><CloseIcon /></button
		>
	</div>
	<ul class="flex flex-col gap-4.5">
		<li><a href="/about" class="uppercase menu-btn">Joia</a></li>
		<li><a href="/menu" class="uppercase menu-btn">{$LL.ourMenus()}</a></li>
		<li><a href="/academy" class="uppercase menu-btn">Joia Academy</a></li>
		<li><a href="/events" class="uppercase menu-btn">{$LL.eventsAndCatering()}</a></li>
		<li><a href="/contacts" class="uppercase menu-btn">{$LL.contacts()}</a></li>
	</ul>
	<div class="flex flex-col gap-2">
		<button class="button border border-white w-12 uppercase menu-btn">{$LL.book()}</button>
		<button class="button border border-white w-12 uppercase menu-btn">{$LL.gift()}</button>
	</div>
	<div class="flex flex-col gap-1">
		<div class="text-[12px] uppercase">{$LL.language()}</div>
		<LocaleSwitcher />
	</div>
	<div class="flex flex-col gap-2 w-full border-b border-b-white pb-0.5">
		<div class="uppercase">Newsletter</div>
		<div class="flex justify-between">
			<input type="text" placeholder={$LL.newsletter()} />
			<button><ArrowRight fill="var(--color-white)" /></button>
		</div>
	</div>
</aside>

<style lang="postcss">
	aside {
		transform: translateX(100%);
		transition: transform 350ms cubic-bezier(0.25, 1, 0.45, 1);
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
        transition: opacity 350ms ease-in-out;
        &:hover {
            opacity: 0.4;
        }
    }
</style>
