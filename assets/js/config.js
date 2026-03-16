/**
 * CONFIGURACIÓN PRINCIPAL
 * -----------------------
 * Edita este archivo para personalizar toda la web sin tocar más código.
 */
window.COUNTDOWN_CONFIG = {
  // Idioma principal: "es-ES" o "en-US"
  locale: "es-ES",

  // Contenido principal
  content: {
    brandName: "A un abrazo de distancia",
    mainTitle: "Cuenta atrás para volver a verte",
    subtitle: "Cada segundo nos acerca un poco más.",
    dedication: "Te pienso en cada amanecer. Qué ganas de ese reencuentro.",
    heroTag: "Reencuentro especial",
    footerNote: "Cuando el reloj llegue a cero, empieza nuestro momento.",
  },

  // Fecha objetivo del reencuentro
  target: {
    date: "2027-06-15", // formato: YYYY-MM-DD
    time: "20:30:00", // formato: HH:mm:ss
    timeZone: "Europe/Madrid", // zona horaria IANA
  },

  // Comportamiento al llegar la fecha
  behavior: {
    showElapsedIfPassed: false, // true = contar tiempo transcurrido
    finalMessage: "Por fin juntos otra vez 💛",
  },

  // Botones
  actions: {
    shareButtonText: "Compartir",
    calendarButtonText: "Recordar esta fecha",
    calendarEnabled: true,
  },

  // Branding opcional
  branding: {
    logoUrl: "", // ejemplo: "assets/img/logo.png"
    brandLink: "#",
  },

  // Diseño visual
  theme: {
    headingFont: "Playfair Display, Georgia, serif",
    bodyFont: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    primaryColor: "#b97cf8",
    secondaryColor: "#ff8fab",
    accentColor: "#ffd166",
    textColor: "#fff7ff",
    background: {
      // "gradient" o "image"
      type: "gradient",
      // Si usas imagen, ejemplo: "url('assets/img/fondo.jpg')"
      value: "linear-gradient(135deg, #1f1636 0%, #37265c 45%, #5a397f 100%)",
    },
    overlayColor: "rgba(16, 10, 28, 0.45)",
  },

  // Sección inferior opcional
  eventDetails: {
    enabled: true,
    name: "Nuestro reencuentro",
    location: "Madrid, España",
    description: "Una tarde para hablar sin prisa, mirarnos y recuperar todo el tiempo.",
    specialMessage: "Lo más bonito de la espera es saber que al final estás tú.",
  },

  // Redes sociales (opcional)
  socialLinks: [
    { label: "Instagram", text: "Instagram", url: "https://instagram.com" },
    { label: "WhatsApp", text: "WhatsApp", url: "https://wa.me" },
  ],
};
