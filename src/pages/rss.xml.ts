import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../site.config';

export async function GET(context: APIContext) {
  const noticias = (await getCollection('noticias')).sort(
    (a, b) => b.data.fecha.getTime() - a.data.fecha.getTime(),
  );
  return rss({
    title: `Novedades de ${site.nombre}`,
    description: site.descripcion,
    site: context.site ?? site.url,
    items: noticias.map((n) => ({
      title: n.data.titulo,
      pubDate: n.data.fecha,
      description: n.data.resumen,
      link: `/novedades/${n.id}/`,
    })),
    customData: `<language>es-es</language>`,
  });
}
