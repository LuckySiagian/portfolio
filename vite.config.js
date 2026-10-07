import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Place the CV at public/cv-lewi-lucky-siagian.pdf. The "Download CV" buttons
// only render when this file exists, so a missing CV never becomes a broken link.
const resumePath = fileURLToPath(new URL("./public/cv-lewi-lucky-siagian.pdf", import.meta.url));
const hasResume = existsSync(resumePath);

if (!hasResume) {
  console.warn("[portfolio] public/cv-lewi-lucky-siagian.pdf not found — CV buttons are hidden.");
}

// Vite configuration.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __HAS_RESUME__: JSON.stringify(hasResume),
  },
  server: {
    port: 3000,
    open: true,
    strictPort: false,
  },
});
