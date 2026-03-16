(function bootstrapCountdown() {
  const config = window.COUNTDOWN_CONFIG;

  if (!config) {
    console.error("COUNTDOWN_CONFIG no está definido.");
    return;
  }

  const $ = (id) => document.getElementById(id);

  const elements = {
    mainTitle: $("main-title"),
    subtitle: $("subtitle"),
    eventTag: $("event-tag"),
    brandName: $("brand-name"),
    brandLink: $("brand-link"),
    logo: $("brand-logo"),
    footerNote: $("footer-note"),
    statusMessage: $("status-message"),
    shareBtn: $("share-btn"),
    calendarBtn: $("calendar-btn"),
    themeToggle: $("theme-toggle"),
    socialLinks: $("social-links"),
    eventInfo: $("event-info"),
    eventName: $("event-name"),
    eventLocation: $("event-location"),
    eventDescription: $("event-description"),
    labels: {
      days: $("label-days"),
      hours: $("label-hours"),
      minutes: $("label-minutes"),
      seconds: $("label-seconds"),
    },
    values: {
      days: $("days"),
      hours: $("hours"),
      minutes: $("minutes"),
      seconds: $("seconds"),
    },
  };

  const dictionary = {
    "es-ES": {
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos",
      remaining: "Tiempo restante",
      elapsed: "Tiempo transcurrido",
      copied: "Enlace copiado al portapapeles",
      shareError: "No se pudo compartir automáticamente. Copia este enlace:",
    },
    "en-US": {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      remaining: "Time remaining",
      elapsed: "Time elapsed",
      copied: "Link copied to clipboard",
      shareError: "Unable to share automatically. Copy this URL:",
    },
  };

  const t = dictionary[config.locale] || dictionary["es-ES"];

  function applyTheme() {
    const root = document.documentElement;
    root.style.setProperty("--font-family", config.theme.fontFamily);
    root.style.setProperty("--primary", config.theme.primaryColor);
    root.style.setProperty("--secondary", config.theme.secondaryColor);
    root.style.setProperty("--accent", config.theme.accentColor);
    root.style.setProperty("--text", config.theme.textColor);
    root.style.setProperty("--overlay", config.theme.backgroundOverlay);

    const pageBg = document.querySelector(".page-bg");
    if (config.theme.background.type === "image") {
      pageBg.style.backgroundImage = `${config.theme.background.value}, linear-gradient(120deg, #020617, #111827)`;
      pageBg.style.backgroundSize = "cover";
      pageBg.style.backgroundPosition = "center";
    } else {
      pageBg.style.backgroundImage = config.theme.background.value;
    }
  }

  function applyContent() {
    elements.mainTitle.textContent = config.content.mainTitle;
    elements.subtitle.textContent = config.content.subtitle;
    elements.brandName.textContent = config.content.brandName;
    elements.footerNote.textContent = config.content.footerNote;

    if (config.content.eventTag) {
      elements.eventTag.textContent = config.content.eventTag;
      elements.eventTag.hidden = false;
    }

    if (config.branding.brandLink) {
      elements.brandLink.href = config.branding.brandLink;
    }

    if (config.branding.logoUrl) {
      elements.logo.src = config.branding.logoUrl;
      elements.logo.hidden = false;
    }

    elements.shareBtn.textContent = config.actions.shareButtonText;
    elements.calendarBtn.textContent = config.actions.calendarButtonText;
    elements.calendarBtn.hidden = !config.actions.calendarEnabled;

    elements.labels.days.textContent = t.days;
    elements.labels.hours.textContent = t.hours;
    elements.labels.minutes.textContent = t.minutes;
    elements.labels.seconds.textContent = t.seconds;

    document.documentElement.lang = config.locale.split("-")[0] || "es";
  }

  function applyEventInfo() {
    if (!config.eventInfo.enabled) {
      elements.eventInfo.hidden = true;
      return;
    }

    elements.eventName.textContent = config.eventInfo.name;
    elements.eventLocation.textContent = config.eventInfo.location;
    elements.eventDescription.textContent = config.eventInfo.description;
    elements.eventInfo.hidden = false;
  }

  function applySocialLinks() {
    if (!Array.isArray(config.socialLinks) || config.socialLinks.length === 0) {
      elements.socialLinks.hidden = true;
      return;
    }

    const links = config.socialLinks
      .map(
        (item) =>
          `<a class="social-pill" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}">${item.text}</a>`,
      )
      .join("");

    elements.socialLinks.innerHTML = links;
  }

  function getTargetDate() {
    const dateTime = `${config.target.date}T${config.target.time}`;
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: config.target.timeZone,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(new Date(dateTime))
      .reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
      }, {});

    return Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );
  }

  function setTimeValues(diffMs) {
    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    elements.values.days.textContent = String(days).padStart(2, "0");
    elements.values.hours.textContent = String(hours).padStart(2, "0");
    elements.values.minutes.textContent = String(minutes).padStart(2, "0");
    elements.values.seconds.textContent = String(seconds).padStart(2, "0");
  }

  function updateCountdown() {
    const now = Date.now();
    const target = getTargetDate();
    const diff = target - now;

    if (diff >= 0) {
      setTimeValues(diff);
      elements.statusMessage.textContent = t.remaining;
      return;
    }

    if (config.behavior.showElapsedIfPassed) {
      setTimeValues(Math.abs(diff));
      elements.statusMessage.textContent = t.elapsed;
      return;
    }

    setTimeValues(0);
    elements.statusMessage.textContent = config.behavior.finalMessage;
  }

  async function sharePage() {
    const payload = {
      title: config.content.mainTitle,
      text: config.content.subtitle,
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
      const manual = `${t.shareError} ${window.location.href}`;
      alert(manual);
    }
  }

  function downloadCalendarFile() {
    const dateStart = `${config.target.date.replaceAll("-", "")}T${config.target.time.replaceAll(":", "")}`;
    const dateEndObj = new Date(`${config.target.date}T${config.target.time}`);
    dateEndObj.setHours(dateEndObj.getHours() + 1);

    const dateEnd = `${dateEndObj.getFullYear()}${String(dateEndObj.getMonth() + 1).padStart(2, "0")}${String(
      dateEndObj.getDate(),
    ).padStart(2, "0")}T${String(dateEndObj.getHours()).padStart(2, "0")}${String(
      dateEndObj.getMinutes(),
    ).padStart(2, "0")}${String(dateEndObj.getSeconds()).padStart(2, "0")}`;

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${config.content.mainTitle}`,
      `DESCRIPTION:${config.content.subtitle}`,
      `DTSTART:${dateStart}`,
      `DTEND:${dateEnd}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "evento.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function setupThemeToggle() {
    const saved = localStorage.getItem("countdown-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const activeTheme = saved || (prefersDark ? "dark" : "light");

    document.documentElement.dataset.theme = activeTheme;
    elements.themeToggle.firstElementChild.textContent = activeTheme === "dark" ? "☀️" : "🌙";

    elements.themeToggle.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("countdown-theme", nextTheme);
      elements.themeToggle.firstElementChild.textContent = nextTheme === "dark" ? "☀️" : "🌙";
    });
  }

  function setupEvents() {
    elements.shareBtn.addEventListener("click", sharePage);

    if (config.actions.calendarEnabled) {
      elements.calendarBtn.addEventListener("click", downloadCalendarFile);
    }
  }

  applyTheme();
  applyContent();
  applyEventInfo();
  applySocialLinks();
  setupThemeToggle();
  setupEvents();
  updateCountdown();

  setInterval(updateCountdown, 1000);
})();
