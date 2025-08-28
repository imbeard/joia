import type { LayoutLoad } from './$types'
import type { Locales } from '$i18n/i18n-types'
import { loadLocaleAsync } from '$i18n/i18n-util.async'
import { i18nObject } from '$i18n/i18n-util.js'
import { setPreviewing } from '@sanity/visual-editing/svelte'

export const load: LayoutLoad<{ locale: Locales }> = async ({ data }) => {
	const { locale, preview, settings } = data;
	
	// Set up Sanity preview mode
	setPreviewing(preview);
	
	// Load i18n dictionary into memory
	await loadLocaleAsync(locale);
	
	// Create i18n object instance for this load function
	const LL = i18nObject(locale);
	console.info(LL.log({ fileName: '+layout.ts' }));
	
	// Pass all data to the rendering context
	return { 
		locale,
		settings
	};
};