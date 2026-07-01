// Bridge between CMS-stored image paths (strings) and astro:assets optimization.
// Content entries (and the CMS) store an image as a path string; resolveImage()
// maps that path to the imported, build-optimized asset.
//
// Images live under src/assets/ so they can be optimized. The path stored in
// content is the project-absolute path, e.g. "/src/assets/landing/hero.webp".
import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
	"/src/assets/**/*.{webp,jpg,jpeg,png,avif,svg}",
	{ eager: true },
);

export function resolveImage(path: string): ImageMetadata | undefined {
	const found = images[path]?.default;
	if (!found) {
		// Surface bad paths at build time rather than silently dropping the image.
		console.warn(`[resolveImage] no asset found for "${path}"`);
	}
	return found;
}
