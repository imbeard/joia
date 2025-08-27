import type { LayoutServerLoad } from './$types';
import { settingsQuery } from '$lib/sanity/queries';

export const load: LayoutServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const settings = await loadQuery(settingsQuery);

	return {
		settings
	};
};
