/**
 * Configuración central de la web.
 *
 * Todo lo que tenga que ver con datos de la asociación (redes, pagos, contacto)
 * se cambia aquí y no en las páginas. Busca "CAMBIAR" para ver lo pendiente.
 */

export const site = {
  nombre: 'AC Los Remedios',
  nombreLargo: 'Asociación Cultural Los Remedios',
  pueblo: 'Otero de Sanabria',
  comarca: 'Sanabria, Zamora',
  descripcion:
    'La asociación cultural de Otero de Sanabria. Fiestas, actividades, novedades del pueblo y la tienda de camisetas y sudaderas.',
  // CAMBIAR cuando tengas el dominio. Mientras tanto, la URL de Cloudflare Pages.
  url: 'https://otero-de-sanabria.pages.dev',
  idioma: 'es',
  email: 'aclosremedios@example.com', // CAMBIAR
  // Año en que se fundó la asociación, para el pie de página. CAMBIAR
  fundacion: 1998,
};

export const redes = {
  // Deja en cadena vacía las que no tengáis: no se mostrarán.
  instagram: 'https://instagram.com/CAMBIAR',
  facebook: 'https://facebook.com/CAMBIAR',
  whatsapp: 'https://whatsapp.com/channel/CAMBIAR', // enlace al canal de difusión
  youtube: '',
  tiktok: '',
};

/**
 * Pagos. La web no procesa dinero: enlaza a Stripe Payment Links y muestra los datos de Bizum e IBAN.
 * Crea los enlaces en https://dashboard.stripe.com/payment-links y pégalos aquí.
 */
export const pagos = {
  // Payment Link de donación con importe libre. CAMBIAR
  donacionStripe: 'https://buy.stripe.com/CAMBIAR_DONACION',
  // Payment Link de la cuota de socio (recurrente anual o pago único). CAMBIAR
  cuotaSocioStripe: 'https://buy.stripe.com/CAMBIAR_SOCIO',
  cuotaSocioEuros: 20, // CAMBIAR
  // Enlace PayPal.Me para quien prefiera PayPal (p. ej. 'https://paypal.me/aclosremedios').
  // Déjalo vacío y no se mostrará la opción.
  paypal: '',
  bizum: '6XX XXX XXX', // CAMBIAR: número de Bizum de la asociación
  iban: 'ES00 0000 0000 0000 0000 0000', // CAMBIAR
  titular: 'Asociación Cultural Los Remedios',
  // Formulario de alta de socio (Google Forms u otro). Déjalo vacío si prefieres solo email.
  formularioSocio: '',
};

/** Menú principal. El orden aquí es el orden en pantalla. */
export const menu = [
  { href: '/novedades/', label: 'Novedades' },
  { href: '/tienda/', label: 'Tienda' },
  { href: '/galeria/', label: 'Galería' },
  { href: '/asociacion/', label: 'La asociación' },
  { href: '/socios/', label: 'Hazte socio' },
];

/** Redes que se muestran en la web: las no vacías y, en producción, solo las ya configuradas (sin "CAMBIAR"). */
export const redesActivas = () =>
  Object.entries(redes).filter(([, url]) => url !== '' && (import.meta.env.DEV || !url.includes('CAMBIAR')));
