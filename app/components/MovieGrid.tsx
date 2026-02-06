import type { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  title?: string;
}

export function MovieGrid({ movies, title }: MovieGridProps) {
  return (
    <section className="py-4">
      {title && (
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: "var(--color-texto-principal)" }}
        >
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
