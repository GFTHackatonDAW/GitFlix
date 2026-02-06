import type {
  MoviesResponse,
  MovieDetails,
  Credits,
  Genre,
} from "../types/movie";

// Obtener la API key/token desde variables de entorno
// Soporta tanto process.env (server) como import.meta.env (client)
const getEnvVar = (key: string): string => {
  if (typeof process !== "undefined" && process.env?.[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== "undefined" && import.meta.env?.[key]) {
    return import.meta.env[key];
  }
  return "";
};

const API_TOKEN = getEnvVar("VITE_TMDB_API_KEY");
const API_URL =
  getEnvVar("VITE_TMDB_API_URL") || "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL =
  getEnvVar("VITE_TMDB_IMAGE_BASE_URL") || "https://image.tmdb.org/t/p";

// Detectar si es un Bearer Token (JWT) o API Key
const isJWT = (token: string): boolean => {
  return token.startsWith("eyJ");
};

interface FetchOptions {
  params?: Record<string, string | number>;
}

async function fetchFromTMDB<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { params = {} } = options;

  if (!API_TOKEN) {
    throw new Error(
      "TMDB API Token no configurado. Por favor, configura VITE_TMDB_API_KEY en tu archivo .env",
    );
  }

  const url = new URL(`${API_URL}${endpoint}`);
  url.searchParams.append("language", "es-ES");

  // Si no es un JWT, agregar como api_key en la URL
  if (!isJWT(API_TOKEN)) {
    url.searchParams.append("api_key", API_TOKEN);
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  // Configurar headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Si es un JWT (Bearer Token), agregarlo en los headers
  if (isJWT(API_TOKEN)) {
    headers["Authorization"] = `Bearer ${API_TOKEN}`;
  }

  const response = await fetch(url.toString(), { headers });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `TMDB API Error (${response.status}): ${response.statusText} - ${errorText}`,
    );
  }

  return response.json();
}

export const tmdbApi = {
  // Obtener películas populares
  getPopularMovies: (page: number = 1) =>
    fetchFromTMDB<MoviesResponse>("/movie/popular", { params: { page } }),

  // Obtener películas mejor valoradas
  getTopRatedMovies: (page: number = 1) =>
    fetchFromTMDB<MoviesResponse>("/movie/top_rated", { params: { page } }),

  // Obtener películas en cines
  getNowPlayingMovies: (page: number = 1) =>
    fetchFromTMDB<MoviesResponse>("/movie/now_playing", { params: { page } }),

  // Obtener películas próximamente
  getUpcomingMovies: (page: number = 1) =>
    fetchFromTMDB<MoviesResponse>("/movie/upcoming", { params: { page } }),

  // Obtener detalles de una película
  getMovieDetails: (movieId: number) =>
    fetchFromTMDB<MovieDetails>(`/movie/${movieId}`),

  // Obtener créditos de una película
  getMovieCredits: (movieId: number) =>
    fetchFromTMDB<Credits>(`/movie/${movieId}/credits`),

  // Buscar películas
  searchMovies: (query: string, page: number = 1) =>
    fetchFromTMDB<MoviesResponse>("/search/movie", { params: { query, page } }),

  // Obtener géneros de películas
  getMovieGenres: () => fetchFromTMDB<{ genres: Genre[] }>("/genre/movie/list"),

  // Descubrir películas por género
  discoverMovies: (genreId?: number, page: number = 1) => {
    const params: Record<string, string | number> = { page };
    if (genreId) {
      params.with_genres = genreId;
    }
    return fetchFromTMDB<MoviesResponse>("/discover/movie", { params });
  },

  // Construir URL de imagen
  getImageUrl: (
    path: string | null,
    size: "w200" | "w300" | "w500" | "w780" | "original" = "w500",
  ) => {
    if (!path) return "/logo.png"; // Fallback al logo
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },
};
