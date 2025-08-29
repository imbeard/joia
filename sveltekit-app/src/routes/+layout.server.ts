import type { LayoutServerLoad } from './$types';
import { settingsQuery } from '$lib/sanity/queries';

export const load: LayoutServerLoad = async (event) => {
	const { loadQuery, locale, LL } = event.locals;
	const params = event.params;

	// Load Sanity data
	const settings = await loadQuery(settingsQuery, { language: params.lang });

	return {
		settings,
		locale,
		preview: event.locals.preview // Pass preview state to client
	};
};
