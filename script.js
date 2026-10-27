// Futlatino — interacciones de la landing page
(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  // Texto accesible del botón de menú según el idioma activo
  function updateMenuLabel() {
    if (!menuToggle) return;
    const lang = window.FUTLATINO_LANG || "es";
    const t = window.FUTLATINO_TRANSLATIONS?.[lang];
    if (!t) return;
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-label", open ? t.menuClose : t.menuOpen);
  }

  function closeMenu() {
    menuToggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("open");
    document.body.classList.remove("menu-open");
    updateMenuLabel();
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    nav?.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
    updateMenuLabel();
  });

  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) closeMenu();
  });

  // Carrusel de testimonios (si existe en la página)
  const slides = [...document.querySelectorAll(".quote-slide")];
  const count = document.querySelector(".quote-count");
  let currentSlide = 0;

  function showSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
      slide.setAttribute("aria-hidden", String(i !== currentSlide));
    });
    if (count) count.innerHTML = `<b>${String(currentSlide + 1).padStart(2, "0")}</b> / ${String(slides.length).padStart(2, "0")}`;
  }

  document.querySelector(".quote-prev")?.addEventListener("click", () => showSlide(currentSlide - 1));
  document.querySelector(".quote-next")?.addEventListener("click", () => showSlide(currentSlide + 1));
  showSlide(0);

  // Año automático
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Formulario: valida los campos y prepara el mensaje para WhatsApp.
  // Sustituye WHATSAPP_NUMBER por el número oficial en formato internacional, sin + ni espacios.
  const WHATSAPP_NUMBER = "";
  const form = document.getElementById("application-form");
  const feedback = document.getElementById("form-feedback");
  const toast = document.getElementById("toast");

  // Mensajes traducibles (definidos en el sistema de idiomas más abajo)
  const msg = key => window.FUTLATINO_I18N?.message(key) || "";

  function setFeedback(key) {
    if (!feedback) return;
    feedback.dataset.feedbackKey = key;
    feedback.textContent = msg(key);
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 4500);
  }

  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const message = [
      "Hola, quiero postularme a Futlatino.",
      `Nombre: ${data.get("nombre")}`,
      `País: ${data.get("pais")}`,
      `Edad: ${data.get("edad")}`,
      `Posición: ${data.get("posicion")}`,
      `Correo: ${data.get("email")}`,
      data.get("mensaje") ? `Información adicional: ${data.get("mensaje")}` : ""
    ].filter(Boolean).join("\n");

    if (WHATSAPP_NUMBER) {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      setFeedback("whatsappOpened");
    } else {
      setFeedback("demoReady");
      showToast(msg("demoToast"));
      console.info("Postulación Futlatino (demo):\n" + message);
    }
  });
})();


/* =====================================================
   FUTLATINO — SISTEMA DE IDIOMAS ES / EN
   Traduce el contenido de toda la página.
   IMPORTANTE: los textos en "es" deben coincidir con los del HTML,
   porque al cargar la página se aplica el idioma guardado.
===================================================== */

(() => {
  "use strict";

  const switchButton = document.querySelector(".language-switch");
  if (!switchButton) return;

  const translations = {
    es: {
      announcement: "TALENTO LATINOAMERICANO. OPORTUNIDADES SIN FRONTERAS.",
      menu: ["Inicio", "Sobre Futlatino", "Programas", "Experiencias", "Historias", "Contacto"],
      applyButton: "POSTÚLATE",

      heroEyebrow: "TU TALENTO, EL MUNDO",
      heroTitle: "EL TALENTO<br>LATINOAMERICANO,<br><em>SIN FRONTERAS.</em>",
      heroDescription: "Scouting, desarrollo y proyección internacional<br class=\"desktop-break\"> de jóvenes futbolistas latinoamericanos.",
      heroAbout: "CONOCE NUESTRO PROYECTO",
      heroContact: "CONTÁCTANOS",
      scroll: "DESCUBRE FUTLATINO",

      aboutImageLabel: "Jóvenes futbolistas entrenando en equipo",
      aboutEyebrow: "SOBRE FUTLATINO",
      aboutTitle: "CREAMOS EXPERIENCIAS<br>Y OPORTUNIDADES.",
      aboutText: "Impulsamos el talento latinoamericano a través del scouting, el desarrollo futbolístico y las experiencias internacionales, conectando jugadores con nuevas oportunidades en el fútbol global.",
      aboutLink: "CONOCE NUESTRO MÉTODO",

      // Nuestros pilares (nuevo diseño)
      pillarsEyebrow: "NUESTROS PILARES",
      pillarsTitle: "IMPULSAMOS EL TALENTO LATINOAMERICANO",
      pillarsLead: "A través de experiencias, oportunidades y una red internacional, conectamos a jóvenes futbolistas con su próximo nivel.",
      pillars: [
        {
          title: "SCOUTING Y VISORÍAS",
          description: "Mediante eventos de detección de talento en distintas ciudades de Latinoamérica y Estados Unidos, identificamos futbolistas con potencial para formar parte de nuestros distintos programas.",
          aria: "Postularse a scouting y visorías",
          image: "Scouting y visorías"
        },
        {
          title: "SELECTIVOS Y GIRAS INTERNACIONALES",
          description: "Formamos selectivos de competición para participar en torneos y giras internacionales, ofreciendo experiencias de alto nivel que impulsan el desarrollo de nuestros jugadores.",
          aria: "Conocer selectivos y giras",
          image: "Selectivos y giras internacionales"
        },
        {
          title: "TRYOUTS Y OPORTUNIDADES EN CLUBES",
          description: "Facilitamos oportunidades de pruebas deportivas con clubes de Europa, conectando a jugadores con procesos de evaluación acordes con su perfil y potencial futbolístico.",
          aria: "Conocer tryouts en clubes",
          image: "Tryouts y oportunidades en clubes"
        },
        {
          title: "PLANIFICACIÓN DE CARRERA Y REPRESENTACIÓN",
          description: "Acompañamos a los futbolistas en la planificación de su trayectoria, identificando oportunidades y diseñando estrategias de desarrollo profesional. Cuando corresponde, también ofrecemos servicios de representación mediante profesionales habilitados.",
          aria: "Conocer planificación de carrera",
          image: "Planificación de carrera y representación"
        }
      ],
      networkEyebrow: "UNA RED GLOBAL",
      networkTitle: "ALIANZAS QUE GENERAN OPORTUNIDADES",
      networkText: "Contamos con una amplia red de clubes, academias, agentes FIFA y profesionales del fútbol en distintos mercados alrededor del mundo. Estas alianzas nos permiten crear rutas reales de desarrollo y proyección para nuestros jugadores.",
      networkImages: [
        "Acuerdo con clubes y agentes",
        "Staff técnico en el campo",
        "Balón en estadio",
        "Jugadores viajando"
      ],

      experiencesEyebrow: "EXPERIENCIAS INTERNACIONALES",
      experiencesTitle: "MÁS QUE VISORÍAS,<br>EXPERIENCIAS QUE TRANSFORMAN.",
      experiencesDescription: "Llevamos a nuestros jugadores a vivir oportunidades únicas en clubes, academias y torneos internacionales, con el objetivo de abrirles las puertas a un futuro en el fútbol profesional.",
      tiles: ["EUROPA", "ACADEMIAS", "NORTEAMÉRICA", "TORNEOS"],

      testimonials: [
        { quote: "Futlatino me dio la oportunidad de mostrar mi talento en Europa. Hoy estoy cumpliendo un sueño.", role: "JUGADOR FUTLATINO", program: "CLUB EN EUROPA" },
        { quote: "Aprendí que el trabajo diario y la disciplina pueden llevarte mucho más lejos de lo que imaginas.", role: "JUGADOR FUTLATINO", program: "PROGRAMA INTERNACIONAL" },
        { quote: "Fue una experiencia que cambió mi forma de ver el fútbol y mi futuro como jugador.", role: "JUGADOR FUTLATINO", program: "FUTLATINO SELECT" }
      ],
      previousTestimonial: "Testimonio anterior",
      nextTestimonial: "Siguiente testimonio",

      applicationEyebrow: "SÉ PARTE",
      applicationTitle: "EL SIGUIENTE PASO<br><em>COMIENZA AQUÍ.</em>",
      applicationDescription: "Postúlate, colabora o conoce más sobre nuestro proyecto.",
      steps: ["Cuéntanos de ti", "Conecta con el equipo", "Da el siguiente paso"],

      formEyebrow: "01 — POSTULACIÓN",
      formTitle: "Hablemos de tu futuro.",
      labels: [
        "Nombre completo *",
        "País *",
        "Edad *",
        "Posición *",
        "Correo electrónico *",
        "Cuéntanos un poco más (opcional)"
      ],
      namePlaceholder: "Tu nombre",
      countryPlaceholder: "Selecciona tu país",
      agePlaceholder: "Tu edad",
      positionPlaceholder: "Selecciona posición",
      emailPlaceholder: "nombre@correo.com",
      messagePlaceholder: "Club actual, experiencia, objetivos...",
      countries: ["México", "Argentina", "Brasil", "Chile", "Colombia", "Ecuador", "Perú", "Uruguay", "Estados Unidos", "Otro"],
      positions: ["Portero", "Defensa", "Mediocampista", "Delantero", "Entrenador / Academia", "Otro"],
      consent: "Autorizo a Futlatino a contactarme sobre esta postulación.",
      submit: "ENVIAR POSTULACIÓN",
      formNote: "* Campos obligatorios. Tu información será tratada de forma confidencial.",

      footerCopyright: "Futlatino. Todos los derechos reservados.",
      footerSlogan: "Talento latinoamericano. Sin fronteras.",
      poweredBy: "POWERED BY",

      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
      changeLanguage: "Cambiar a inglés",
      homeLabel: "Futlatino, inicio",

      feedback: {
        required: "Por favor, completa todos los campos obligatorios.",
        invalidEmail: "Introduce un correo electrónico válido.",
        success: "Tu postulación se ha enviado correctamente.",
        error: "No se pudo enviar tu postulación. Inténtalo de nuevo.",
        whatsappOpened: "Se abrió WhatsApp para que puedas enviar tu postulación.",
        demoReady: "El formulario está validado. Para recibir postulaciones, configura el número oficial de WhatsApp o conecta un servicio de formularios.",
        demoToast: "Formulario de demostración: falta configurar el canal de recepción."
      }
    },

    en: {
      announcement: "LATIN AMERICAN TALENT. OPPORTUNITIES WITHOUT BORDERS.",
      menu: ["Home", "About Futlatino", "Programs", "Experiences", "Stories", "Contact"],
      applyButton: "APPLY NOW",

      heroEyebrow: "YOUR TALENT, THE WORLD",
      heroTitle: "LATIN AMERICAN<br>TALENT,<br><em>WITHOUT BORDERS.</em>",
      heroDescription: "Scouting, development and international exposure<br class=\"desktop-break\"> for young Latin American footballers.",
      heroAbout: "DISCOVER OUR PROJECT",
      heroContact: "CONTACT US",
      scroll: "DISCOVER FUTLATINO",

      aboutImageLabel: "Young footballers training as a team",
      aboutEyebrow: "ABOUT FUTLATINO",
      aboutTitle: "WE CREATE EXPERIENCES<br>AND OPPORTUNITIES.",
      aboutText: "We empower Latin American talent through scouting, football development and international experiences, connecting players with new opportunities in global football.",
      aboutLink: "DISCOVER OUR APPROACH",

      pillarsEyebrow: "OUR PILLARS",
      pillarsTitle: "WE EMPOWER LATIN AMERICAN TALENT",
      pillarsLead: "Through experiences, opportunities and an international network, we connect young footballers with their next level.",
      pillars: [
        {
          title: "SCOUTING AND SHOWCASES",
          description: "Through talent identification events in several cities across Latin America and the United States, we spot players with the potential to join our different programs.",
          aria: "Apply to scouting and showcases",
          image: "Scouting and showcases"
        },
        {
          title: "SELECT TEAMS AND INTERNATIONAL TOURS",
          description: "We build competitive select teams to take part in international tournaments and tours, offering high-level experiences that drive our players' development.",
          aria: "Learn about select teams and tours",
          image: "Select teams and international tours"
        },
        {
          title: "TRYOUTS AND CLUB OPPORTUNITIES",
          description: "We facilitate trial opportunities with European clubs, connecting players with evaluation processes that match their profile and football potential.",
          aria: "Learn about club tryouts",
          image: "Tryouts and club opportunities"
        },
        {
          title: "CAREER PLANNING AND REPRESENTATION",
          description: "We support players in planning their career path, identifying opportunities and designing professional development strategies. When appropriate, we also offer representation services through licensed professionals.",
          aria: "Learn about career planning",
          image: "Career planning and representation"
        }
      ],
      networkEyebrow: "A GLOBAL NETWORK",
      networkTitle: "PARTNERSHIPS THAT CREATE OPPORTUNITIES",
      networkText: "We have a broad network of clubs, academies, FIFA agents and football professionals in different markets around the world. These partnerships allow us to create real pathways of development and exposure for our players.",
      networkImages: [
        "Agreement with clubs and agents",
        "Coaching staff on the pitch",
        "Ball in a stadium",
        "Players traveling"
      ],

      experiencesEyebrow: "INTERNATIONAL EXPERIENCES",
      experiencesTitle: "MORE THAN TRIALS,<br>EXPERIENCES THAT TRANSFORM.",
      experiencesDescription: "We take our players to unique opportunities with clubs, academies and international tournaments, aiming to open doors to a future in professional football.",
      tiles: ["EUROPE", "ACADEMIES", "NORTH AMERICA", "TOURNAMENTS"],

      testimonials: [
        { quote: "Futlatino gave me the opportunity to showcase my talent in Europe. Today, I'm living my dream.", role: "FUTLATINO PLAYER", program: "CLUB IN EUROPE" },
        { quote: "I learned that daily hard work and discipline can take you much further than you ever imagined.", role: "FUTLATINO PLAYER", program: "INTERNATIONAL PROGRAM" },
        { quote: "It was an experience that changed how I see football and my future as a player.", role: "FUTLATINO PLAYER", program: "FUTLATINO SELECT" }
      ],
      previousTestimonial: "Previous testimonial",
      nextTestimonial: "Next testimonial",

      applicationEyebrow: "BE PART OF IT",
      applicationTitle: "YOUR NEXT STEP<br><em>STARTS HERE.</em>",
      applicationDescription: "Apply, collaborate or learn more about our project.",
      steps: ["Tell us about yourself", "Connect with our team", "Take the next step"],

      formEyebrow: "01 — APPLICATION",
      formTitle: "Let's talk about your future.",
      labels: [
        "Full name *",
        "Country *",
        "Age *",
        "Position *",
        "Email address *",
        "Tell us a little more (optional)"
      ],
      namePlaceholder: "Your name",
      countryPlaceholder: "Select your country",
      agePlaceholder: "Your age",
      positionPlaceholder: "Select a position",
      emailPlaceholder: "name@email.com",
      messagePlaceholder: "Current club, experience, goals...",
      countries: ["Mexico", "Argentina", "Brazil", "Chile", "Colombia", "Ecuador", "Peru", "Uruguay", "United States", "Other"],
      positions: ["Goalkeeper", "Defender", "Midfielder", "Forward", "Coach / Academy", "Other"],
      consent: "I authorize Futlatino to contact me regarding this application.",
      submit: "SUBMIT APPLICATION",
      formNote: "* Required fields. Your information will be treated confidentially.",

      footerCopyright: "Futlatino. All rights reserved.",
      footerSlogan: "Latin American talent. Without borders.",
      poweredBy: "POWERED BY",

      menuOpen: "Open menu",
      menuClose: "Close menu",
      changeLanguage: "Switch to Spanish",
      homeLabel: "Futlatino, home",

      feedback: {
        required: "Please complete all required fields.",
        invalidEmail: "Please enter a valid email address.",
        success: "Your application has been submitted successfully.",
        error: "Your application could not be submitted. Please try again.",
        whatsappOpened: "WhatsApp has opened so you can send your application.",
        demoReady: "The form is validated. To receive applications, set up the official WhatsApp number or connect a form service.",
        demoToast: "Demo form: the receiving channel still needs to be configured."
      }
    }
  };

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  // Cambia el contenido de un elemento si existe (no falla si falta en el HTML).
  function setText(selector, value, html = false) {
    const element = $(selector);
    if (!element) return;
    if (html) element.innerHTML = value;
    else element.textContent = value;
  }

  function setTextIn(parent, selector, value, html = false) {
    const element = parent.querySelector(selector);
    if (!element) return;
    if (html) element.innerHTML = value;
    else element.textContent = value;
  }

  function setTexts(selector, values) {
    $$(selector).forEach((element, index) => {
      if (values[index] !== undefined) element.textContent = values[index];
    });
  }

  function translatePage(language) {
    const t = translations[language];
    if (!t) return;

    document.documentElement.lang = language;

    const description = $("meta[name='description']");
    if (description) {
      description.content = language === "es"
        ? "Futlatino conecta talento futbolístico latinoamericano con oportunidades internacionales. Scouting, desarrollo y experiencias que abren caminos."
        : "Futlatino connects Latin American football talent with international opportunities through scouting, development and unique experiences.";
    }

    // ---------- Barra superior ----------
    const announcement = $(".announcement");
    if (announcement) {
      const dot = announcement.querySelector(".announcement-dot");
      announcement.textContent = "";
      if (dot) announcement.appendChild(dot);
      announcement.append(" " + t.announcement);
    }

    // ---------- Header y navegación ----------
    setTexts(".main-nav a", t.menu);
    setTexts(".footer-nav a", t.menu);
    $$(".brand").forEach(brand => brand.setAttribute("aria-label", t.homeLabel));

    const headerButton = $(".header-actions .button-small");
    if (headerButton) headerButton.innerHTML = `${t.applyButton} <span>↗</span>`;

    // ---------- Hero ----------
    // El texto del eyebrow va junto a un <span></span> vacío decorativo.
    setText(".hero .eyebrow", `<span></span> ${t.heroEyebrow}`, true);
    setText(".hero h1", t.heroTitle, true);
    setText(".hero-description", t.heroDescription, true);

    const heroButtons = $$(".hero-buttons .button");
    if (heroButtons[0]) heroButtons[0].innerHTML = `${t.heroAbout} <span>›</span>`;
    if (heroButtons[1]) heroButtons[1].textContent = t.heroContact;

    const scrollCue = $(".scroll-cue");
    if (scrollCue) scrollCue.innerHTML = `<span></span> ${t.scroll}`;

    // ---------- Sobre Futlatino ----------
    const aboutImage = $(".intro-image");
    if (aboutImage) aboutImage.setAttribute("aria-label", t.aboutImageLabel);

    setText(".intro-copy .eyebrow span", t.aboutEyebrow);
    setText(".intro-copy h2", t.aboutTitle, true);
    setText(".intro-copy p:not(.eyebrow)", t.aboutText);

    const aboutLink = $(".intro-copy .text-link");
    if (aboutLink) aboutLink.innerHTML = `${t.aboutLink} <span>↗</span>`;

    // ---------- Nuestros pilares (nuevo diseño) ----------
    setText(".pl-head .pl-eyebrow", `${t.pillarsEyebrow} <i></i>`, true);
    setText(".pl-head h2", t.pillarsTitle);      // solo si existe el título en el HTML
    setText(".pl-lead", t.pillarsLead);

    $$(".pl-card").forEach((card, index) => {
      const data = t.pillars[index];
      if (!data) return;

      setTextIn(card, ".pl-body h3", data.title);
      setTextIn(card, ".pl-body p", data.description);

      card.querySelector(".pl-arrow")?.setAttribute("aria-label", data.aria);
      card.querySelector(".pl-photo")?.setAttribute("aria-label", data.image);
    });

    // Red global
    setText(".pl-eyebrow-left", `<i></i> ${t.networkEyebrow}`, true);
    setText(".pl-network-copy h3", t.networkTitle);
    setText(".pl-network-copy p:not(.pl-eyebrow)", t.networkText);

    $$(".pl-mini").forEach((photo, index) => {
      if (t.networkImages[index]) photo.setAttribute("aria-label", t.networkImages[index]);
    });

    // ---------- Experiencias internacionales ----------
    setText(".experience-heading .eyebrow span", t.experiencesEyebrow);
    setText(".experience-heading h2", t.experiencesTitle, true);
    setText(".experience-heading > p", t.experiencesDescription);

    $$(".tile-label").forEach((label, index) => {
      label.innerHTML = `<i></i> ${t.tiles[index] || ""} <b>↗</b>`;
    });

    // ---------- Testimonios (solo si la sección existe) ----------
    $$(".quote-slide").forEach((slide, index) => {
      const data = t.testimonials[index];
      if (!data) return;
      setTextIn(slide, "blockquote", data.quote);
      setTextIn(slide, "figcaption strong", data.role);
      setTextIn(slide, "figcaption small", data.program);
    });

    $(".quote-prev")?.setAttribute("aria-label", t.previousTestimonial);
    $(".quote-next")?.setAttribute("aria-label", t.nextTestimonial);

    // ---------- Postulación / Contacto ----------
    setText(".application-copy .eyebrow span", t.applicationEyebrow);
    setText(".application-copy h2", t.applicationTitle, true);
    setText(".application-copy > p:not(.eyebrow)", t.applicationDescription);
    setTexts(".application-points b", t.steps);

    setText(".form-heading > span", t.formEyebrow);
    setText(".form-heading h3", t.formTitle);
    setTexts(".form-grid label > span", t.labels);

    const form = $("#application-form");
    if (form) {
      const placeholders = {
        nombre: t.namePlaceholder,
        edad: t.agePlaceholder,
        email: t.emailPlaceholder,
        mensaje: t.messagePlaceholder
      };

      Object.entries(placeholders).forEach(([name, placeholder]) => {
        const input = form.querySelector(`[name="${name}"]`);
        if (input) input.placeholder = placeholder;
      });

      const country = form.querySelector('[name="pais"]');
      if (country) {
        country.options[0].textContent = t.countryPlaceholder;
        [...country.options].slice(1).forEach((option, index) => {
          if (t.countries[index] !== undefined) option.textContent = t.countries[index];
        });
      }

      const position = form.querySelector('[name="posicion"]');
      if (position) {
        position.options[0].textContent = t.positionPlaceholder;
        [...position.options].slice(1).forEach((option, index) => {
          if (t.positions[index] !== undefined) option.textContent = t.positions[index];
        });
      }

      setText(".consent span", t.consent);

      const submit = $(".submit-button");
      if (submit) submit.innerHTML = `${t.submit} <span>↗</span>`;

      setText(".form-note", t.formNote);

      // Si ya hay un mensaje visible, se traduce sin reenviar el formulario.
      const feedback = $("#form-feedback");
      if (feedback && feedback.dataset.feedbackKey) {
        const message = t.feedback[feedback.dataset.feedbackKey];
        if (message) feedback.textContent = message;
      }
    }

    // ---------- Pie de página ----------
    // Se conserva <span id="year"> para no romper el año automático.
    const copyright = $(".footer-bottom > span:first-child");
    if (copyright) {
      const currentYear = $("#year")?.textContent || new Date().getFullYear();
      copyright.innerHTML = `© <span id="year">${currentYear}</span> ${t.footerCopyright}`;
    }
    setText(".footer-bottom > span:last-child", t.footerSlogan);
    setText(".powered-by > span", t.poweredBy);

    // ---------- Accesibilidad y botón de idioma ----------
    const menuButton = $(".menu-toggle");
    if (menuButton) {
      menuButton.setAttribute(
        "aria-label",
        menuButton.getAttribute("aria-expanded") === "true" ? t.menuClose : t.menuOpen
      );
    }

    switchButton.setAttribute("aria-label", t.changeLanguage);
    switchButton.setAttribute("aria-pressed", String(language === "en"));

    $$(".lang-option").forEach(option => {
      const active = option.dataset.lang === language;
      option.classList.toggle("active", active);
      option.setAttribute("aria-current", active ? "true" : "false");
    });

    try {
      localStorage.setItem("futlatino-language", language);
    } catch (_) {
      // La traducción funciona aunque el almacenamiento esté bloqueado.
    }

    window.FUTLATINO_LANG = language;
    window.FUTLATINO_TRANSLATIONS = translations;
  }

  // Un único evento controla el cambio de idioma.
  switchButton.addEventListener("click", () => {
    const current = document.documentElement.lang === "en" ? "en" : "es";
    translatePage(current === "es" ? "en" : "es");
  });

  // API para otras partes del script (mensajes del formulario, etc.).
  window.FUTLATINO_I18N = {
    translate: translatePage,
    message(key) {
      const language = window.FUTLATINO_LANG || "es";
      return translations[language].feedback[key] || "";
    }
  };

  // Idioma guardado; español por defecto.
  let savedLanguage = "es";
  try {
    const saved = localStorage.getItem("futlatino-language");
    if (saved === "es" || saved === "en") savedLanguage = saved;
  } catch (_) {}

  translatePage(savedLanguage);
})();


/* =========================================
   FUTLATINO — NAVEGACIÓN Y SECCIÓN ACTIVA
========================================= */
(() => {
  const nav = document.querySelector(".main-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const links = [...document.querySelectorAll(".main-nav a[href^='#']")];

  if (!links.length) return;

  const ids = links
    .map(link => link.getAttribute("href").slice(1))
    .filter(Boolean);

  const sections = ids
    .filter(id => id !== "inicio")
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function setActive(id) {
    links.forEach(link => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function closeMobileMenu() {
    nav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  // Logo e Inicio: subir al comienzo de la página.
  document.querySelectorAll(".brand, .main-nav a[href='#inicio']")
    .forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();
        closeMobileMenu();
        setActive("inicio");
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.replaceState(null, "", "#inicio");
      });
    });

  // Actualiza la línea activa según la posición del scroll.
  let ticking = false;

  function updateActiveSection() {
    const marker = window.scrollY + window.innerHeight * 0.30;
    let activeId = "inicio";

    for (const section of sections) {
      if (section.getBoundingClientRect().top + window.scrollY <= marker) {
        activeId = section.id;
      }
    }

    setActive(activeId);
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateActiveSection);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", updateActiveSection);

  // Navegación inicial y enlaces directos.
  const initialId = location.hash.slice(1);
  if (ids.includes(initialId)) setActive(initialId);
  else updateActiveSection();
})();