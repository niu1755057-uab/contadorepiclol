# 💛 Reencuentro Countdown

Landing page estática y emocional para contar el tiempo que falta para volver a ver a alguien especial.

> Diseñada para ser **bonita, rápida y fácil de personalizar** sin tocar código complejo.

---

## 1) Arquitectura elegida (simple y rápida)

Se usa una arquitectura **100% estática**:

- `index.html`: estructura y contenido accesible.
- `assets/css/styles.css`: diseño moderno, responsive y elegante.
- `assets/js/config.js`: toda la personalización centralizada.
- `assets/js/app.js`: lógica del contador, compartir, calendario y tema.

✅ Esta opción es la más práctica para publicar en **GitHub Pages**.

---

## 2) Árbol de carpetas

```text
reencuentro-countdown/
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ styles.css
│  ├─ js/
│  │  ├─ config.js
│  │  └─ app.js
│  └─ img/
│     ├─ favicon.svg
│     └─ og-preview.svg
├─ .gitignore
└─ README.md
```

---

## 3) Personalización rápida (solo `config.js`)

Abre `assets/js/config.js` y edita:

- **Título principal**: `content.mainTitle`
- **Descripción/subtítulo**: `content.subtitle`
- **Frase emocional**: `content.dedication`
- **Fecha y hora**: `target.date`, `target.time`
- **Zona horaria**: `target.timeZone`
- **Mensaje final**: `behavior.finalMessage`
- **Colores y tipografías**: `theme.*`
- **Fondo**: `theme.background.type` + `theme.background.value`
- **Botones**: `actions.shareButtonText`, `actions.calendarButtonText`
- **Redes sociales**: `socialLinks`
- **Logo opcional**: `branding.logoUrl`
- **Sección inferior**: `eventDetails.enabled`

### Ejemplo: usar imagen de fondo

```js
theme: {
  // ...
  background: {
    type: "image",
    value: "url('assets/img/mi-fondo.jpg')",
  },
}
```

---

## 4) Ejecutar en local

### Opción recomendada (Python)

```bash
python3 -m http.server 8080
```

Abre: `http://localhost:8080`

### Opción alternativa

Abrir `index.html` directamente en el navegador (funciona, pero mejor con servidor local).

---

## 5) Subir a GitHub (paso a paso)

1. Crea un repo nuevo en GitHub (ej: `reencuentro-countdown`).
2. En la carpeta del proyecto:

```bash
git init
git add .
git commit -m "feat: landing de reencuentro con contador en tiempo real"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/reencuentro-countdown.git
git push -u origin main
```

---

## 6) Publicar en GitHub Pages y obtener URL pública

1. En tu repo: **Settings** → **Pages**.
2. En **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
3. Guardar.
4. Espera 1–2 minutos.
5. GitHub mostrará la URL pública, normalmente:

```text
https://TU_USUARIO.github.io/reencuentro-countdown/
```

---

## 7) Recomendación de despliegue

La mejor opción aquí es **GitHub Pages** porque:

- es gratis,
- no requiere backend,
- se publica en minutos,
- se actualiza con cada `git push`.

---

## 8) Funcionalidades incluidas

- Contador en tiempo real (días, horas, minutos, segundos).
- Soporte de zona horaria IANA (`Europe/Madrid`, `America/Mexico_City`, etc.).
- Si la fecha ya pasó:
  - mensaje final personalizado, o
  - contador de tiempo transcurrido (`showElapsedIfPassed: true`).
- Diseño responsive (móvil, tablet, escritorio).
- Estética emocional para reencuentros.
- Botón para compartir enlace.
- Botón para descargar recordatorio de calendario (`.ics`).
- Modo oscuro/claro con preferencia guardada.
- SEO básico + Open Graph + favicon.
- Accesibilidad: semántica, foco visible, `aria-live`, `prefers-reduced-motion`.

---

## 9) Consejos para editarlo en 5 minutos

1. Cambia fecha/hora en `target`.
2. Escribe tu título y dedicatoria en `content`.
3. Ajusta paleta en `theme`.
4. (Opcional) añade imagen de fondo y logo.
5. Publica en GitHub Pages.

Listo: tendrás tu enlace público para compartir.
