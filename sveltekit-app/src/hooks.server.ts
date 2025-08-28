import { base } from '$app/paths'
import type { Locales } from '$i18n/i18n-types.js'
import { detectLocale, i18n, isLocale } from '$i18n/i18n-util'
import { loadAllLocales } from '$i18n/i18n-util.sync'
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit'
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'
import { sequence } from '@sveltejs/kit/hooks'
import { createRequestHandler, setServerClient } from '@sanity/svelte-loader'
import { serverClient } from '$lib/server/sanity/client'
import { getPathnameWithoutBase } from './utils.js'

// Initialize i18n
loadAllLocales()
const L = i18n()

// Initialize Sanity
setServerClient(serverClient)

// i18n handle function
const handleI18n: Handle = async ({ event, resolve }) => {
	// read language slug
	const [, lang] = getPathnameWithoutBase(event.url).split('/')
	
	// redirect to base locale if no locale slug was found
	if (!lang) {
		const locale = getPreferredLocale(event)
		throw redirect(307, `${base}/${locale}`)
	}
	
	// if slug is not a locale, use base locale (e.g. api endpoints)
	const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event)
	const LL = L[locale]
	
	// bind locale and translation functions to current request
	event.locals.locale = locale
	event.locals.LL = LL
	
	console.info(LL.log({ fileName: 'hooks.server.ts' }))
	
	// replace html lang attribute with correct language
	return resolve(event, { 
		transformPageChunk: ({ html }) => html.replace('%lang%', locale) 
	})
}

// Sanity handle function
const handleSanity = createRequestHandler()

// Compose both handles using sequence
export const handle = sequence(handleSanity, handleI18n)

const getPreferredLocale = ({ request }: RequestEvent) => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request)
	return detectLocale(acceptLanguageDetector)
}