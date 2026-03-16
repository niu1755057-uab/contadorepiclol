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
# Contador Épico · Plantilla lista para producción

Una web estática, moderna y responsive para mostrar una cuenta regresiva (o progresiva) hacia una fecha objetivo. Está pensada para publicarse rápidamente en **GitHub Pages** sin backend.

## ✨ Características

- Contador en tiempo real (días, horas, minutos y segundos)
- Configuración centralizada en `config.js`
- Soporta:
  - fecha/hora objetivo
  - zona horaria IANA (ej: `Europe/Madrid`)
  - idioma (`es`, `en`, etc.)
  - título, subtítulo, textos de botones
  - modo terminado (mensaje final o contador transcurrido)
  - colores, tipografía y fondo (imagen o gradiente)
  - enlaces sociales y logo opcional
- Diseño responsive (móvil / tablet / escritorio)
- Modo oscuro automático + botón para alternar
- Botón para compartir enlace (Web Share API + fallback)
- Botón “Añadir al calendario” (`.ics` generado al vuelo)
- Metadatos SEO + Open Graph + favicon
- Animaciones suaves con buen rendimiento y respeto a `prefers-reduced-motion`
- Sección inferior opcional para información del evento

---

## 🧱 Estructura del proyecto

```
contadorepiclol/
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
## 🚀 Ejecutar en local

Como es un proyecto estático, puedes abrir `index.html` directamente. Aun así, se recomienda servidor local:

### Opción A: Python

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
### Opción B: VS Code Live Server

1. Instala la extensión **Live Server**.
2. Click derecho en `index.html` → **Open with Live Server**.

---

## ⚙️ Personalización rápida

Edita **solo** `assets/js/config.js` para personalizar casi todo.

### Campos clave

- `content.mainTitle`: título principal
- `content.subtitle`: subtítulo
- `target.date`: fecha objetivo (`YYYY-MM-DD`)
- `target.time`: hora objetivo (`HH:mm:ss`)
- `target.timeZone`: zona horaria IANA
- `behavior.showElapsedIfPassed`: `true` para contar tiempo transcurrido
- `behavior.finalMessage`: mensaje cuando termina
- `theme.primaryColor`, `theme.secondaryColor`, `theme.accentColor`
- `theme.fontFamily`
- `theme.background.type`: `gradient` o `image`
- `theme.background.value`: CSS de gradiente o URL de imagen
- `actions.shareButtonText`, `actions.calendarButtonText`
- `branding.logoUrl`: logo opcional
- `eventInfo.enabled`: muestra/oculta sección inferior
- `socialLinks`: redes sociales visibles

> Consejo: puedes usar imágenes en `assets/img/` y referenciarlas con rutas relativas, por ejemplo `assets/img/mi-fondo.jpg`.

---

## 🧪 Accesibilidad y buenas prácticas incluidas

- Estructura semántica (`header`, `main`, `section`, `footer`)
- Región `aria-live` para cambios del contador
- Contrastes y foco visible
- Respeto de `prefers-reduced-motion`
- Botones y enlaces con etiquetas claras

---

## 📦 Subir a GitHub (paso a paso)

1. Crea un repositorio nuevo en GitHub (por ejemplo: `contador-evento`).
2. En local, dentro de la carpeta del proyecto:

```bash
git init
git add .
git commit -m "feat: landing de reencuentro con contador en tiempo real"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/reencuentro-countdown.git
git commit -m "feat: plantilla contador en tiempo real"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/contador-evento.git
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
## 🌍 Desplegar en GitHub Pages y obtener URL pública

### Método recomendado (el más simple)

1. Ve a tu repo en GitHub.
2. Abre **Settings** → **Pages**.
3. En **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Guarda y espera 1–2 minutos.
5. GitHub te mostrará la URL pública, normalmente:
   - `https://TU_USUARIO.github.io/contador-evento/`

---

## 🧭 Recomendación de despliegue

Para este caso, la mejor opción es **GitHub Pages** porque:

- es gratis,
- no requiere backend,
- integra perfecto con repos GitHub,
- permite actualizar la web con cada `push`.

Si más adelante necesitas dominio personalizado, GitHub Pages también lo soporta.

---

## 📌 Ejemplo preconfigurado

El proyecto ya viene con un ejemplo activo para una fecha futura en `config.js`.
Solo cambia esos valores y publica.

---

## 🛠️ Ideas de reutilización

La plantilla sirve para:

- cumpleaños
- lanzamientos de producto
- bodas
- eventos corporativos
- promociones y ofertas
- estrenos

Solo cambiando texto, colores, imagen de fondo y fecha objetivo.
