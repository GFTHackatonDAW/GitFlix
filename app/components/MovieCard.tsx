import { Link } from "react-router";
import type { Movie } from "../types/movie";
import { tmdbApi } from "../services/tmdb";

interface MovieCardProps {
  movie: Movie;
  compact?: boolean;
}

export function MovieCard({ movie, compact = false }: MovieCardProps) {
  const imageUrl = tmdbApi.getImageUrl(movie.poster_path, "w500");
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={{
        backgroundColor: "var (--color-secundario)",
      }}
    >
      {/* Poster Image */}
      <div className="aspect-2/3 overflow-hidden">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Rating Badge */}
      <div
        className="absolute top-2 right-2 backdrop-blur-md rounded-lg px-2 py-1 flex items-center gap-1 border"
        style={{
          backgroundColor: "rgba(3, 14, 26, 0.85)",
          borderColor: "var(--color-texto-secundario)",
        }}
      >
        <svg
          className="w-3 h-3 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-xs font-bold" style={{ color: "var(--color-texto-principal)" }}>
          {movie.vote_average.toFixed(1)}
        </span>
      </div>

      {/* Info Overlay - Visible on Hover */}
      <div
        className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
      >
        <h3
          className="font-bold text-base mb-1 line-clamp-2"
          style={{ color: "var(--color-texto-principal)" }}
        >
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs mb-2">
          <span style={{ color: "var(--color-texto-secundario)" }}>{year}</span>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold" style={{ color: "var(--color-texto-principal)" }}>
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        {movie.overview && !compact && (
          <p
            className="text-xs line-clamp-3"
            style={{ color: "var(--color-texto-secundario)" }}
          >
            {movie.overview}
          </p>
        )}
      </div>

      {/* Bottom Info - Always visible (compact mode) */}
      <div className="p-3">
        <h3
          className="font-semibold text-sm line-clamp-1 mb-1"
          style={{ color: "var(--color-texto-principal)" }}
        >
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs">
          <span style={{ color: "var(--color-texto-secundario)" }}>{year}</span>
          <span
            className="font-medium"
            style={{ color: "var(--color-texto-secundario)" }}
          >
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
