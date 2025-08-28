import type { LayoutServerLoad } from './$types';
import { settingsQuery } from '$lib/sanity/queries';

export const load: LayoutServerLoad = async (event) => {
	const { loadQuery, locale, LL } = event.locals;
		
	// Load Sanity data
	const settings = await loadQuery(settingsQuery);

	return {
		settings,
		locale,
		preview: event.locals.preview // Pass preview state to client
	};
};