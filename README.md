# Web de la AC Los Remedios (Otero de Sanabria)

Sitio estático hecho con [Astro](https://astro.build). Sin servidor, sin base de datos: el contenido son
ficheros Markdown en el repositorio y cada `push` a `main` publica la web.

- Novedades: `src/content/noticias/*.md`
- Tienda: `src/content/productos/*.md`
- Galería: `src/assets/galeria/` + `src/data/galeria.ts`
- Datos de la asociación, redes y pagos: `src/site.config.ts`

## Puesta en marcha en local

Necesitas Node 22 o superior (`.node-version` fija la versión para Cloudflare y para `nvm`).

```bash
npm install
npm run dev        # http://localhost:4321 con recarga en caliente
npm run build      # genera dist/ (lo que se publica)
npm run preview    # sirve dist/ para comprobarlo
npx astro check    # comprobación de tipos y errores en .astro
```

## Publicar una novedad

1. Crea `src/content/noticias/nombre-corto.md`. El nombre del fichero será la URL:
   `sardinada-2026.md` → `/novedades/sardinada-2026/`.
2. Rellena la cabecera y escribe el texto en Markdown debajo:

   ```markdown
   ---
   titulo: 'Sardinada en la plaza'
   fecha: 2026-08-14
   resumen: 'Viernes a las 21:30. Trae tu plato y tu vaso.'
   imagen: '../../assets/noticias/sardinada.jpg'   # opcional
   destacada: true                                  # opcional: la fija arriba y en la portada
   ---

   Texto de la noticia en **Markdown**. Puedes usar listas, títulos (`##`) y enlaces.
   ```

3. Si lleva foto, cópiala en `src/assets/noticias/`. Astro la comprime y la sirve en WebP.
4. `git add . && git commit -m "Sardinada 2026" && git push`. En uno o dos minutos está publicada.

Desde el móvil: en GitHub, `Add file → Create new file` dentro de `src/content/noticias/` hace lo mismo.

## Añadir o cambiar un producto

Un fichero por producto en `src/content/productos/`:

```markdown
---
nombre: 'Camiseta Otero de Sanabria'
precio: 15
imagen: '../../assets/tienda/camiseta.jpg'
enlaceCompra: 'https://buy.stripe.com/xxxxx'
tallas: ['S', 'M', 'L', 'XL']   # opcional
agotado: false                 # true lo muestra en gris sin botón
orden: 1                       # menor = antes
---

Descripción del producto.
```

## Galería

Copia las fotos en `src/assets/galeria/` (JPG, 1200–2000 px de ancho está bien) y añade una línea por foto
en `src/data/galeria.ts` con el pie de foto. Las cuatro primeras aparecen también en la portada.

## Antes de publicar: qué cambiar

Busca `CAMBIAR` en el proyecto (`grep -rn CAMBIAR src astro.config.mjs public`):

- `src/site.config.ts`: email, redes, Bizum, IBAN, cuota de socio, enlaces de Stripe, URL de la web.
- `src/pages/asociacion.astro`: nombres de la junta y el texto de «Quiénes somos».
- `astro.config.mjs` y `public/robots.txt`: la URL definitiva cuando tengas dominio.
- Sustituye las imágenes de ejemplo en `src/assets/` por fotos reales (mismo nombre de fichero o actualiza las rutas).
- `public/og.png`: la imagen que sale al compartir la web en WhatsApp. Idealmente 1200×630 con una foto del pueblo.

Las redes con `CAMBIAR` o vacías no se muestran en la web publicada; en `npm run dev` se ven todas para revisar el diseño.

## Pagos con Stripe

La web no procesa pagos. Cada botón de compra o donación enlaza a un *Payment Link* de Stripe, que se
encarga del cobro, la dirección de envío y el recibo.

1. Crea una cuenta en [stripe.com](https://stripe.com) a nombre de la asociación.
2. En `Catálogo de productos` crea cada producto con su precio.
3. En `Payment Links` crea un enlace por producto. Para las prendas, añade un campo personalizado de tipo
   desplegable llamado «Talla» y activa «Recoger dirección de envío».
4. Para donaciones, crea un enlace con «El cliente elige el precio».
5. Para la cuota de socio, un enlace de pago único (o una suscripción anual si preferís que se renueve sola).
6. Pega cada URL en el fichero correspondiente (`enlaceCompra` de cada producto, `pagos.*` en `site.config.ts`).

Los pedidos llegan al panel de Stripe (y por correo si lo activas). El stock se sigue controlando a mano.

## Despliegue en Cloudflare Pages

1. Sube este repositorio a GitHub.
2. En [dash.cloudflare.com](https://dash.cloudflare.com) → `Workers & Pages` → `Create` → `Pages` → `Connect to Git`.
3. Elige el repositorio y configura:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Variable de entorno `NODE_VERSION` = `22` (Cloudflare también lee `.node-version`).
4. `Save and Deploy`. Tendrás la web en `https://<nombre>.pages.dev` y a partir de ahí cada push a `main` despliega solo;
   cada pull request genera una URL de vista previa.

### Dominio propio

Cuando compres el dominio: en el proyecto de Pages, `Custom domains` → `Set up a custom domain`. Si el DNS
lo lleva Cloudflare, lo configura solo; si no, te dirá qué registro CNAME crear. Después cambia la URL en
`src/site.config.ts`, `astro.config.mjs` y `public/robots.txt`.

## Estructura

```
src/
  site.config.ts        Datos de la asociación, redes, pagos y menú
  content.config.ts     Esquema (campos obligatorios) de noticias y productos
  content/
    noticias/           Una noticia por fichero .md
    productos/          Un producto por fichero .md
  data/galeria.ts       Lista de fotos y pies de foto
  assets/               Imágenes que Astro optimiza (hero, galería, tienda, noticias)
  layouts/Base.astro    Plantilla común: <head>, cabecera, pie
  components/           Cabecera, pie, banderines, redes, tarjeta de producto, entrada del tablón
  pages/                Una ruta por fichero
  styles/global.css     Paleta, tipografía y estilos base
public/                 Ficheros que se copian tal cual (favicon, robots.txt, og.png, _headers)
.github/workflows/      CI: comprueba que la web construye en cada PR
```

## Decisiones

- **Sin frameworks de CSS ni JavaScript en el cliente.** El único JS que carga el navegador es cero; el menú
  móvil funciona con CSS. Menos dependencias que mantener.
- **Fuente autoalojada** (`@fontsource-variable/bricolage-grotesque`): no se hacen peticiones a Google Fonts.
- **Imágenes optimizadas en build** con `astro:assets`: sube JPG normales y Astro genera WebP redimensionados.
- **`trailingSlash: 'always'`**: todas las URL terminan en `/`, como las genera Cloudflare Pages, para evitar
  redirecciones y duplicados en buscadores.
