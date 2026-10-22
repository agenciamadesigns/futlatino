// Futlatino — interacciones de la landing page
(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  function closeMenu() {
    menuToggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("open");
    document.body.classList.remove("menu-open");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    nav?.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) closeMenu();
  });

  // Carrusel de testimonios
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

  // Formulario de demostración: valida los campos y prepara el mensaje para WhatsApp.
  // Sustituye WHATSAPP_NUMBER por el número oficial en formato internacional, sin + ni espacios.
  const WHATSAPP_NUMBER = "";
  const form = document.getElementById("application-form");
  const feedback = document.getElementById("form-feedback");
  const toast = document.getElementById("toast");

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
      if (feedback) feedback.textContent = "Se abrió WhatsApp para que puedas enviar tu postulación.";
    } else {
      if (feedback) feedback.textContent = "El formulario está validado. Para recibir postulaciones, configura el número oficial de WhatsApp o conecta un servicio de formularios.";
      showToast("Formulario de demostración: falta configurar el canal de recepción.");
      console.info("Postulación Futlatino (demo):\n" + message);
    }
  });

  // Enlaces sociales de muestra: evita que el # lleve al principio sin una URL configurada.
  document.querySelectorAll(".social-links a[href='#']").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      showToast("Agrega aquí el enlace oficial de esta red social.");
    });
  });

})();


/* =====================================
   FUTLATINO — CAMBIO DE IDIOMA ES / EN
===================================== */

const languageButton = document.querySelector(".language-switch");


/* =====================================================
   FUTLATINO — SISTEMA DE IDIOMAS ES / EN
   Traduce el contenido de toda la página.
===================================================== */

(() => {
  "use strict";

  const switchButton = document.querySelector(".language-switch");

  if (!switchButton) return;

  const translations = {
    es: {
      announcement: "TALENTO LATINOAMERICANO. OPORTUNIDADES SIN FRONTERAS.",
      menu: [
        "Inicio",
        "Sobre Futlatino",
        "Programas",
        "Experiencias",
        "Historias",
        "Contacto"
      ],
      applyButton: "POSTÚLATE",
      heroEyebrow: "TU TALENTO, EL MUNDO",
      heroTitle: "EL TALENTO<br>LATINOAMERICANO,<br><em>SIN FRONTERAS.</em>",
      heroDescription: "Scouting, desarrollo y proyección internacional<br class=\"desktop-break\"> de jóvenes futbolistas latinoamericanos.",
      heroAbout: "CONOCE NUESTRO PROYECTO",
      heroContact: "CONTÁCTANOS",
      scroll: "DESCUBRE FUTLATINO",

      aboutEyebrow: "SOBRE FUTLATINO",
      aboutTitle: "CONECTAMOS TALENTO<br>CON OPORTUNIDADES.",
      aboutP1: "Futlatino es una plataforma que identifica, desarrolla y proyecta jóvenes futbolistas de América Latina, creando oportunidades reales en clubes, academias y torneos de Europa y Norteamérica.",
      aboutP2: "Creemos en el talento latinoamericano y trabajamos para abrir caminos a través del fútbol, las experiencias y una red internacional de contactos.",
      aboutLink: "CONOCE NUESTRO MÉTODO",

      programsEyebrow: "NUESTROS PILARES",
      programsTitle: "DEL TALENTO A LA OPORTUNIDAD.",
      programsIntro: "Un camino integral para que cada jugador pueda dar el siguiente paso.",
      cards: [
        {
          title: "SCOUTING<br>Y VISORÍAS",
          description: "Identificamos talento en toda Latinoamérica y detectamos el potencial de cada jugador.",
          aria: "Postularse a scouting"
        },
        {
          title: "FUTLATINO SELECT",
          description: "Selección de jugadores y formación de equipos para competir en torneos y eventos internacionales.",
          aria: "Conocer Futlatino Select"
        },
        {
          title: "DESARROLLO<br>DEL JUGADOR",
          description: "Entrenamiento, formación y acompañamiento para crecer dentro y fuera de la cancha.",
          aria: "Conocer desarrollo del jugador"
        },
        {
          title: "EXPERIENCIAS<br>INTERNACIONALES",
          description: "Viajes, entrenamientos, torneos y oportunidades de exposición en Europa y Norteamérica.",
          aria: "Ver experiencias internacionales"
        }
      ],

      experiencesEyebrow: "EXPERIENCIAS INTERNACIONALES",
      experiencesTitle: "MÁS QUE VISORÍAS,<br>EXPERIENCIAS QUE TRANSFORMAN.",
      experiencesDescription: "Llevamos a nuestros jugadores a vivir oportunidades únicas en clubes, academias y torneos internacionales, con el objetivo de abrirles las puertas a un futuro en el fútbol profesional.",
      tiles: ["EUROPA", "ACADEMIAS", "NORTEAMÉRICA", "TORNEOS"],

      testimonials: [
        {
          quote: "Futlatino me dio la oportunidad de mostrar mi talento en Europa. Hoy estoy cumpliendo un sueño.",
          role: "JUGADOR FUTLATINO",
          program: "CLUB EN EUROPA"
        },
        {
          quote: "Aprendí que el trabajo diario y la disciplina pueden llevarte mucho más lejos de lo que imaginas.",
          role: "JUGADOR FUTLATINO",
          program: "PROGRAMA INTERNACIONAL"
        },
        {
          quote: "Fue una experiencia que cambió mi forma de ver el fútbol y mi futuro como jugador.",
          role: "JUGADOR FUTLATINO",
          program: "FUTLATINO SELECT"
        }
      ],

      previousTestimonial: "Testimonio anterior",
      nextTestimonial: "Siguiente testimonio",

      applicationEyebrow: "SÉ PARTE",
      applicationTitle: "EL SIGUIENTE PASO<br><em>COMIENZA AQUÍ.</em>",
      applicationDescription: "Postúlate, colabora o conoce más sobre nuestro proyecto.",
      steps: [
        "Cuéntanos de ti",
        "Conecta con el equipo",
        "Da el siguiente paso"
      ],

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
      messagePlaceholder: "Club actual, experiencia, objetivos...",
      countries: [
        "México", "Argentina", "Brasil", "Chile", "Colombia",
        "Ecuador", "Perú", "Uruguay", "Estados Unidos", "Otro"
      ],
      positions: [
        "Portero", "Defensa", "Mediocampista",
        "Delantero", "Entrenador / Academia", "Otro"
      ],
      consent: "Autorizo a Futlatino a contactarme sobre esta postulación.",
      submit: "ENVIAR POSTULACIÓN",
      formNote: "* Campos obligatorios. Tu información será tratada de forma confidencial.",

      footerCopyright: "Futlatino. Todos los derechos reservados.",
      footerSlogan: "Talento latinoamericano. Sin fronteras.",

      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
      changeLanguage: "Cambiar a inglés",

      feedback: {
        required: "Por favor, completa todos los campos obligatorios.",
        invalidEmail: "Introduce un correo electrónico válido.",
        success: "Tu postulación se ha enviado correctamente.",
        error: "No se pudo enviar tu postulación. Inténtalo de nuevo."
      }
    },

    en: {
      announcement: "LATIN AMERICAN TALENT. OPPORTUNITIES WITHOUT BORDERS.",
      menu: [
        "Home",
        "About Futlatino",
        "Programs",
        "Experiences",
        "Stories",
        "Contact"
      ],
      applyButton: "APPLY NOW",
      heroEyebrow: "YOUR TALENT, THE WORLD",
      heroTitle: "LATIN AMERICAN<br>TALENT,<br><em>WITHOUT BORDERS.</em>",
      heroDescription: "Scouting, development and international exposure<br class=\"desktop-break\"> for young Latin American footballers.",
      heroAbout: "DISCOVER OUR PROJECT",
      heroContact: "CONTACT US",
      scroll: "DISCOVER FUTLATINO",

      aboutEyebrow: "ABOUT FUTLATINO",
      aboutTitle: "CONNECTING TALENT<br>WITH OPPORTUNITY.",
      aboutP1: "Futlatino is a platform that identifies, develops and promotes young footballers from Latin America, creating real opportunities with clubs, academies and tournaments across Europe and North America.",
      aboutP2: "We believe in Latin American talent and work to open doors through football, unique experiences and an international network of contacts.",
      aboutLink: "DISCOVER OUR APPROACH",

      programsEyebrow: "OUR PILLARS",
      programsTitle: "FROM TALENT TO OPPORTUNITY.",
      programsIntro: "A comprehensive pathway to help every player take the next step.",
      cards: [
        {
          title: "SCOUTING<br>AND TRIALS",
          description: "We identify talent throughout Latin America and recognize each player's potential.",
          aria: "Apply for scouting"
        },
        {
          title: "FUTLATINO SELECT",
          description: "Player selection and team development for international tournaments and events.",
          aria: "Discover Futlatino Select"
        },
        {
          title: "PLAYER<br>DEVELOPMENT",
          description: "Training, education and guidance to grow on and off the pitch.",
          aria: "Discover player development"
        },
        {
          title: "INTERNATIONAL<br>EXPERIENCES",
          description: "Travel, training, tournaments and exposure opportunities across Europe and North America.",
          aria: "Explore international experiences"
        }
      ],

      experiencesEyebrow: "INTERNATIONAL EXPERIENCES",
      experiencesTitle: "MORE THAN TRIALS,<br>EXPERIENCES THAT TRANSFORM.",
      experiencesDescription: "We give our players access to unique opportunities with clubs, academies and international tournaments, helping open doors to a future in professional football.",
      tiles: ["EUROPE", "ACADEMIES", "NORTH AMERICA", "TOURNAMENTS"],

      testimonials: [
        {
          quote: "Futlatino gave me the opportunity to showcase my talent in Europe. Today, I'm living my dream.",
          role: "FUTLATINO PLAYER",
          program: "CLUB IN EUROPE"
        },
        {
          quote: "I learned that daily hard work and discipline can take you much further than you ever imagined.",
          role: "FUTLATINO PLAYER",
          program: "INTERNATIONAL PROGRAM"
        },
        {
          quote: "It was an experience that changed how I see football and my future as a player.",
          role: "FUTLATINO PLAYER",
          program: "FUTLATINO SELECT"
        }
      ],

      previousTestimonial: "Previous testimonial",
      nextTestimonial: "Next testimonial",

      applicationEyebrow: "BE PART OF IT",
      applicationTitle: "YOUR NEXT STEP<br><em>STARTS HERE.</em>",
      applicationDescription: "Apply, collaborate or learn more about our project.",
      steps: [
        "Tell us about yourself",
        "Connect with our team",
        "Take the next step"
      ],

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
      messagePlaceholder: "Current club, experience, goals...",
      countries: [
        "Mexico", "Argentina", "Brazil", "Chile", "Colombia",
        "Ecuador", "Peru", "Uruguay", "United States", "Other"
      ],
      positions: [
        "Goalkeeper", "Defender", "Midfielder",
        "Forward", "Coach / Academy", "Other"
      ],
      consent: "I authorize Futlatino to contact me regarding this application.",
      submit: "SUBMIT APPLICATION",
      formNote: "* Required fields. Your information will be treated confidentially.",

      footerCopyright: "Futlatino. All rights reserved.",
      footerSlogan: "Latin American talent. Without borders.",

      menuOpen: "Open menu",
      menuClose: "Close menu",
      changeLanguage: "Switch to Spanish",

      feedback: {
        required: "Please complete all required fields.",
        invalidEmail: "Please enter a valid email address.",
        success: "Your application has been submitted successfully.",
        error: "Your application could not be submitted. Please try again."
      }
    }
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  // Actualiza contenido sin modificar la estructura de los elementos.
  function setText(selector, value, html = false) {
    const element = $(selector);
    if (!element) return;

    if (html) {
      element.innerHTML = value;
    } else {
      element.textContent = value;
    }
  }

  function setTexts(selector, values) {
    $$(selector).forEach((element, index) => {
      if (values[index] !== undefined) {
        element.textContent = values[index];
      }
    });
  }

  function translatePage(language) {
    const t = translations[language];
    if (!t) return;

    document.documentElement.lang = language;

    document.title = language === "es"
      ? "Futlatino — Football Experiences. Global Opportunities."
      : "Futlatino — Football Experiences. Global Opportunities.";

    const description = $("meta[name='description']");
    if (description) {
      description.content = language === "es"
        ? "Futlatino conecta talento futbolístico latinoamericano con oportunidades internacionales. Scouting, desarrollo y experiencias que abren caminos."
        : "Futlatino connects Latin American football talent with international opportunities through scouting, development and unique experiences.";
    }

    // Barra superior
    const announcement = $(".announcement");
    if (announcement) {
      const dot = announcement.querySelector(".announcement-dot");
      announcement.textContent = "";
      if (dot) announcement.appendChild(dot);
      announcement.append(" " + t.announcement);
    }

    // Navegación principal y pie de página
    setTexts(".main-nav a", t.menu);
    setTexts(".footer-nav a", t.menu);

    setText(".header-actions .button-small", t.applyButton + " ", true);
    const headerButton = $(".header-actions .button-small");
    if (headerButton) {
      headerButton.innerHTML = `${t.applyButton} <span>↗</span>`;
    }

    // Hero
    setText(".hero .eyebrow span", t.heroEyebrow);
    setText(".hero h1", t.heroTitle, true);
    setText(".hero-description", t.heroDescription, true);

    const heroButtons = $$(".hero-buttons .button");
    if (heroButtons[0]) {
      heroButtons[0].innerHTML = `${t.heroAbout} <span>›</span>`;
    }
    if (heroButtons[1]) {
      heroButtons[1].textContent = t.heroContact;
    }

    setText(".scroll-cue", t.scroll, true);
    const scrollCue = $(".scroll-cue");
    if (scrollCue) {
      scrollCue.innerHTML = `<span></span> ${t.scroll}`;
    }

    // Sobre Futlatino
    setText(".intro-copy .eyebrow span", t.aboutEyebrow);
    setText(".intro-copy h2", t.aboutTitle, true);
    setTexts(".intro-copy p:not(.eyebrow)", [t.aboutP1, t.aboutP2]);

    const aboutLink = $(".intro-copy .text-link");
    if (aboutLink) {
      aboutLink.innerHTML = `${t.aboutLink} <span>↗</span>`;
    }

    // Programas
    setText(".section-heading .eyebrow span", t.programsEyebrow);
    setText(".section-heading h2", t.programsTitle);
    setText(".section-intro", t.programsIntro);

    $$(".pillar-card").forEach((card, index) => {
      const data = t.cards[index];
      if (!data) return;

      setTextFrom(card, ".pillar-body h3", data.title, true);
      setTextFrom(card, ".pillar-body p", data.description);
      const link = card.querySelector(".pillar-body > a");
      if (link) link.setAttribute("aria-label", data.aria);
    });

    // Experiencias internacionales
    setText(".experience-heading .eyebrow span", t.experiencesEyebrow);
    setText(".experience-heading h2", t.experiencesTitle, true);
    setText(".experience-heading > p", t.experiencesDescription);
    setTexts(".tile-label", t.tiles.map(label => label + " ↗"));

    // Conserva los iconos y el diseño de cada tarjeta.
    $$(".tile-label").forEach((label, index) => {
      label.innerHTML = `<i></i> ${t.tiles[index] || ""} <b>↗</b>`;
    });

    // Testimonios
    $$(".quote-slide").forEach((slide, index) => {
      const data = t.testimonials[index];
      if (!data) return;

      setTextFrom(slide, "blockquote", data.quote);
      setTextFrom(slide, "figcaption strong", data.role);
      setTextFrom(slide, "figcaption small", data.program);
    });

    const prev = $(".quote-prev");
    const next = $(".quote-next");
    if (prev) prev.setAttribute("aria-label", t.previousTestimonial);
    if (next) next.setAttribute("aria-label", t.nextTestimonial);

    // Postulación
    setText(".application-copy .eyebrow span", t.applicationEyebrow);
    setText(".application-copy h2", t.applicationTitle, true);
    setText(".application-copy > p:not(.eyebrow)", t.applicationDescription);
    setTexts(".application-points b", t.steps);

    setText(".form-heading > span", t.formEyebrow);
    setText(".form-heading h3", t.formTitle);
    setTexts(".form-grid label > span", t.labels);

    const form = $("#application-form");
    if (form) {
      const fields = {
        nombre: t.namePlaceholder,
        edad: t.agePlaceholder,
        email: "name@example.com",
        mensaje: t.messagePlaceholder
      };

      Object.entries(fields).forEach(([name, placeholder]) => {
        const input = form.querySelector(`[name="${name}"]`);
        if (input) input.placeholder = placeholder;
      });

      const country = form.querySelector('[name="pais"]');
      if (country) {
        country.options[0].textContent = t.countryPlaceholder;
        [...country.options].slice(1).forEach((option, index) => {
          if (t.countries[index] !== undefined) {
            option.textContent = t.countries[index];
          }
        });
      }

      const position = form.querySelector('[name="posicion"]');
      if (position) {
        position.options[0].textContent = t.positionPlaceholder;
        [...position.options].slice(1).forEach((option, index) => {
          if (t.positions[index] !== undefined) {
            option.textContent = t.positions[index];
          }
        });
      }

      setText(".consent span", t.consent);
      setText(".submit-button", t.submit + " ", true);

      const submit = $(".submit-button");
      if (submit) {
        submit.innerHTML = `${t.submit} <span>↗</span>`;
      }

      setText(".form-note", t.formNote);

      // Actualiza los mensajes ya visibles sin enviar de nuevo el formulario.
      const feedback = $("#form-feedback");
      if (feedback && feedback.dataset.feedbackKey) {
        const message = t.feedback[feedback.dataset.feedbackKey];
        if (message) feedback.textContent = message;
      }
    }

    // Pie de página
    const copyright = $(".footer-bottom > span:first-child");
    if (copyright) {
      const year = $("#year");
      copyright.textContent = `© ${year ? year.textContent : new Date().getFullYear()} ${t.footerCopyright}`;
    }

    setText(".footer-bottom > span:last-child", t.footerSlogan);

    // Textos accesibles
    const menuButton = $(".menu-toggle");
    if (menuButton) {
      menuButton.setAttribute(
        "aria-label",
        menuButton.getAttribute("aria-expanded") === "true"
          ? t.menuClose
          : t.menuOpen
      );
    }

    switchButton.setAttribute("aria-label", t.changeLanguage);
    switchButton.setAttribute("aria-pressed", String(language === "en"));

    $$(".lang-option").forEach(option => {
      const active = option.dataset.lang === language;
      option.classList.toggle("active", active);
      option.setAttribute("aria-current", active ? "true" : "false");
    });

    // Conserva el idioma para la siguiente visita.
    try {
      localStorage.setItem("futlatino-language", language);
    } catch (_) {
      // La traducción funciona incluso si el almacenamiento está bloqueado.
    }

    // Permite que otras funciones de la página conozcan el idioma activo.
    window.FUTLATINO_LANG = language;
    window.FUTLATINO_TRANSLATIONS = translations;
  }

  function setTextFrom(parent, selector, value, html = false) {
    const element = parent.querySelector(selector);
    if (!element) return;

    if (html) {
      element.innerHTML = value;
    } else {
      element.textContent = value;
    }
  }

  // Un único evento controla el cambio completo de idioma.
  switchButton.addEventListener("click", () => {
    const current = document.documentElement.lang === "en" ? "en" : "es";
    translatePage(current === "es" ? "en" : "es");
  });

  // API para traducir mensajes desde otras funciones JavaScript.
  window.FUTLATINO_I18N = {
    translate: translatePage,

    message(key) {
      const language = window.FUTLATINO_LANG || "es";
      return translations[language].feedback[key] || "";
    }
  };

  // Idioma guardado; español como opción predeterminada.
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

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
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

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        history.replaceState(null, "", "#inicio");
      });
    });

  // Actualizar la línea activa según la posición del scroll.
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
  if (ids.includes(initialId)) {
    setActive(initialId);
  } else {
    updateActiveSection();
  }
})();
