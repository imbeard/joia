import {aboutQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
    const { loadQuery } = event.locals;
    const params = event.params;
    const page = await loadQuery(aboutQuery, { language: params.lang });

    return {
        page,
        params
    };
};
