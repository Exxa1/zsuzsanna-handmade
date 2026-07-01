import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { SITE_URL, DEFAULT_LOCALE, LOCALES } from './src/config/site'

import tailwindcss from '@tailwindcss/vite'

// Pages that genuinely exist in both languages (a real /en counterpart is built).
// Everything else is Hungarian-only; its /en/* URL is just a fallback redirect.
const isBilingual = (pathname) => {
	const neutral = (pathname.replace(/\/$/, '') || '/').replace(/^\/en(?=\/|$)/, '') || '/'
	return (
		['/', '/about', '/contact', '/blog', '/dolls'].includes(neutral) ||
		neutral.startsWith('/dolls/') ||
		neutral.startsWith('/blog/')
	)
}

// https://astro.build/config
export default defineConfig({
	integrations: [
		sitemap({
			filter: (page) => {
				const { pathname } = new URL(page)
				if (page === new URL('/secret/', SITE_URL).href) return false
				// Drop fallback-redirect stubs (/en/* with no real EN page).
				if (pathname.startsWith('/en/') && !isBilingual(pathname)) return false
				return true
			},
			i18n: {
				defaultLocale: 'hu',
				locales: {
					hu: 'hu-HU',
					en: 'en-US'
				}
			},
			// The i18n option annotates every page with hreflang alternates, but
			// most pages are Hungarian-only. Keep alternates only for pages that
			// truly exist in both languages, so we don't point search engines at
			// fallback-redirected /en URLs.
			serialize(item) {
				if (!isBilingual(new URL(item.url).pathname)) item.links = undefined
				return item
			}
		})
	],

	site: SITE_URL,

	// Hungarian is served at the root ("/"), English under "/en/".
	// Pages that exist only in Hungarian fall back to the Hungarian version.
	i18n: {
		defaultLocale: DEFAULT_LOCALE,
		locales: [...LOCALES],
		fallback: {
			en: DEFAULT_LOCALE
		},
		routing: {
			prefixDefaultLocale: false,
			fallbackType: 'redirect'
		}
	},

	markdown: {
		syntaxHighlight: 'shiki',
		shikiConfig: {
			theme: 'nord',
			wrap: false
		}
	},

	vite: {
		plugins: [
			tailwindcss(),
			// Dev only: Vite doesn't resolve a directory index for public/ subfolders,
			// so a bare /admin (the Sveltia CMS) 404s in `astro dev` even though
			// public/admin/index.html exists. Rewrite it to the file. (On Netlify the
			// static host serves /admin/ → /admin/index.html, so this isn't needed.)
			{
				name: 'serve-admin-index',
				apply: 'serve',
				configureServer(server) {
					server.middlewares.use((req, _res, next) => {
						const path = (req.url || '').split('?')[0]
						if (path === '/admin' || path === '/admin/') {
							req.url = '/admin/index.html'
						}
						next()
					})
				}
			}
		]
	}
})
