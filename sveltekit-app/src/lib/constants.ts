// Shared constants used across the application

// Locale persistence
export const LOCALE_COOKIE_NAME = 'locale';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

// Cookie configuration
export const DEFAULT_COOKIE_OPTIONS = {
	path: '/',
	maxAge: LOCALE_COOKIE_MAX_AGE,
	httpOnly: false,
	secure: false,
	sameSite: 'lax' as const
};
