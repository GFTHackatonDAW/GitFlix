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

## ✨ Características

- 🎬 **Exploración de películas**: Navega por las películas más populares, mejor valoradas y próximos estrenos
- 🔍 **Búsqueda avanzada**: Encuentra películas por título con resultados en tiempo real
- 🎭 **Información de actores**: Consulta la filmografía completa de tus actores favoritos
- 🎨 **Filtros inteligentes**: Filtra por género, ordenación y sección
- 📱 **Diseño responsive**: Experiencia optimizada para todos los dispositivos
- ⚡ **Rendimiento optimizado**: Carga rápida con Server-Side Rendering (SSR)
- 🎯 **Interfaz intuitiva**: Navegación fluida con React Router 7

## 🛠️ Tecnologías Utilizadas

- **[React 19](https://react.dev/)** - Biblioteca de interfaz de usuario
- **[React Router 7](https://reactrouter.com/)** - Enrutamiento y SSR
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Vite](https://vite.dev/)** - Build tool y desarrollo local
- **[Lucide React](https://lucide.dev/)** - Iconos SVG
- **[TMDB API](https://www.themoviedb.org/documentation/api)** - Base de datos de películas

## 📦 Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta en [The Movie Database (TMDB)](https://www.themoviedb.org/) para obtener una API Key

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

3. **Configura las variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto:

   ```env
   VITE_TMDB_API_KEY=tu_api_key_aqui
   VITE_TMDB_API_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

   > 💡 **Obtén tu API Key**: Regístrate en [TMDB](https://www.themoviedb.org/settings/api) y genera tu API Key en la sección de configuración.

4. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Scripts Disponibles

```bash
npm run dev        # Inicia el servidor de desarrollo
npm run build      # Genera la build de producción
npm run start      # Inicia el servidor de producción
npm run typecheck  # Verifica los tipos de TypeScript
```

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

- **Server-Side Rendering (SSR)**: Mejor SEO y rendimiento inicial
- **Type Safety**: TypeScript en toda la aplicación
- **Error Boundaries**: Manejo robusto de errores
- **Lazy Loading**: Carga optimizada de imágenes
- **Responsive Design**: Mobile-first con Tailwind CSS
- **Accessibility**: Semántica HTML y navegación por teclado

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
