(function initCountdownApp() {
  const config = window.COUNTDOWN_CONFIG;
  if (!config) { console.error("No se encontró COUNTDOWN_CONFIG en window."); return; }

  const $ = (id) => document.getElementById(id);
  const el = {
    mainTitle: $("main-title"), subtitle: $("subtitle"), dedication: $("dedication"),
    heroTag: $("hero-tag"), statusMessage: $("status-message"), footerNote: $("footer-note"),
    brandName: $("brand-name"), brandLink: $("brand-link"), brandLogo: $("brand-logo"),
    shareBtn: $("share-btn"), calendarBtn: $("calendar-btn"),
    themeToggle: $("theme-toggle"), themeToggleText: $("theme-toggle-text"),
    socialLinks: $("social-links"), eventDetails: $("event-details"),
    eventName: $("event-name"), eventLocation: $("event-location"),
    eventDescription: $("event-description"), eventSpecialMessage: $("event-special-message"),
    values: { days: $("days"), hours: $("hours"), minutes: $("minutes"), seconds: $("seconds") },
    labels: { days: $("label-days"), hours: $("label-hours"), minutes: $("label-minutes"), seconds: $("label-seconds") },
  };

  const I18N = {
    "es-ES": { days:"Días", hours:"Horas", minutes:"Minutos", seconds:"Segundos",
      remaining:"Tiempo restante", elapsed:"Tiempo desde el reencuentro",
      copied:"Enlace copiado al portapapeles",
      shareError:"No se pudo compartir automáticamente. Copia este enlace:",
      remember:"Recordatorio creado (.ics)", light:"Claro", dark:"Oscuro" },
    "en-US": { days:"Days", hours:"Hours", minutes:"Minutes", seconds:"Seconds",
      remaining:"Time remaining", elapsed:"Time since reunion",
      copied:"Link copied to clipboard", shareError:"Couldn't share automatically. Copy this link:",
      remember:"Reminder created (.ics)", light:"Light", dark:"Dark" },
  };
  const t = I18N[config.locale] || I18N["es-ES"];

  function getTimeZoneOffsetMs(timeZone, timestamp) {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone, hour12:false, year:"numeric",
      month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit", second:"2-digit" })
      .formatToParts(new Date(timestamp)).reduce((acc, p) => { acc[p.type]=p.value; return acc; }, {});
    return Date.UTC(+parts.year, +parts.month-1, +parts.day, +parts.hour, +parts.minute, +parts.second) - timestamp;
  }

  function zonedDateTimeToEpochMs(date, time, timeZone) {
    const [y,mo,d] = date.split("-").map(Number), [h,mi,s] = time.split(":").map(Number);
    let guess = Date.UTC(y, mo-1, d, h, mi, s);
    for (let i=0; i<3; i++) guess = Date.UTC(y, mo-1, d, h, mi, s) - getTimeZoneOffsetMs(timeZone, guess);
    return guess;
  }

  function applyTheme() {
    const r = document.documentElement;
    r.style.setProperty("--heading-font", config.theme.headingFont);
    r.style.setProperty("--body-font", config.theme.bodyFont);
    r.style.setProperty("--primary", config.theme.primaryColor);
    r.style.setProperty("--secondary", config.theme.secondaryColor);
    r.style.setProperty("--accent", config.theme.accentColor);
    r.style.setProperty("--text", config.theme.textColor);
    r.style.setProperty("--overlay", config.theme.overlayColor);
    const bg = document.querySelector(".background-layer");
    if (config.theme.background.type === "image") {
      bg.style.backgroundImage = `${config.theme.background.value}, linear-gradient(135deg,#1f1636,#3e2b63)`;
      bg.style.backgroundSize = "cover"; bg.style.backgroundPosition = "center";
    } else { bg.style.backgroundImage = config.theme.background.value; }
  }

  function applyContent() {
    el.mainTitle.textContent = config.content.mainTitle;
    el.subtitle.textContent = config.content.subtitle;
    el.dedication.textContent = config.content.dedication;
    el.footerNote.textContent = config.content.footerNote;
    el.brandName.textContent = config.content.brandName;
    if (config.content.heroTag) { el.heroTag.textContent = config.content.heroTag; el.heroTag.hidden = false; }
    if (config.branding.brandLink) el.brandLink.href = config.branding.brandLink;
    if (config.branding.logoUrl) { el.brandLogo.src = config.branding.logoUrl; el.brandLogo.hidden = false; }
    el.shareBtn.textContent = config.actions.shareButtonText;
    el.calendarBtn.textContent = config.actions.calendarButtonText;
    el.calendarBtn.hidden = !config.actions.calendarEnabled;
    el.labels.days.textContent = t.days; el.labels.hours.textContent = t.hours;
    el.labels.minutes.textContent = t.minutes; el.labels.seconds.textContent = t.seconds;
    document.documentElement.lang = config.locale.startsWith("en") ? "en" : "es";
  }

  function applyEventDetails() {
    if (!config.eventDetails?.enabled) { el.eventDetails.hidden = true; return; }
    el.eventName.textContent = config.eventDetails.name;
    el.eventLocation.textContent = config.eventDetails.location;
    el.eventDescription.textContent = config.eventDetails.description;
    el.eventSpecialMessage.textContent = config.eventDetails.specialMessage;
    el.eventDetails.hidden = false;
  }

  function renderSocialLinks() {
    if (!config.socialLinks?.length) { el.socialLinks.hidden = true; return; }
    el.socialLinks.innerHTML = config.socialLinks.map(l =>
      `<a class="social-pill" href="${l.url}" target="_blank" rel="noopener noreferrer" aria-label="${l.label}">${l.text}</a>`
    ).join("");
  }

  function setCountdownValues(ms) {
    const s = Math.floor(ms/1000);
    el.values.days.textContent    = String(Math.floor(s/86400)).padStart(2,"0");
    el.values.hours.textContent   = String(Math.floor((s%86400)/3600)).padStart(2,"0");
    el.values.minutes.textContent = String(Math.floor((s%3600)/60)).padStart(2,"0");
    el.values.seconds.textContent = String(s%60).padStart(2,"0");
  }

  const targetEpoch = zonedDateTimeToEpochMs(config.target.date, config.target.time, config.target.timeZone);

  function updateCountdown() {
    const diff = targetEpoch - Date.now();
    if (diff >= 0) {
      setCountdownValues(diff);
      el.statusMessage.textContent = `${t.remaining} · ${config.target.timeZone}`;
    } else if (config.behavior.showElapsedIfPassed) {
      setCountdownValues(Math.abs(diff)); el.statusMessage.textContent = t.elapsed;
    } else {
      setCountdownValues(0); el.statusMessage.textContent = config.behavior.finalMessage;
    }
  }

  async function onShare() {
    const payload = { title: config.content.mainTitle,
      text: `${config.content.subtitle} ${config.content.dedication}`, url: location.href };
    try {
      if (navigator.share) { await navigator.share(payload); return; }
      await navigator.clipboard.writeText(location.href); alert(t.copied);
    } catch { alert(`${t.shareError} ${location.href}`); }
  }

  function onCalendarDownload() {
    const fmt = d => `${d.getUTCFullYear()}${String(d.getUTCMonth()+1).padStart(2,"0")}${String(d.getUTCDate()).padStart(2,"0")}T${String(d.getUTCHours()).padStart(2,"0")}${String(d.getUTCMinutes()).padStart(2,"0")}${String(d.getUTCSeconds()).padStart(2,"0")}Z`;
    const start = new Date(targetEpoch), end = new Date(targetEpoch + 3600000);
    const ics = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Reencuentro Countdown//ES",
      "BEGIN:VEVENT",`UID:reencuentro-${targetEpoch}@countdown.local`,
      `DTSTAMP:${fmt(new Date())}`,`DTSTART:${fmt(start)}`,`DTEND:${fmt(end)}`,
      `SUMMARY:${config.content.mainTitle}`,
      `DESCRIPTION:${config.content.subtitle} ${config.content.dedication}`,
      "END:VEVENT","END:VCALENDAR"].join("\n");
    const url = URL.createObjectURL(new Blob([ics], {type:"text/calendar;charset=utf-8"}));
    Object.assign(document.createElement("a"), {href:url, download:"reencuentro.ics"}).click();
    URL.revokeObjectURL(url); alert(t.remember);
  }

  function initTheme() {
    const stored = localStorage.getItem("reencuentro-theme");
    const initial = stored || (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = initial;
    const update = () => {
      const dark = document.documentElement.dataset.theme === "dark";
      el.themeToggle.firstElementChild.textContent = dark ? "☀️" : "🌙";
      el.themeToggleText.textContent = dark ? t.light : t.dark;
    };
    update();
    el.themeToggle.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("reencuentro-theme", next); update();
    });
  }

  applyTheme(); applyContent(); applyEventDetails(); renderSocialLinks(); initTheme();
  el.shareBtn.addEventListener("click", onShare);
  if (config.actions.calendarEnabled) el.calendarBtn.addEventListener("click", onCalendarDownload);
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
