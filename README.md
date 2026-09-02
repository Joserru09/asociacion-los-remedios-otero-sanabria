# Web de la AC Los Remedios (Otero de Sanabria)

Sitio estático hecho con [Astro](https://astro.build). Sin servidor, sin base de datos: el contenido son
ficheros Markdown en el repositorio y cada `push` a `main` publica la web.

- Noticias: `src/content/noticias/*.md`
- Tienda: `src/content/productos/*.md`
- Galería: `src/assets/galeria/` + `src/data/galeria.ts`
- Actividades y programa de fiestas: `src/pages/actividades.astro` y `src/pages/fiestas.astro`
- Datos de la asociación, contacto, redes y pagos: `src/site.config.ts`

## El diseño

Papel de pergamino, verde de los prados y terracota de las tejas. Titulares en Cormorant Garamond,
texto en Instrument Sans y las frases escritas a mano en Parisienne; las tres autoalojadas.
Los dibujos a línea (el pueblo dentro del arco, las ramitas, la iglesia y el mapa) son SVG hechos
a mano en `src/components/`: `Marca.astro`, `Adorno.astro`, `Mapa.astro` e `Icono.astro`.

Los colores y la escala tipográfica están en `src/styles/global.css`. Toda la paleta pasa el nivel
AA de contraste; si cambias un color, compruébalo antes de subirlo.

## Puesta en marcha en local

Necesitas Node 22 o superior (`.node-version` fija la versión para Cloudflare y para `nvm`).

```bash
npm install
npm run dev        # http://localhost:4321 con recarga en caliente
npm run build      # genera dist/ (lo que se publica)
npm run preview    # sirve dist/ para comprobarlo
npx astro check    # comprobación de tipos y errores en .astro
```

## Publicar una noticia

1. Crea `src/content/noticias/nombre-corto.md`. El nombre del fichero será la URL:
   `sardinada-2026.md` → `/noticias/sardinada-2026/`.
2. Rellena la cabecera y escribe el texto en Markdown debajo:

   ```markdown
   ---
   titulo: 'Sardinada en la plaza'
   fecha: 2026-08-14
   resumen: 'Viernes a las 21:30. Trae tu plato y tu vaso.'
   imagen: '../../assets/noticias/sardinada.jpg'   # opcional
   destacada: true                                  # opcional: la sube al primer puesto de la portada
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
en `src/data/galeria.ts` con el pie de foto. Las seis primeras aparecen también en la portada. Al pulsar una se abre a pantalla completa, sin JavaScript.

## Antes de publicar: qué cambiar

Busca `CAMBIAR` en el proyecto (`grep -rn CAMBIAR src astro.config.mjs public`):

- `src/site.config.ts`: email, teléfono, redes, canal de WhatsApp, Bizum, IBAN, cuota de socio,
  enlaces de Stripe y la URL de la web.
- `src/pages/asociacion.astro`: los nombres de la junta, el texto de «Quiénes somos» y los hitos.
- `src/pages/actividades.astro`: el calendario de actividades del año.
- `src/pages/fiestas.astro`: el programa de las fiestas y el año.
- `src/pages/aviso-legal.astro` y `src/pages/privacidad.astro`: el NIF y el número de registro de la
  asociación. **Léelos enteros antes de publicar**: son una base razonable para una asociación pequeña,
  pero conviene que los revise alguien que entienda. No son asesoramiento legal.
- `astro.config.mjs` y `public/robots.txt`: la URL definitiva cuando tengas dominio.
- Sustituye las imágenes de ejemplo en `src/assets/` por fotos reales (mismo nombre de fichero o
  actualiza las rutas). La más importante es `src/assets/hero.jpg`: es la foto grande de la portada.
- `public/og.png`: la imagen que sale al compartir la web en WhatsApp. La actual se generó con el
  emblema y la tipografía de la web; si quieres una foto del pueblo de fondo, sustitúyela (1200×630).

Las redes y el canal de WhatsApp con `CAMBIAR` o vacíos no se muestran en la web publicada, y con
ellos desaparece la franja de «Redes sociales / WhatsApp comunidad» de la portada. En `npm run dev`
se ven todos para poder revisar el diseño.

## Pagos con Stripe

La web no procesa pagos. Cada botón de compra o donación enlaza a un *Payment Link* de Stripe, que se
encarga del cobro, la dirección de envío y el recibo.

1. Crea una cuenta en [stripe.com](https://stripe.com) a nombre de la asociación.
2. En `Catálogo de productos` crea cada producto con su precio.
3. En `Payment Links` crea un enlace por producto. Para las prendas, añade un campo personalizado de tipo
   desplegable llamado «Talla» y activa «Recoger dirección de envío».
4. Para donaciones, crea un enlace con «El cliente elige el precio».
5. Para la cuota de socio, un enlace de pago único (o una suscripción anual si preferís que se renueve sola).
6. Opcional: si la asociación tiene PayPal, pon el enlace PayPal.Me en `pagos.paypal` y aparecerá como forma de
   donar. Si queda vacío, la opción no se muestra.
7. Pega cada URL en el fichero correspondiente (`enlaceCompra` de cada producto, `pagos.*` en `site.config.ts`).

Los pedidos llegan al panel de Stripe (y por correo si lo activas). El stock se sigue controlando a mano.

## Despliegue en Cloudflare Workers

El proyecto se despliega como *Worker de solo assets*: no hay código de servidor, Cloudflare sirve
directamente los ficheros de `dist/`. La configuración está en `wrangler.jsonc`.

### Desde el panel de Cloudflare (recomendado)

1. Sube el repositorio a GitHub.
2. En [dash.cloudflare.com](https://dash.cloudflare.com) → `Compute (Workers)` → `Create` → pestaña
   `Import a repository` → elige el repositorio.
3. Rellena:
   - **Build command**: `npm run build`
   - **Deploy command**: `npx wrangler deploy`
   - **Root directory**: `/` (o la subcarpeta donde esté `package.json`)
   - Variable de entorno `NODE_VERSION` = `22`
4. Deja activado el token que crea Cloudflare automáticamente y despliega.

A partir de ahí, cada `push` a `main` construye y publica. Si activas los builds de ramas no productivas,
cada rama o pull request genera además una URL de vista previa.

### Desde tu ordenador

```bash
npm run deploy       # construye y despliega con Wrangler
```

La primera vez Wrangler abrirá el navegador para iniciar sesión en Cloudflare.

### Dominio propio

Cuando compres el dominio: en el Worker, `Settings` → `Domains & Routes` → `Add custom domain`. Si el DNS
lo lleva Cloudflare, lo configura solo. Después cambia la URL en `src/site.config.ts`, `astro.config.mjs`
y `public/robots.txt`.

## Estructura

```
src/
  site.config.ts        Datos de la asociación, contacto, redes, pagos y menús
  content.config.ts     Esquema (campos obligatorios) de noticias y productos
  content/
    noticias/           Una noticia por fichero .md
    productos/          Un producto por fichero .md
  data/galeria.ts       Lista de fotos y pies de foto
  assets/               Imágenes que Astro optimiza (hero, galería, tienda, noticias)
  layouts/Base.astro    Plantilla común: <head>, datos estructurados, cabecera y pie
  components/
    Marca.astro         El emblema del pueblo y el nombre
    Adorno.astro        Ramitas, filete con corazón y la iglesia de fondo
    Icono.astro         Todos los iconos de línea
    Mapa.astro          La silueta de la provincia con Otero marcado
    Header · Footer · TituloSeccion · NoticiaCard · ProductoCard · PanelSocio · Redes · Portada
  pages/                Una ruta por fichero
  styles/global.css     Paleta, tipografía y estilos base
public/                 Ficheros que se copian tal cual (favicon, robots.txt, og.png, _headers)
wrangler.jsonc          Configuración de despliegue en Cloudflare Workers
.github/workflows/      CI: comprueba que la web construye en cada PR
```

## Decisiones

- **Sin frameworks de CSS y casi sin JavaScript.** El menú móvil, el desplegable de «La asociación» y
  el visor de la galería funcionan solo con CSS. Lo único que carga JavaScript es el botón de copiar el
  Bizum y el IBAN de `/donaciones/`, y si no se ejecuta, el botón ni siquiera aparece.
- **Fuentes autoalojadas** (Cormorant Garamond, Instrument Sans y Parisienne), solo con el subconjunto
  latino: no se hacen peticiones a Google Fonts y la web no necesita aviso de cookies.
- **Un solo juego de puntos de corte.** Las rejillas usan `repeat(auto-fit, minmax(...))` en vez de
  `@media` por página, así que se adaptan solas y no hay anchos en los que la web se descoloque.
- **Imágenes optimizadas en build** con `astro:assets`: sube JPG normales y Astro genera WebP redimensionados.
- **`trailingSlash: 'always'`**: todas las URL terminan en `/`, como las genera Cloudflare Pages, para evitar
  redirecciones y duplicados en buscadores.
