import { base } from '$app/paths';
import type { Locales } from '$i18n/i18n-types.js';
import { detectLocale, i18n, isLocale } from '$i18n/i18n-util';
import { loadAllLocales } from '$i18n/i18n-util.sync';
import { redirect, error, type Handle, type RequestEvent } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { sequence } from '@sveltejs/kit/hooks';
import { createRequestHandler, setServerClient } from '@sanity/svelte-loader';
import { serverClient } from '$lib/server/sanity/client';
import { getPathnameWithoutBase } from './utils.js';
import { LOCALE_COOKIE_NAME, DEFAULT_COOKIE_OPTIONS } from '$lib/constants';

// Initialize i18n
loadAllLocales();
const L = i18n();

// Initialize Sanity
setServerClient(serverClient);

// Valid routes that exist in the app
const VALID_ROUTES = [
	'',
	'about',
	'contacts',
	'academy',
	'events',
	'menu',
	'lunch',
	'drinking',
	'wines',
	'soft-drinks',
	'herbal-teas'
];

// i18n handle function
export const handleI18n: Handle = async ({ event, resolve }) => {
	const pathname = getPathnameWithoutBase(event.url);
	const [, lang, ...rest] = pathname.split('/');

	// Skip i18n handling for sitemap.xml and robots.txt
	if (pathname === '/sitemap.xml' || pathname === '/robots.txt') {
		return resolve(event);
	}

	// redirect to base locale if no locale slug was found
	if (!lang) {
		const locale = getPreferredLocale(event);
		// Set cookie to remember the locale
		event.cookies.set(LOCALE_COOKIE_NAME, locale, DEFAULT_COOKIE_OPTIONS);
		throw redirect(307, `${base}/${locale}`);
	}

	// if slug is not a locale, redirect to locale/slug or return 404
	if (!isLocale(lang)) {
		// Check if the route exists
		const routeName = lang;
		if (!VALID_ROUTES.includes(routeName)) {
			throw error(404, `Page not found: ${pathname}`);
		}

		const locale = getPreferredLocale(event);
		const newPathname = `/${locale}${pathname}`;
		// Set cookie to remember the locale
		event.cookies.set(LOCALE_COOKIE_NAME, locale, DEFAULT_COOKIE_OPTIONS);
		throw redirect(307, `${base}${newPathname}${event.url.search}`);
	}

	// Additional check: if we have a locale, verify the route exists
	if (rest.length > 0) {
		const routeName = rest[0];
		if (!VALID_ROUTES.includes(routeName)) {
			throw error(404, `Page not found: ${pathname}`);
		}
	}

	const locale = lang as Locales;
	const LL = L[locale];

	// Set cookie to remember the current locale
	event.cookies.set(LOCALE_COOKIE_NAME, locale, DEFAULT_COOKIE_OPTIONS);

	// bind locale and translation functions to current request
	event.locals.locale = locale;
	event.locals.LL = LL;

	console.info(`[hooks.server.ts] Using locale: ${locale}`);

	// replace html lang attribute with correct language
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
};

// Sanity handle function
const handleSanity = createRequestHandler();

// Compose both handles using sequence
export const handle = sequence(handleSanity, handleI18n);

const getPreferredLocale = ({ request, cookies }: RequestEvent) => {
	// First check if user has a locale preference stored in cookie
	const cookieLocale = cookies.get(LOCALE_COOKIE_NAME);
	if (cookieLocale && isLocale(cookieLocale)) {
		return cookieLocale as Locales;
	}

	// Fall back to browser's preferred language
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);
	return detectLocale(acceptLanguageDetector);
};
