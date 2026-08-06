import type { ToolContent } from './types';

// Español. Transcreación basada en el vocabulario que usan los conversores de código
// de color en español, no traducción literal. Sin palabras publicitarias (fácil /
// rápido / perfecto…); la privacidad se explica de forma estructural, no como promesa.
// Español pan-regional (España y Latinoamérica), registro «tú». htmlLang 'es'.

export const es: ToolContent = {
  htmlLang: 'es',

  meta: {
    title: 'Convertir color — HEX, RGB, HSL en tu navegador, sin subir nada | runlocally',
    description:
      'Convierte colores entre HEX, RGB y HSL al instante: escribe en cualquiera de los tres campos y los otros dos se actualizan de inmediato, con una vista previa del color. Funciona por completo en tu navegador. No se sube nada.',
    ogTitle: 'Convertir color — HEX ↔ RGB ↔ HSL en tu navegador',
    ogDescription:
      'Escribe un valor HEX, RGB o HSL y observa cómo los otros dos formatos y una vista previa del color se actualizan al instante, en tu navegador.',
  },

  hero: {
    h1: 'Convertir color',
    tagline: 'HEX, RGB y HSL se mantienen sincronizados mientras escribes, con vista previa del color. Nada sale de tu navegador.',
  },

  intro: {
    h2: 'HEX, RGB y HSL, convertidos al instante en tu navegador',
    paras: [
      'Escribe un color en el campo HEX, RGB o HSL y los otros dos se actualizan de inmediato, junto con una muestra del color actual. Útil para trabajar con CSS, para pasar valores de color a un diseño, o simplemente para ver cómo se ve realmente un código de color.',
      'La conversión está escrita a mano con las fórmulas estándar de sRGB↔HSL (las mismas que usan los navegadores internamente para hsl() y rgb()) — sin librerías externas, sin nada que descargar ni subir.',
    ],
  },

  privacy: {
    h2: 'Por qué lo que escribes no sale de tu dispositivo',
    lead: 'Aquí la privacidad es estructural, no una promesa. No hay un paso de subida porque no hay ningún servidor al que subir nada:',
    points: [
      'La conversión se ejecuta por completo en tu navegador.',
      'La página se sirve como archivos estáticos y no envía ninguna petición con los valores de color que escribes.',
      'El código es abierto y cualquiera puede leerlo (MIT).',
      'Funciona sin conexión, algo que solo es posible porque nada sale del dispositivo.',
    ],
    note: 'Si quieres comprobarlo tú mismo, abre el panel de Red de tu navegador mientras conviertes: ninguna petición lleva lo que escribes.',
    sourceLinkText: 'Leer el código fuente.',
  },

  howto: {
    h2: 'Cómo se usa',
    steps: [
      {
        h3: 'Escribe un color en cualquiera de los campos',
        p: 'Introduce un código HEX (#fff o #ffffff), un valor RGB (rgb(255,0,0) o 255,0,0), o un valor HSL (hsl(0,100%,50%) o 0,100%,50%).',
      },
      {
        h3: 'Observa cómo se actualizan los otros dos',
        p: 'Los dos campos en los que no escribiste se actualizan al instante con el color equivalente, y la vista previa cambia para coincidir.',
      },
      {
        h3: 'Los errores solo aparecen en ese campo',
        p: 'Si lo que escribiste no es un color válido en ese formato, solo ese campo muestra un error en línea — los otros dos conservan sus últimos valores válidos, así que nunca pierdes tu progreso.',
      },
    ],
  },

  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Se sube a algún sitio lo que escribo?',
      a: 'No. La conversión se ejecuta por completo en tu navegador. No hay ningún componente de servidor, así que los valores de color que escribes no tienen forma de salir del dispositivo. El código es abierto y puedes confirmarlo en el panel de Red de tu navegador.',
    },
    {
      q: '¿Qué formatos de HEX, RGB y HSL se aceptan?',
      a: 'HEX acepta #fff o #ffffff (la # inicial es opcional, sin distinguir mayúsculas/minúsculas). RGB acepta rgb(r,g,b) o un simple r,g,b, cada canal de 0 a 255. HSL acepta hsl(h,s%,l%) o valores sueltos, matiz de 0 a 360 y saturación/luminosidad de 0 a 100.',
    },
    {
      q: '¿Es compatible con CMYK, HSB/HSV o los colores con nombre de CSS (por ejemplo, "tomato")?',
      a: 'No: esta herramienta se limita intencionadamente a HEX, RGB y HSL. CMYK y HSB/HSV son modelos de color distintos con sus propias reglas, y los colores con nombre de CSS son una tabla fija, no una conversión; nada de eso forma parte de esta herramienta.',
    },
    {
      q: '¿Puedo elegir un color de una imagen?',
      a: 'No con esta herramienta: elegir un color de una imagen (un cuentagotas) es una herramienta aparte. Esta solo convierte entre los códigos de color que tú escribes.',
    },
    {
      q: '¿Qué pasa si escribo un valor no válido?',
      a: 'Solo el campo que estás editando muestra un error en línea. Los otros dos campos —y la vista previa— siguen mostrando el último color válido, así que un error de escritura nunca borra tu trabajo.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Sí. Es una PWA. Tras la primera visita queda guardada en la caché, de modo que funciona sin conexión a la red. También puedes instalarla en tu pantalla de inicio.',
    },
  ],

  footer: {
    openSourceLabel: 'Código abierto (MIT)',
    partOf: 'parte de',
    brandTail: '— pequeñas herramientas que funcionan localmente en tu dispositivo.',
    colophon:
      'Creado y mantenido por Geppetto. Parte del código se escribe con ayuda de IA; la revisión y las decisiones son del responsable del proyecto.',
    securityText: 'Seguridad',
  },

  related: {
    h2: 'Herramientas relacionadas',
    blogLinkText: 'Leer las notas técnicas',
  },
};
