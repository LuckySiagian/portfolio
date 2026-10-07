// Turns screenshots dropped into public/, public/images/ or
// public/images/projects/ (e.g. "spmt.png", "lucky mart.png")
// into small WebP files in public/images/projects/, then moves the original
// out of public/ into media-originals/screenshots/ (git-ignored) so the big
// file is never deployed.
//
// Runs automatically whenever Vite starts (dev or build), or manually with:
//   npm run images
import { existsSync, mkdirSync, readdirSync, renameSync } from "node:fs";
import { extname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const publicDir = join(root, "public");
const outDir = join(publicDir, "images", "projects");
const archiveDir = join(root, "media-originals", "screenshots");

const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);
const MAX_WIDTH = 1600;

// "lucky mart.png" -> "lucky-mart"
const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function optimizeImages({ log = console.log } = {}) {
  // public/*.png|jpg|jpeg, public/images/*.png (og-image.jpg there is left alone)
  // and public/images/projects/*.png|jpg|jpeg.
  const imagesDir = join(publicDir, "images");
  const pick = (dir, exts) =>
    existsSync(dir)
      ? readdirSync(dir, { withFileTypes: true })
          .filter((d) => d.isFile() && exts.has(extname(d.name).toLowerCase()))
          .map((d) => join(dir, d.name))
      : [];
  const sources = [
    ...pick(publicDir, SOURCE_EXT),
    ...pick(imagesDir, new Set([".png"])),
    ...pick(outDir, SOURCE_EXT),
  ];

  if (sources.length === 0) return [];

  // Load sharp lazily so a missing native binary never breaks the site build.
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch (err) {
    log(`[images] sharp unavailable, skipping optimization: ${err.message}`);
    return [];
  }

  mkdirSync(outDir, { recursive: true });
  mkdirSync(archiveDir, { recursive: true });

  const done = [];
  for (const src of sources) {
    const file = basename(src);
    const slug = slugify(basename(file, extname(file)));
    const dest = join(outDir, `${slug}.webp`);

    const info = await sharp(src)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(dest);

    renameSync(src, join(archiveDir, file));
    log(`[images] ${file} -> images/projects/${slug}.webp (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
    done.push(`${slug}.webp`);
  }
  return done;
}

// Lists the optimized project screenshots that exist right now.
export function listProjectImages() {
  if (!existsSync(outDir)) return [];
  return readdirSync(outDir).filter((f) => f.endsWith(".webp"));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const done = await optimizeImages();
  if (done.length === 0) console.log("[images] nothing to optimize — put .png/.jpg files in public/ first.");
}
