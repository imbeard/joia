import { homepageQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { lang } = event.params;
	console.log('DEBUG - URL:', event.url.pathname);
	console.log('DEBUG - params:', event.params);
	console.log('DEBUG - lang param:', lang);
	const document = await loadQuery(homepageQuery, { language: lang });

	return {
		document,
		lang
	};
};
