<div align="center">
  <img src="public/logo.png" alt="GitFlix Logo" width="200"/>
  
  #
  
  ### Plataforma de descubrimiento de películas
  
  [![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
  [![React Router](https://img.shields.io/badge/React_Router-7.12-red.svg)](https://reactrouter.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38bdf8.svg)](https://tailwindcss.com/)
  
  <p align="center">
    Desarrollado para el Hackathon de <strong>GFT Technologies</strong> en colaboración con <strong>Grupo San Valero</strong>
  </p>
</div>

---

## 📋 Descripción

**GitFlix** es una aplicación web moderna para explorar y descubrir películas, desarrollada con las últimas tecnologías de React y React Router. La aplicación consume la API de The Movie Database (TMDB) para ofrecer información actualizada sobre películas populares, mejor valoradas, próximos estrenos y mucho más.

La aplicación está desplegada como sitio estático en **GitHub Pages** e incluye un sistema de fallback automático con datos mock cuando se alcanza el límite de la API gratuita de TMDB.

## ✨ Características

- 🎬 **Exploración de películas**: Navega por las películas más populares, mejor valoradas y próximos estrenos
- 🔍 **Búsqueda avanzada**: Encuentra películas por título con resultados en tiempo real
- 🎭 **Información de actores**: Consulta la filmografía completa de tus actores favoritos
- 🎨 **Filtros inteligentes**: Filtra por género, ordenación y sección
- 📱 **Diseño responsive**: Experiencia optimizada para todos los dispositivos
- ⚡ **SPA optimizada**: Aplicación de página única con carga rápida
- 🎯 **Interfaz intuitiva**: Navegación fluida con React Router 7
- 🛡️ **Sistema de fallback**: Datos mock automáticos cuando la API alcanza su límite
- 🚀 **Despliegue continuo**: GitHub Actions para deploy automático a GitHub Pages

## 🛠️ Tecnologías Utilizadas

- **[React 19](https://react.dev/)** - Biblioteca de interfaz de usuario
- **[React Router 7](https://reactrouter.com/)** - Enrutamiento (SPA mode)
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Vite](https://vite.dev/)** - Build tool y desarrollo local
- **[Lucide React](https://lucide.dev/)** - Iconos SVG
- **[TMDB API](https://www.themoviedb.org/documentation/api)** - Base de datos de películas
- **[GitHub Pages](https://pages.github.com/)** - Hosting estático
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD

## 📦 Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta en [The Movie Database (TMDB)](https://www.themoviedb.org/) para obtener una API Key (opcional, la app funcionará con mock data si no está configurada)

## 🚀 Instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/gitflix.git
   cd gitflix
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno (opcional)**

   Crea un archivo `.env` en la raíz del proyecto:

   ```env
   VITE_TMDB_API_KEY=tu_api_key_aqui
   VITE_TMDB_API_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

   > 💡 **Obtén tu API Key**: Regístrate en [TMDB](https://www.themoviedb.org/settings/api) y genera tu API Key en la sección de configuración.
   >
   > ⚠️ **Nota**: Si no configuras la API Key, la aplicación funcionará automáticamente con datos mock locales.

4. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Scripts Disponibles

```bash
npm run dev              # Inicia el servidor de desarrollo
npm run build            # Genera la build de producción
npm run build:gh-pages   # Build para GitHub Pages con base path
npm run start            # Inicia el servidor de producción
npm run typecheck        # Verifica los tipos de TypeScript
npm run preview          # Preview de la build de producción
```

## 🚀 Despliegue a GitHub Pages

La aplicación está configurada para desplegarse automáticamente en GitHub Pages desde la rama `production/preview`.

### Configuración inicial:

1. **Habilita GitHub Pages en tu repositorio**:
   - Ve a Settings → Pages
   - En "Build and deployment", selecciona "GitHub Actions"

2. **Configura el secret de la API** (opcional):
   - Ve a Settings → Secrets and variables → Actions
   - Crea un nuevo secret llamado `VITE_TMDB_API_KEY` con tu API Key de TMDB
   - Si no configuras este secret, la app usará mock data automáticamente

3. **Actualiza el base path**:
   - En `package.json`, cambia `/GitFlix-Test/` por `/<tu-repo-name>/` en el script `build:gh-pages`
   - En `.github/workflows/deploy.yml`, actualiza también el `VITE_BASE_PATH`

4. **Push a la rama production/preview**:
   ```bash
   git checkout -b production/preview
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin production/preview
   ```

El workflow de GitHub Actions se ejecutará automáticamente y desplegará tu aplicación.

## 🛡️ Sistema de Fallback con Mock Data

La aplicación incluye un sistema inteligente de fallback que detecta automáticamente cuando:

- No hay API Key configurada
- Se alcanza el límite de peticiones de la API gratuita (error 429)
- Hay problemas de conexión con la API de TMDB

En estos casos, la aplicación **cambia automáticamente a usar datos mock** almacenados en `/public/mock-data.json`, garantizando que la app siga funcionando correctamente.

### Cómo funciona:

1. La aplicación intenta llamar a la API de TMDB
2. Si detecta un error de límite o falta de API Key:
   - Imprime un warning en consola
   - Carga los datos desde `mock-data.json`
   - Marca el modo mock como activo para futuras peticiones
3. El usuario puede seguir navegando sin interrupciones

### Datos mock incluidos:

- ✅ Películas populares
- ✅ Películas mejor valoradas
- ✅ Películas en cartelera
- ✅ Próximos estrenos
- ✅ Géneros de películas
- ✅ Detalles de películas
- ✅ Créditos y elenco
- ✅ Información de actores
- ✅ Búsqueda de películas

## 📁 Estructura del Proyecto

```
gitflix/
├── app/
│   ├── components/      # Componentes reutilizables
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── MovieCard.tsx
│   │   ├── MovieGrid.tsx
│   │   ├── SearchBar.tsx
│   │   └── ...
│   ├── routes/          # Rutas de la aplicación
│   │   ├── home.tsx
│   │   ├── movie.$id.tsx
│   │   ├── actor.$id.tsx
│   │   ├── search.tsx
│   │   └── ...
│   ├── services/        # Integración con APIs
│   │   └── tmdb.ts
│   ├── types/           # Definiciones de TypeScript
│   │   └── movie.ts
│   ├── app.css          # Estilos globales
│   └── root.tsx         # Componente raíz
├── public/              # Archivos estáticos
└── package.json
```

## 🎯 Rutas Principales

- `/` - Página principal con películas destacadas
- `/popular` - Películas más populares
- `/top-rated` - Películas mejor valoradas
- `/upcoming` - Próximos estrenos
- `/search` - Búsqueda de películas
- `/movie/:id` - Detalles de una película
- `/actor/:id` - Información de un actor

## 🎨 Características Técnicas

- **Single Page Application (SPA)**: Aplicación de una sola página optimizada para GitHub Pages
- **Type Safety**: TypeScript en toda la aplicación
- **Error Handling**: Sistema robusto de manejo de errores con fallback automático
- **Mock Data Fallback**: Sistema inteligente que detecta límites de API y usa datos locales
- **Lazy Loading**: Carga optimizada de imágenes
- **Responsive Design**: Mobile-first con Tailwind CSS
- **Accessibility**: Semántica HTML y navegación por teclado
- **CI/CD**: Deploy automático con GitHub Actions

## 🔧 Configuración de Variables de Entorno

La aplicación soporta las siguientes variables de entorno:

| Variable                   | Descripción                 | Requerido | Default                        |
| -------------------------- | --------------------------- | --------- | ------------------------------ |
| `VITE_TMDB_API_KEY`        | API Key de TMDB             | No\*      | -                              |
| `VITE_TMDB_API_URL`        | URL base de la API          | No        | `https://api.themoviedb.org/3` |
| `VITE_TMDB_IMAGE_BASE_URL` | URL base para imágenes      | No        | `https://image.tmdb.org/t/p`   |
| `VITE_BASE_PATH`           | Base path para GitHub Pages | No        | `/`                            |

\* Si no se configura, la app usará mock data automáticamente.

## 🐳 Docker

El proyecto incluye un `Dockerfile` para facilitar el despliegue:

```bash
docker build -t gitflix .
docker run -p 3000:3000 gitflix
```

## 👥 Autores

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/rub3nnn">
          <img src="https://github.com/rub3nnn.png" width="100px;" alt="rub3nnn"/><br />
          <sub><b>@rub3nnn</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/mt22hugo">
          <img src="https://github.com/mt22hugo.png" width="100px;" alt="mt22hugo"/><br />
          <sub><b>@mt22hugo</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/Javiii3r">
          <img src="https://github.com/Javiii3r.png" width="100px;" alt="Javiii3r"/><br />
          <sub><b>@Javiii3r</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/LauraLG2000">
          <img src="https://github.com/LauraLG2000.png" width="100px;" alt="LauraLG2000"/><br />
          <sub><b>@LauraLG2000</b></sub>
        </a>
      </td>
    </tr>
  </table>
</div>

## 🏆 Créditos

<div align="center">
  <p>Proyecto desarrollado para el Hackathon organizado por:</p>
  
  ### GFT Technologies
  
  **&**
  
  ### Grupo San Valero
  
  ---
  
  <p><em>Hackathon 2026</em></p>
</div>

## 📄 Licencia

Este proyecto fue creado con fines educativos como parte de un hackathon.

## 🙏 Agradecimientos

- **The Movie Database (TMDB)** por proporcionar la API de películas
- **GFT Technologies** por organizar el hackathon
- **Grupo San Valero** por el apoyo y colaboración
- La comunidad de React y React Router por las excelentes herramientas

---

<div align="center">
  <p>Hecho con ❤️ para el Hackathon GFT Technologies x Grupo San Valero</p>
</div>
