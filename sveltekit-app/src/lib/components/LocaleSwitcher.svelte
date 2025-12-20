<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidateAll, pushState, replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import { setLocale, locale } from '$i18n/i18n-svelte';
	import type { Locales } from '$i18n/i18n-types';
	import { locales } from '$i18n/i18n-util';
	import { loadLocaleAsync } from '$i18n/i18n-util.async';
	import { onMount } from 'svelte';
	import { replaceLocaleInUrl, setCookie } from '../../utils.js';
	import { LOCALE_COOKIE_NAME } from '$lib/constants.js';

	const switchLocale = async (newLocale: Locales, updateHistoryState = true) => {
		if (!newLocale || $locale === newLocale) return;

		// load new dictionary from server
		await loadLocaleAsync(newLocale);

		// select locale
		setLocale(newLocale);

		// Set cookie to persist locale choice
		if (browser) {
			setCookie(LOCALE_COOKIE_NAME, newLocale);
		}

		if (updateHistoryState) {
			// update url to reflect locale changes
			history.pushState({ locale: newLocale }, '', replaceLocaleInUrl(page.url, newLocale));
		}

		// run the `load` function again
		invalidateAll();
	};

	// update `lang` attribute
	$effect(() => {
		if (browser) {
			document.querySelector('html')?.setAttribute('lang', $locale);
		}
	});
	// update locale when navigating via browser back/forward buttons
	const handlePopStateEvent = async ({ state }: PopStateEvent) => switchLocale(state.locale, false);

	// update locale when page store changes
	$effect(() => {
		if (browser) {
			const lang = page.params.lang as Locales;
			switchLocale(lang, false);
			history.replaceState(
				{ ...history.state, locale: lang },
				'',
				replaceLocaleInUrl(page.url, lang)
			);
		}
	});
</script>

<svelte:window on:popstate={handlePopStateEvent} />

<ul class="flex gap-1">
	{#each locales as l}
		<li>
			<a
				data-sveltekit-reload
				class="menu-btn small-caps"
				class:active={l === $locale}
				href={replaceLocaleInUrl(page.url, l)}
			>
				{l}
			</a>
		</li>
		{#if l !== locales[locales.length - 1]}
			<li>|</li>
		{/if}
	{/each}
</ul>

<style lang="postcss">
	a.active {
		opacity: 1;
	}
	.menu-btn {
		opacity: 0.4;
		transition: opacity 350ms ease-in-out;
		&:hover {
			opacity: 1;
		}
	}
</style>
