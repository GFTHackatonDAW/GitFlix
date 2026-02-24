import type {
  MoviesResponse,
  MovieDetails,
  Credits,
  Genre,
  ActorDetails,
  ActorMovieCredits,
} from "../types/movie";

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

// Variable para controlar el modo mock
let useMockData = false;
let mockDataCache: any = null;

// Función para cargar mock data
async function loadMockData() {
  if (mockDataCache) {
    return mockDataCache;
  }

  try {
    const response = await fetch("/mock-data.json");
    if (response.ok) {
      mockDataCache = await response.json();
      return mockDataCache;
    }
  } catch (error) {
    console.error("Error loading mock data:", error);
  }
  return null;
}

// Función para verificar si el error es por límite de API
function isRateLimitError(error: any): boolean {
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();
    return (
      errorMessage.includes("429") ||
      errorMessage.includes("rate limit") ||
      errorMessage.includes("too many requests") ||
      errorMessage.includes("quota")
    );
  }
  return false;
}

interface FetchOptions {
  params?: Record<string, string | number>;
}

async function fetchFromTMDB<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { params = {} } = options;

  // Si ya estamos en modo mock, usar directamente mock data
  if (useMockData) {
    return getMockDataForEndpoint(endpoint, params);
  }

  if (!API_TOKEN) {
    console.warn("TMDB API Token no configurado, usando mock data");
    useMockData = true;
    return getMockDataForEndpoint(endpoint, params);
  }

  const url = new URL(`${API_URL}${endpoint}`);
  url.searchParams.append("language", "es-ES");

  if (!isJWT(API_TOKEN)) {
    url.searchParams.append("api_key", API_TOKEN);
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (isJWT(API_TOKEN)) {
    headers["Authorization"] = `Bearer ${API_TOKEN}`;
  }

  try {
    const response = await fetch(url.toString(), { headers });

    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(
        `TMDB API Error (${response.status}): ${response.statusText} - ${errorText}`,
      );

      // Si es un error de límite de API, cambiar a modo mock
      if (response.status === 429 || isRateLimitError(error)) {
        console.warn(
          "Se alcanzó el límite de la API de TMDB, cambiando a mock data",
        );
        useMockData = true;
        return getMockDataForEndpoint(endpoint, params);
      }

      throw error;
    }

    return response.json();
  } catch (error) {
    // Si hay cualquier error de red o límite, intentar usar mock data
    if (isRateLimitError(error)) {
      console.warn("Error de límite de API, usando mock data");
      useMockData = true;
      return getMockDataForEndpoint(endpoint, params);
    }
    throw error;
  }
}

// Función para obtener datos mock según el endpoint
async function getMockDataForEndpoint(
  endpoint: string,
  params: Record<string, string | number> = {},
): Promise<any> {
  const mockData = await loadMockData();

  if (!mockData) {
    throw new Error("No se pudo cargar la data mock");
  }

  // Mapear endpoints a datos mock
  if (endpoint === "/movie/popular") {
    return mockData.popular;
  }

  if (endpoint === "/movie/top_rated") {
    return mockData.topRated;
  }

  if (endpoint === "/movie/now_playing") {
    return mockData.nowPlaying;
  }

  if (endpoint === "/movie/upcoming") {
    return mockData.upcoming;
  }

  if (endpoint === "/discover/movie") {
    return mockData.popular; // Usar popular para discover
  }

  if (endpoint.startsWith("/movie/") && endpoint.endsWith("/credits")) {
    const movieId = endpoint.split("/")[2];
    return mockData.movieCredits[movieId] || mockData.movieCredits["912649"];
  }

  if (endpoint.startsWith("/movie/") && !endpoint.includes("/")) {
    const movieId = endpoint.split("/")[2];
    return mockData.movieDetails[movieId] || mockData.movieDetails["912649"];
  }

  if (endpoint === "/search/movie") {
    // Para búsquedas, devolver un subconjunto de películas populares
    const query = String(params.query || "").toLowerCase();
    const filtered = mockData.popular.results.filter((movie: any) =>
      movie.title.toLowerCase().includes(query),
    );
    return {
      ...mockData.popular,
      results: filtered.length > 0 ? filtered : mockData.popular.results,
    };
  }

  if (endpoint === "/genre/movie/list") {
    return mockData.genres;
  }

  if (endpoint.startsWith("/person/") && endpoint.endsWith("/movie_credits")) {
    const actorId = endpoint.split("/")[2];
    return (
      mockData.actorMovieCredits[actorId] || mockData.actorMovieCredits["8691"]
    );
  }

  if (endpoint.startsWith("/person/")) {
    const actorId = endpoint.split("/")[2];
    return mockData.actorDetails[actorId] || mockData.actorDetails["8691"];
  }

  // Fallback por defecto
  return mockData.popular;
}

export const tmdbApi = {
  getPopularMovies: (page: number = 1) =>
    fetchFromTMDB<MoviesResponse>("/movie/popular", { params: { page } }),

  getTopRatedMovies: (page: number = 1) =>
    fetchFromTMDB<MoviesResponse>("/movie/top_rated", { params: { page } }),

  getNowPlayingMovies: (page: number = 1) =>
    fetchFromTMDB<MoviesResponse>("/movie/now_playing", { params: { page } }),

  getUpcomingMovies: (page: number = 1) =>
    fetchFromTMDB<MoviesResponse>("/movie/upcoming", { params: { page } }),

  getMovieDetails: (movieId: number) =>
    fetchFromTMDB<MovieDetails>(`/movie/${movieId}`),

  getMovieCredits: (movieId: number) =>
    fetchFromTMDB<Credits>(`/movie/${movieId}/credits`),

  searchMovies: (query: string, page: number = 1) =>
    fetchFromTMDB<MoviesResponse>("/search/movie", { params: { query, page } }),

  getMovieGenres: () => fetchFromTMDB<{ genres: Genre[] }>("/genre/movie/list"),

  discoverMovies: (genreId?: number, page: number = 1) => {
    const params: Record<string, string | number> = { page };
    if (genreId) {
      params.with_genres = genreId;
    }
    return fetchFromTMDB<MoviesResponse>("/discover/movie", { params });
  },

  getActorDetails: (actorId: number) =>
    fetchFromTMDB<ActorDetails>(`/person/${actorId}`),

  getActorMovieCredits: (actorId: number) =>
    fetchFromTMDB<ActorMovieCredits>(`/person/${actorId}/movie_credits`),

  getImageUrl: (
    path: string | null,
    size: "w200" | "w300" | "w500" | "w780" | "original" = "w500",
  ) => {
    if (!path) return `${import.meta.env.BASE_URL}user.png`;
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },
};
