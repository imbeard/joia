// Replaces the locale slug in a URL.
//
// If the `full` argument is set to `true`, the full URL is returned as a string.
// e.g. https://mywebsite.com/en/blog/article-1 => https://mywebsite.com/de/blog/article-1
//
// Otherwise (default) the URL relative to the base is returned.

import { base } from '$app/paths';

// e.g. https://mywebsite.com/en/blog/article-1 => /de/blog/article-1
export const replaceLocaleInUrl = (url: URL, locale: string, full = false): string => {
	const [, , ...rest] = getPathnameWithoutBase(url).split('/');
	const new_pathname = `/${[locale, ...rest].join('/')}`;
	if (!full) {
		return `${new_pathname}${url.search}`;
	}
	const newUrl = new URL(url.toString());
	newUrl.pathname = base + new_pathname;
	return newUrl.toString();
};

// ----------------------------------------------------------------------------

const REGEX_START_WITH_BASE = new RegExp(`^${base}`);

export const getPathnameWithoutBase = (url: URL) => url.pathname.replace(REGEX_START_WITH_BASE, '');

// ----------------------------------------------------------------------------

// Cookie utility functions
export const setCookie = (
	name: string,
	value: string,
	options: {
		path?: string;
		maxAge?: number;
		httpOnly?: boolean;
		secure?: boolean;
		sameSite?: 'strict' | 'lax' | 'none';
	} = {}
) => {
	const {
		path = '/',
		maxAge = 60 * 60 * 24 * 365, // 1 year
		httpOnly = false,
		secure = false,
		sameSite = 'lax'
	} = options;

	let cookieString = `${name}=${value}; path=${path}; max-age=${maxAge}; samesite=${sameSite}`;

	if (httpOnly) cookieString += '; httponly';
	if (secure) cookieString += '; secure';

	if (typeof document !== 'undefined') {
		document.cookie = cookieString;
	}
};

export const getCookie = (name: string): string | null => {
	if (typeof document === 'undefined') return null;

	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);

	if (parts.length === 2) {
		return parts.pop()?.split(';').shift() || null;
	}

	return null;
};
