import { Link } from "react-router";
import type { Movie } from "../types/movie";
import { tmdbApi } from "../services/tmdb";

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
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
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
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Ver Detalles</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
