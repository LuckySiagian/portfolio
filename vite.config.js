import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { optimizeImages, listProjectImages } from "./scripts/optimize-images.mjs";

export default defineConfig(async () => {
  // Shrink any screenshots dropped into public/ (spmt.png, "lucky mart.png", ...).
  await optimizeImages();

  // Place the CV at public/cv-lewi-lucky-siagian.pdf. The "Download CV" buttons
  // only render when this file exists, so a missing CV never becomes a broken link.
  const resumePath = fileURLToPath(new URL("./public/cv-lewi-lucky-siagian.pdf", import.meta.url));
  const hasResume = existsSync(resumePath);
  if (!hasResume) {
    console.warn("[portfolio] public/cv-lewi-lucky-siagian.pdf not found — CV buttons are hidden.");
  }

  // Project screenshots are only shown when their file exists (no broken images).
  const projectImages = listProjectImages();

  return {
    plugins: [react(), tailwindcss()],
    define: {
      __HAS_RESUME__: JSON.stringify(hasResume),
      __PROJECT_IMAGES__: JSON.stringify(projectImages),
    },
    server: {
      port: 3000,
      open: true,
      strictPort: false,
    },
  };
});
