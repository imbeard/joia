<script lang="ts">
	// @ts-nocheck
	import htm from 'htm';
	import vhtml from 'vhtml';
	import { toHTML, uriLooksSafe } from '@portabletext/to-html';

	interface Props {
		data: any;
		theme?: string;
	}

	let { data, theme = '' }: Props = $props();

	let html = $derived(htm.bind(vhtml));
	let components = $derived({
		listItem: ({ children }) =>
			html`<li class="list-checkbox">
				<div class="tick"></div>
				<span>${children}</span>
			</li>`,

		block: {
			// 'small-caps': ({ children }) => {
			// 	return html`<p class="small-caps">${children}</p>`;
			// },
			h2: ({ children }) => {
				return html`<h2 class="text-xl">${children}</h2>`;
			},
			h3: ({ children }) => {
				return html`<h2 class="text-xl">${children}</h2>`;
			}
		},

		marks: {
			'small-caps': ({ children }) => {
				return html`<span class="small-caps">${children}</span>`;
			},
			linkInternal: ({ children, value }) => {
				const documentType = value.url._type || '';
				const language = value.url.language || '';

				let slug = '';

				if (documentType == 'menuPage') {
					slug = 'menu';
				} else if (documentType == 'herbalTeas') {
					slug = 'herbal-teas';
				} else if (documentType == 'softDrinks') {
					slug = 'soft-drinks';
				} else {
					slug = documentType;
				}

				if (slug) {
					return html`<a class="leading-0 cursor-pointer" href="/${language}/${slug}"
						>${children}</a
					>`;
				}
				return children;
			},
			linkExternal: ({ children, value }) => {
				const href = value.url || '';

				if (uriLooksSafe(href)) {
					const rel = href.startsWith('/') ? undefined : 'noreferrer noopener';
					return html`<a
						class="leading-0 cursor-pointer px-[2px] theme-pink-blue hover:theme-blue-pink ${theme}"
						href="${href}"
						rel="${rel}"
						target="_blank"
						>${children}</a
					>`;
				}
				return children;
			},
			linkEmail: ({ children, value }) => {
				const href = value.url || '';

				if (uriLooksSafe(href)) {
					const rel = href.startsWith('/') ? undefined : 'noreferrer noopener';
					return html`<a
						class="leading-0 cursor-pointer px-[2px] ${theme}"
						href="mailto:${href}"
						rel="${rel}"
						>${children}</a
					>`;
				}
				return children;
			}
			// em: ({ children }) => html`<em>${children}</em>`,
		}
	});
</script>

<div class="rich-text">
	{@html toHTML(data, { components })}
</div>

<style lang="postcss">
	:global(.rich-text p:not(:last-child)) {
		padding-bottom: var(--spacing);
	}
</style>
