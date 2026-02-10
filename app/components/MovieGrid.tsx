import type { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";
import { SectionFilter } from "./SectionFilter";
import { useState, useEffect } from "react";

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  icon?: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  showFilters?: boolean;
}

export function MovieGrid({
  movies,
  title,
  icon: Icon,
  showFilters = false,
}: MovieGridProps) {
  const [sortedMovies, setSortedMovies] = useState(movies);

  useEffect(() => {
    setSortedMovies(movies);
  }, [movies]);

  const handleSort = (sortBy: string) => {
    const sorted = [...movies];

    switch (sortBy) {
      case "rating":
        sorted.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case "recent":
        sorted.sort((a, b) => {
          const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
          const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case "year":
        sorted.sort((a, b) => {
          const yearA = a.release_date
            ? new Date(a.release_date).getFullYear()
            : 0;
          const yearB = b.release_date
            ? new Date(b.release_date).getFullYear()
            : 0;
          return yearB - yearA;
        });
        break;
      default:
        // default order (as received)
        break;
    }

    setSortedMovies(sorted);
  };

  return (
    <section className="py-4">
      {(title || showFilters) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {title && (
            <h2
              className="text-2xl font-bold flex items-center gap-2"
              style={{ color: "var(--color-texto-principal)" }}
            >
              {Icon && (
                <Icon
                  className="w-7 h-7"
                  style={{ color: "var(--color-acentos)" }}
                />
              )}
              <span>{title}</span>
            </h2>
          )}
          {showFilters && <SectionFilter onSort={handleSort} />}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {sortedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
