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

interface FetchOptions {
  params?: Record<string, string | number>;
}

async function fetchFromTMDB<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { params = {} } = options;

  if (!API_TOKEN) {
    throw new Error("TMDB API Token no configurado");
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
    if (!path) return "/user.png";
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },
};
