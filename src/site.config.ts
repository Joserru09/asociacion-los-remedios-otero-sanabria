/**
 * Configuración central de la web.
 *
 * Todo lo que tenga que ver con datos de la asociación (contacto, redes, pagos)
 * se cambia aquí y no en las páginas. Busca "CAMBIAR" para ver lo pendiente.
 */

export const site = {
  nombre: 'AC Los Remedios',
  nombreLargo: 'Asociación Cultural Los Remedios',
  pueblo: 'Otero de Sanabria',
  comarca: 'Sanabria, Zamora',
  lema: 'Cultura, tradición y comunidad para mantener viva nuestra tierra.',
  frase: 'Pequeño pueblo, grandes raíces, mejor futuro.',
  descripcion:
    'La asociación cultural de Otero de Sanabria. Fiestas, actividades, noticias del pueblo y la tienda solidaria.',
  // CAMBIAR cuando tengas el dominio. Mientras tanto, la URL de Cloudflare.
  url: 'https://otero-de-sanabria.pages.dev',
  idioma: 'es',
  email: 'ac.losremedios@gmail.com', // CAMBIAR
  telefono: '666666666', // CAMBIAR
  telefonoEnlace: '+666666666', // CAMBIAR
  direccion: 'Otero de Sanabria',
  codigoPostal: '49369',
  provincia: 'Zamora',
  // Año en que se fundó la asociación, para el pie de página. CAMBIAR
  fundacion: 1998,
};

export const redes = {
  // Deja en cadena vacía las que no tengáis: no se mostrarán.
  facebook: 'https://facebook.com/CAMBIAR',
  instagram: 'https://www.instagram.com/ac.losremedios?igsi=MTg4ODd1MmZra3l4Zw==',
  youtube: 'https://youtube.com/@CAMBIAR',
  tiktok: 'https://tiktok.com/@CAMBIAR',
};

/** Canal de difusión de WhatsApp: es el aviso rápido del pueblo, va aparte de las redes. */
export const whatsapp = 'https://whatsapp.com/channel/0029VagnNvUAu3aPsNSzJY3R'; 

/**
 * Pagos. La web no procesa dinero: enlaza a Stripe Payment Links y muestra los datos de Bizum e IBAN.
 * Crea los enlaces en https://dashboard.stripe.com/payment-links y pégalos aquí.
 */
export const pagos = {
  // Payment Link de donación con importe libre. CAMBIAR
  donacionStripe: 'https://buy.stripe.com/CAMBIAR_DONACION',
  // Payment Link de la cuota de socio (recurrente anual o pago único). CAMBIAR
  cuotaSocioStripe: 'https://buy.stripe.com/CAMBIAR_SOCIO',
  cuotaSocioEuros: 10, // CAMBIAR
  // Enlace PayPal.Me para quien prefiera PayPal (p. ej. 'https://paypal.me/aclosremedios').
  // Déjalo vacío y no se mostrará la opción.
  paypal: '',
  bizum: '648 123 456', // CAMBIAR: número de Bizum de la asociación
  iban: 'ES00 0000 0000 0000 0000 0000', // CAMBIAR
  titular: 'Asociación Cultural Los Remedios',
  // Formulario de alta de socio (Google Forms u otro). Déjalo vacío si prefieres solo email.
  formularioSocio: '',
};

export type ItemMenu = {
  href: string;
  label: string;
  /** Submenú desplegable. Solo lo usa «La asociación». */
  hijos?: { href: string; label: string }[];
};

/** Menú principal. El orden aquí es el orden en pantalla. */
export const menu: ItemMenu[] = [
  { href: '/', label: 'Inicio' },
  {
    href: '/asociacion/',
    label: 'La asociación',
    hijos: [
      { href: '/asociacion/', label: 'Quiénes somos' },
      { href: '/tienda/', label: 'Tienda solidaria' },
      { href: '/donaciones/', label: 'Colabora' },
    ],
  },
  { href: '/actividades/', label: 'Actividades' },
  { href: '/fiestas/', label: 'Fiestas' },
  { href: '/noticias/', label: 'Noticias' },
  { href: '/galeria/', label: 'Galería' },
  { href: '/contacto/', label: 'Contacto' },
];

/** Enlaces del pie, más cortos que el menú principal. */
export const menuPie = [
  { href: '/asociacion/', label: 'La asociación' },
  { href: '/actividades/', label: 'Actividades' },
  { href: '/fiestas/', label: 'Fiestas' },
  { href: '/noticias/', label: 'Noticias' },
  { href: '/galeria/', label: 'Galería' },
  { href: '/contacto/', label: 'Contacto' },
];

export const menuLegal = [
  { href: '/aviso-legal/', label: 'Aviso legal' },
  { href: '/privacidad/', label: 'Política de privacidad' },
];

/** Redes que se muestran: las no vacías y, en producción, solo las ya configuradas (sin "CAMBIAR"). */
const configurado = (url: string) => url !== '' && (import.meta.env.DEV || !url.includes('CAMBIAR'));

export const redesActivas = () => Object.entries(redes).filter(([, url]) => configurado(url));

export const whatsappActivo = () => (configurado(whatsapp) ? whatsapp : '');
