import { Link } from "react-router";
import type { Movie } from "../types/movie";
import { tmdbApi } from "../services/tmdb";
import { Star, Calendar } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  compact?: boolean;
}

export function MovieCard({ movie, compact = false }: MovieCardProps) {
  const imageUrl = tmdbApi.getImageUrl(movie.poster_path, "w500");
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  // Detectar si la película no ha salido aún
  const isUpcoming = movie.release_date
    ? new Date(movie.release_date) > new Date()
    : false;

  // Usar imagen de placeholder si es próximamente y no tiene poster
  const finalImageUrl =
    isUpcoming && !movie.poster_path ? `${import.meta.env.BASE_URL}futureMovie.png` : imageUrl;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={{
        backgroundColor: "var (--color-secundario)",
      }}
    >
      {/* Poster Image */}
      <div className="aspect-2/3 overflow-hidden relative">
        <img
          src={finalImageUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {isUpcoming && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div
              className="backdrop-blur-md rounded-lg px-4 py-2 flex items-center gap-2 border-2"
              style={{
                backgroundColor: "rgba(31, 128, 224, 0.9)",
                borderColor: "var(--color-acentos)",
              }}
            >
              <Calendar
                className="w-5 h-5"
                style={{ color: "var(--color-texto-principal)" }}
              />
              <span
                className="text-sm font-bold uppercase tracking-wider"
                style={{ color: "var(--color-texto-principal)" }}
              >
                Próximamente
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Rating Badge */}
      <div
        className="absolute top-2 right-2 backdrop-blur-md rounded-lg px-2 py-1 flex items-center gap-1 border"
        style={{
          backgroundColor: "rgba(3, 14, 26, 0.85)",
          borderColor: "var(--color-texto-secundario)",
        }}
      >
        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
        <span
          className="text-xs font-bold"
          style={{ color: "var(--color-texto-principal)" }}
        >
          {movie.vote_average.toFixed(1)}
        </span>
      </div>

      {/* Info Overlay - Visible on Hover */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3
          className="font-bold text-base mb-1 line-clamp-2"
          style={{ color: "var(--color-texto-principal)" }}
        >
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs mb-2">
          <span style={{ color: "var(--color-texto-secundario)" }}>{year}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span
              className="font-semibold"
              style={{ color: "var(--color-texto-principal)" }}
            >
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        {movie.overview && !compact && (
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span
              className="font-medium"
              style={{ color: "var(--color-texto-secundario)" }}
            >
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
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
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span
              className="font-medium"
              style={{ color: "var(--color-texto-secundario)" }}
            >
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
