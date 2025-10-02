import { homepageQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { lang } = event.params;
	const document = await loadQuery(homepageQuery, { language: lang });

	return {
		document,
		lang
	};
};
