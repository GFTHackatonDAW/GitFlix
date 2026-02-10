import { Link } from "react-router";
import type { Movie } from "../types/movie";
import { tmdbApi } from "../services/tmdb";
import { Star, Eye } from "lucide-react";

interface HeroProps {
  movie: Movie;
}

export function Hero({ movie }: HeroProps) {
  const backdropUrl = tmdbApi.getImageUrl(movie.backdrop_path, "original");
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div className="relative h-[70vh] min-h-125 w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {movie.title}
          </h1>

          <div className="flex items-center space-x-6 text-white">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <span className="text-2xl font-bold">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <span className="text-xl">{year}</span>
          </div>

          <p className="text-lg text-gray-200 leading-relaxed line-clamp-4">
            {movie.overview}
          </p>

          <div className="flex space-x-4">
            <Link
              to={`/movie/${movie.id}`}
              className="font-bold py-3 px-8 rounded-lg transition-all duration-200 flex items-center space-x-2 hover:scale-105"
              style={{
                backgroundColor: "var(--color-acentos)",
                color: "var(--color-texto-principal)",
              }}
            >
              <Eye className="w-5 h-5" />
              <span>Ver Detalles</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
