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

## 🚀 Ejecutar en local

Como es un proyecto estático, puedes abrir `index.html` directamente. Aun así, se recomienda servidor local:

### Opción A: Python

```bash
python3 -m http.server 8080
```

Abre: `http://localhost:8080`

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
git commit -m "feat: plantilla contador en tiempo real"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/contador-evento.git
git push -u origin main
```

---

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
