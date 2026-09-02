// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // CAMBIAR por el dominio definitivo cuando lo tengas (también en src/site.config.ts)
  site: 'https://otero-de-sanabria.pages.dev',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
