import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Novedades del tablón. Un fichero Markdown por noticia en src/content/noticias/.
 * El nombre del fichero es la URL: fiestas-2026.md -> /novedades/fiestas-2026/
 */
const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      fecha: z.coerce.date(),
      resumen: z.string().max(220),
      // Ruta relativa al fichero .md, p. ej. ../../assets/noticias/fiestas-2026.jpg
      imagen: image().optional(),
      // Fija la noticia arriba del tablón y en la portada
      destacada: z.boolean().default(false),
    }),
});

/**
 * Productos de la tienda. Un fichero Markdown por producto en src/content/productos/.
 * El cuerpo del Markdown es la descripción larga.
 */
const productos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/productos' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      precio: z.number(),
      imagen: image(),
      // Payment Link de Stripe para este producto (con el campo "talla" si aplica)
      enlaceCompra: z.string().url(),
      tallas: z.array(z.string()).optional(),
      agotado: z.boolean().default(false),
      orden: z.number().default(99),
    }),
});

export const collections = { noticias, productos };
