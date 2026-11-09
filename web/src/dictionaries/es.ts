import type { Dict } from "./en";

export const es: Dict = {
  meta: {
    title: "Rootwell Health — Bienestar desde la raíz, en línea, en todo el mundo",
    description:
      "Programas, coaching y comunidad inspirados en la medicina funcional, accesibles y en línea. Únete desde cualquier parte del mundo.",
  },
  nav: { programs: "Programas", pricing: "Precios", how: "Cómo funciona", faq: "Preguntas", join: "Únete a la lista" },
  hero: {
    eyebrow: "100% en línea · Disponible en todo el mundo",
    title: "Llega a la raíz de cómo te sientes, sin pagar una consulta de $400.",
    subtitle:
      "Programas grupales, coaching y educación basados en los principios de la medicina funcional. Precios justos según dónde vives.",
    ctaPrimary: "Ver programas",
    ctaSecondary: "Ver precios de membresía",
    pricedFor: "Precios mostrados para",
  },
  how: {
    title: "Atención que aumenta solo cuando la necesitas",
    subtitle:
      "La mayoría empieza con educación y coaching. La atención clínica se añade solo si hace falta: así mantenemos los costos bajos.",
    steps: [
      { title: "1. Aprende", body: "Lecciones a tu ritmo y una comunidad de apoyo sobre nutrición, sueño, estrés y movimiento." },
      { title: "2. Únete a un programa grupal", body: "Sesiones en vivo en grupos pequeños, guiadas por profesionales certificados. Un experto, muchas personas, una fracción del costo." },
      { title: "3. Recibe coaching 1:1", body: "Coaching asíncrono: comparte tus registros de comida y preguntas cuando quieras y recibe orientación por escrito en 48 horas." },
      { title: "4. Atención clínica (próximamente)", body: "Análisis y consultas con profesionales con licencia, disponibles región por región donde nuestro equipo esté autorizado." },
    ],
  },
  programs: {
    title: "Programas grupales",
    subtitle: "Programas en vivo, estructurados y en línea. Pago único.",
    weeks: "semanas",
    learnMore: "Más información",
    buy: "Inscribirme",
    includes: "Qué incluye",
    items: {
      "gut-reset": {
        name: "Reinicio Intestinal",
        weeks: 8,
        summary: "Un programa de 8 semanas de eliminación y reintroducción para identificar alimentos desencadenantes y reconstruir la salud digestiva.",
        bullets: [
          "8 sesiones grupales semanales en vivo (grabadas)",
          "Plan guiado de eliminación y reintroducción",
          "Planes de comidas y listas de compras",
          "Registro de síntomas y seguimiento",
        ],
      },
      "metabolic-balance": {
        name: "Equilibrio Metabólico",
        weeks: 12,
        summary: "Un programa de 12 semanas centrado en el equilibrio del azúcar en sangre, la energía y hábitos sostenibles.",
        bullets: [
          "12 sesiones grupales semanales en vivo (grabadas)",
          "Guía de alimentación para el azúcar en sangre",
          "Protocolos de movimiento y sueño",
          "Orientación opcional sobre monitores continuos de glucosa",
        ],
      },
      "energy-foundations": {
        name: "Bases de Energía y Hormonas",
        weeks: 6,
        summary: "Una introducción de 6 semanas a los hábitos que influyen en la fatiga, el estrés y el equilibrio hormonal.",
        bullets: [
          "6 sesiones grupales semanales en vivo (grabadas)",
          "Herramientas para el estrés y el ritmo circadiano",
          "Bases de nutrición para la salud hormonal",
          "Acceso a la comunidad privada durante el programa",
        ],
      },
    },
  },
  pricing: {
    title: "Membresía",
    subtitle: "Cancela cuando quieras. Los precios se ajustan a tu país para que la misma atención sea justa en todas partes.",
    perMonth: "/mes",
    currency: "Moneda",
    regional: "Precio regional aplicado para",
    subscribe: "Empezar membresía",
    waitlist: "Unirme a la lista",
    popular: "Más popular",
    comingSoon: "Próximamente",
    plans: {
      community: {
        name: "Comunidad",
        description: "Aprende las bases a tu propio ritmo.",
        features: ["Biblioteca completa de lecciones", "Sesión mensual de preguntas en vivo", "Comunidad de miembros", "Recetas y planes de comidas"],
      },
      coaching: {
        name: "Coaching",
        description: "Orientación personal de un coach de salud certificado.",
        features: [
          "Todo lo de Comunidad",
          "Coaching 1:1 asíncrono (respuesta en 48 h)",
          "Revisión mensual de hábitos",
          "20% de descuento en programas grupales",
        ],
      },
      clinical: {
        name: "Clínica",
        description: "Atención de profesionales con licencia, disponible región por región.",
        features: [
          "Todo lo de Coaching",
          "Consultas con un profesional con licencia",
          "Solicitud y revisión de análisis (donde esté disponible)",
          "Protocolos personalizados",
        ],
      },
    },
  },
  waitlist: {
    title: "Únete a la lista de espera",
    subtitle: "Entérate primero cuando la atención clínica llegue a tu región y obtén precios de miembro fundador.",
    email: "Correo electrónico",
    name: "Nombre (opcional)",
    interest: "Me interesa más",
    interests: { programs: "Programas grupales", coaching: "Coaching", clinical: "Atención clínica" },
    consent: "Acepto recibir correos de Rootwell Health. Puedo darme de baja en cualquier momento.",
    submit: "Unirme",
    sending: "Enviando…",
    success: "¡Ya estás en la lista! Te contactaremos pronto.",
    error: "Algo salió mal. Inténtalo de nuevo.",
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿Esto es atención médica?",
        a: "Nuestros programas, coaching y comunidad son educativos y no sustituyen la atención médica. Los servicios clínicos solo se ofrecerán donde nuestros profesionales tengan licencia para ejercer.",
      },
      {
        q: "¿Por qué el precio es distinto en mi país?",
        a: "Usamos precios regionales para que los mismos programas sean accesibles en todo el mundo. El precio se ajusta automáticamente según tu ubicación.",
      },
      {
        q: "¿Puedo unirme desde cualquier lugar?",
        a: "Sí. Todo es en línea y las sesiones grupales se graban para que las veas en tu zona horaria.",
      },
      {
        q: "¿Puedo cancelar mi membresía?",
        a: "Sí, en cualquier momento desde tu cuenta. Mantienes el acceso hasta el final del periodo pagado.",
      },
    ],
  },
  checkout: {
    error: "No se pudo iniciar el pago. Inténtalo de nuevo.",
    loading: "Redirigiendo…",
    successTitle: "¡Bienvenido a Rootwell!",
    successBody: "Tu pago se realizó con éxito. Revisa tu correo para los próximos pasos y tus datos de acceso.",
    demoNotice: "Modo demo: no se realizó ningún cobro porque Stripe aún no está configurado.",
    backHome: "Volver al inicio",
  },
  footer: {
    disclaimer:
      "Rootwell Health ofrece educación y coaching. El contenido de este sitio no es consejo médico y no pretende diagnosticar, tratar, curar ni prevenir ninguna enfermedad. Consulta siempre a un profesional de la salud calificado. En caso de emergencia médica, contacta a los servicios de emergencia locales.",
    legal: { disclaimer: "Aviso médico", terms: "Términos del servicio", privacy: "Política de privacidad" },
    rights: "Todos los derechos reservados.",
  },
  legal: {
    draftBanner: "PLANTILLA — Este documento es provisional y debe ser revisado por un abogado calificado antes del lanzamiento.",
  },
};
