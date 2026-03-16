(function initCountdownApp() {
  const config = window.COUNTDOWN_CONFIG;

  if (!config) {
    console.error("No se encontró COUNTDOWN_CONFIG en window.");
    return;
  }

  const $ = (id) => document.getElementById(id);
  const el = {
    mainTitle: $("main-title"),
    subtitle: $("subtitle"),
    dedication: $("dedication"),
    heroTag: $("hero-tag"),
    statusMessage: $("status-message"),
    footerNote: $("footer-note"),
    brandName: $("brand-name"),
    brandLink: $("brand-link"),
    brandLogo: $("brand-logo"),
    shareBtn: $("share-btn"),
    calendarBtn: $("calendar-btn"),
    themeToggle: $("theme-toggle"),
    themeToggleText: $("theme-toggle-text"),
    socialLinks: $("social-links"),
    eventDetails: $("event-details"),
    eventName: $("event-name"),
    eventLocation: $("event-location"),
    eventDescription: $("event-description"),
    eventSpecialMessage: $("event-special-message"),
    values: {
      days: $("days"),
      hours: $("hours"),
      minutes: $("minutes"),
      seconds: $("seconds"),
    },
    labels: {
      days: $("label-days"),
      hours: $("label-hours"),
      minutes: $("label-minutes"),
      seconds: $("label-seconds"),
    },
  };

  const I18N = {
    "es-ES": {
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos",
      remaining: "Tiempo restante",
      elapsed: "Tiempo desde el reencuentro",
      copied: "Enlace copiado al portapapeles",
      shareError: "No se pudo compartir automáticamente. Copia este enlace:",
      remember: "Recordatorio creado (.ics)",
      light: "Claro",
      dark: "Oscuro",
    },
    "en-US": {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      remaining: "Time remaining",
      elapsed: "Time since reunion",
      copied: "Link copied to clipboard",
      shareError: "Couldn't share automatically. Copy this link:",
      remember: "Reminder created (.ics)",
      light: "Light",
      dark: "Dark",
    },
  };

  const t = I18N[config.locale] || I18N["es-ES"];

  /**
   * Obtiene el offset (ms) de una zona horaria para un instante concreto.
   */
  function getTimeZoneOffsetMs(timeZone, timestamp) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(new Date(timestamp))
      .reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
      }, {});

    const asUTC = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );

    return asUTC - timestamp;
  }

  /**
   * Convierte una fecha/hora "local" de una zona horaria concreta a epoch ms (UTC).
   */
  function zonedDateTimeToEpochMs(date, time, timeZone) {
    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute, second] = time.split(":").map(Number);

    // Aproximación inicial como si fuera UTC.
    let guess = Date.UTC(year, month - 1, day, hour, minute, second);

    // Refinado (2-3 iteraciones suele bastar para DST).
    for (let i = 0; i < 3; i += 1) {
      const offset = getTimeZoneOffsetMs(timeZone, guess);
      guess = Date.UTC(year, month - 1, day, hour, minute, second) - offset;
    }

    return guess;
  }

  function applyTheme() {
    const root = document.documentElement;
    root.style.setProperty("--heading-font", config.theme.headingFont);
    root.style.setProperty("--body-font", config.theme.bodyFont);
    root.style.setProperty("--primary", config.theme.primaryColor);
    root.style.setProperty("--secondary", config.theme.secondaryColor);
    root.style.setProperty("--accent", config.theme.accentColor);
    root.style.setProperty("--text", config.theme.textColor);
    root.style.setProperty("--overlay", config.theme.overlayColor);

    const bg = document.querySelector(".background-layer");
    if (config.theme.background.type === "image") {
      bg.style.backgroundImage = `${config.theme.background.value}, linear-gradient(135deg, #1f1636, #3e2b63)`;
      bg.style.backgroundSize = "cover";
      bg.style.backgroundPosition = "center";
    } else {
      bg.style.backgroundImage = config.theme.background.value;
    }
  }

  function applyContent() {
    el.mainTitle.textContent = config.content.mainTitle;
    el.subtitle.textContent = config.content.subtitle;
    el.dedication.textContent = config.content.dedication;
    el.footerNote.textContent = config.content.footerNote;
    el.brandName.textContent = config.content.brandName;

    if (config.content.heroTag) {
      el.heroTag.textContent = config.content.heroTag;
      el.heroTag.hidden = false;
    }

    if (config.branding.brandLink) {
      el.brandLink.href = config.branding.brandLink;
    }

    if (config.branding.logoUrl) {
      el.brandLogo.src = config.branding.logoUrl;
      el.brandLogo.hidden = false;
    }

    el.shareBtn.textContent = config.actions.shareButtonText;
    el.calendarBtn.textContent = config.actions.calendarButtonText;
    el.calendarBtn.hidden = !config.actions.calendarEnabled;

    el.labels.days.textContent = t.days;
    el.labels.hours.textContent = t.hours;
    el.labels.minutes.textContent = t.minutes;
    el.labels.seconds.textContent = t.seconds;

    document.documentElement.lang = config.locale.startsWith("en") ? "en" : "es";
  }

  function applyEventDetails() {
    if (!config.eventDetails.enabled) {
      el.eventDetails.hidden = true;
      return;
    }

    el.eventName.textContent = config.eventDetails.name;
    el.eventLocation.textContent = config.eventDetails.location;
    el.eventDescription.textContent = config.eventDetails.description;
    el.eventSpecialMessage.textContent = config.eventDetails.specialMessage;
    el.eventDetails.hidden = false;
  }

  function renderSocialLinks() {
    if (!Array.isArray(config.socialLinks) || config.socialLinks.length === 0) {
      el.socialLinks.hidden = true;
      return;
    }

    el.socialLinks.innerHTML = config.socialLinks
      .map(
        (link) =>
          `<a class="social-pill" href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">${link.text}</a>`,
      )
      .join("");
  }

  function setCountdownValues(msDiff) {
    const totalSeconds = Math.floor(msDiff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    el.values.days.textContent = String(days).padStart(2, "0");
    el.values.hours.textContent = String(hours).padStart(2, "0");
    el.values.minutes.textContent = String(minutes).padStart(2, "0");
    el.values.seconds.textContent = String(seconds).padStart(2, "0");
  }

  const targetEpoch = zonedDateTimeToEpochMs(config.target.date, config.target.time, config.target.timeZone);

  function updateCountdown() {
    const now = Date.now();
    const diff = targetEpoch - now;

    if (diff >= 0) {
      setCountdownValues(diff);
      el.statusMessage.textContent = `${t.remaining} · ${config.target.timeZone}`;
      return;
    }

    if (config.behavior.showElapsedIfPassed) {
      setCountdownValues(Math.abs(diff));
      el.statusMessage.textContent = t.elapsed;
      return;
    }

    setCountdownValues(0);
    el.statusMessage.textContent = config.behavior.finalMessage;
  }

  async function onShare() {
    const payload = {
      title: config.content.mainTitle,
      text: `${config.content.subtitle} ${config.content.dedication}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      alert(t.copied);
    } catch (_error) {
      alert(`${t.shareError} ${window.location.href}`);
    }
  }

  function formatDateAsICS(dateObj) {
    const yyyy = dateObj.getUTCFullYear();
    const mm = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getUTCDate()).padStart(2, "0");
    const hh = String(dateObj.getUTCHours()).padStart(2, "0");
    const mi = String(dateObj.getUTCMinutes()).padStart(2, "0");
    const ss = String(dateObj.getUTCSeconds()).padStart(2, "0");
    return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
  }

  function onCalendarDownload() {
    const start = new Date(targetEpoch);
    const end = new Date(targetEpoch + 60 * 60 * 1000);

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Reencuentro Countdown//ES",
      "BEGIN:VEVENT",
      `UID:reencuentro-${targetEpoch}@countdown.local`,
      `DTSTAMP:${formatDateAsICS(new Date())}`,
      `DTSTART:${formatDateAsICS(start)}`,
      `DTEND:${formatDateAsICS(end)}`,
      `SUMMARY:${config.content.mainTitle}`,
      `DESCRIPTION:${config.content.subtitle} ${config.content.dedication}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "reencuentro.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    alert(t.remember);
  }

  function initTheme() {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = localStorage.getItem("reencuentro-theme");
    const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

    document.documentElement.dataset.theme = initialTheme;

    const updateToggleText = () => {
      const isDark = document.documentElement.dataset.theme === "dark";
      el.themeToggle.firstElementChild.textContent = isDark ? "☀️" : "🌙";
      el.themeToggleText.textContent = isDark ? t.light : t.dark;
    };

    updateToggleText();

    el.themeToggle.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("reencuentro-theme", next);
      updateToggleText();
    });
  }

  function bindEvents() {
    el.shareBtn.addEventListener("click", onShare);
    if (config.actions.calendarEnabled) {
      el.calendarBtn.addEventListener("click", onCalendarDownload);
    }
  }

  applyTheme();
  applyContent();
  applyEventDetails();
  renderSocialLinks();
  initTheme();
  bindEvents();

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
