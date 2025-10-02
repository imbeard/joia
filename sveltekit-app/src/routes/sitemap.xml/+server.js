import { client } from '$lib/sanity/client';
import groq from 'groq';

// Configuration
const BASE_URL = 'https://your-domain.com'; // Update with your actual domain
const LANGUAGES = ['en', 'it'];

// Static routes that exist for both languages
const STATIC_ROUTES = [
	'', // home page
	'/about',
	'/contacts',
	'/academy',
	'/events',
	'/menu',
	'/lunch',
	'/drinking',
	'/wines',
	'/soft-drinks',
	'/herbal-teas'
];

// Content type queries to check what content exists for each language
const CONTENT_QUERIES = {
	menus: groq`*[_type == "menu" && language == $language && defined(slug.current)] {
		"slug": slug.current,
		"lastmod": _updatedAt,
		"title": title
	}`
	// Add other dynamic content types here if they have slugs in the future
};

export async function GET() {
	try {
		const urlEntries = [];

		// Generate URLs for each language
		for (const lang of LANGUAGES) {
			// Static routes for this language
			for (const route of STATIC_ROUTES) {
				urlEntries.push(generateUrlXml(`/${lang}${route}`));
			}

			// Dynamic content for this language
			const dynamicDataPromises = Object.entries(CONTENT_QUERIES).map(
				async ([contentType, query]) => {
					const data = await client.fetch(query, { language: lang });
					return { contentType, data, lang };
				}
			);

			const dynamicResults = await Promise.all(dynamicDataPromises);

			// Add dynamic routes (if any content types have slugs)
			dynamicResults.forEach(({ contentType, data, lang }) => {
				data.forEach((item) => {
					urlEntries.push(generateUrlXml(`/${lang}/${contentType}/${item.slug}`, item.lastmod));
				});
			});
		}

		// Create sitemap XML
		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>`;

		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'max-age=3600' // Cache for 1 hour
			}
		});
	} catch (error) {
		console.error('Error generating sitemap:', error);
		return new Response('Error generating sitemap', { status: 500 });
	}
}

function generateUrlXml(path, lastmod = null) {
	const url = `${BASE_URL}${path}`;
	const lastmodXml = lastmod
		? `
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>`
		: '';

	// Generate hreflang alternates for multilingual pages
	const pathWithoutLang = path.replace(/^\/(?:en|it)/, '') || '/';
	const hreflangs = LANGUAGES.map(
		(lang) =>
			`    <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}/${lang}${pathWithoutLang === '/' ? '' : pathWithoutLang}" />`
	).join('\n');

	const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${pathWithoutLang === '/' ? '' : pathWithoutLang}" />`;

	return `  <url>
    <loc>${url}</loc>${lastmodXml}
${hreflangs}
${xDefault}
  </url>`;
}
