import type { Route } from "./+types/upcoming";
import { tmdbApi } from "../services/tmdb";
import { Header } from "../components/Header";
import { MovieGrid } from "../components/MovieGrid";
import { Footer } from "../components/Footer";
import { GenreFilter } from "../components/GenreFilter";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Próximamente - GitFlix" },
    {
      name: "description",
      content: "Películas que se estrenarán próximamente",
    },
  ];
}

export async function loader() {
  const upcomingMovies = await tmdbApi.getUpcomingMovies();
  return { movies: upcomingMovies.results };
}

export default function Upcoming({ loaderData }: Route.ComponentProps) {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [filteredMovies, setFilteredMovies] = useState(loaderData.movies);

  useEffect(() => {
    if (selectedGenres.length === 0) {
      setFilteredMovies(loaderData.movies);
    } else {
      const filtered = loaderData.movies.filter((movie) =>
        selectedGenres.some((genreId) => movie.genre_ids.includes(genreId)),
      );
      setFilteredMovies(filtered);
    }
  }, [selectedGenres, loaderData.movies]);

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId],
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-principal)" }}
    >
      <Header />

      <main className="container mx-auto py-8 px-4">
        <h1
          className="text-4xl font-bold mb-6"
          style={{ color: "var(--color-texto-principal)" }}
        >
          🎬 Próximamente
        </h1>

        <div className="mb-8">
          <GenreFilter
            selectedGenres={selectedGenres}
            onGenreToggle={handleGenreToggle}
          />
        </div>

        <MovieGrid movies={filteredMovies} />
      </main>

      <Footer />
    </div>
  );
}
