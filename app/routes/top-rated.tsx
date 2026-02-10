import type { Route } from "./+types/top-rated";
import { tmdbApi } from "../services/tmdb";
import { Header } from "../components/Header";
import { MovieGrid } from "../components/MovieGrid";
import { Footer } from "../components/Footer";
import { GenreFilter } from "../components/GenreFilter";
import { Pagination } from "../components/Pagination";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Star } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mejor Valoradas - GitFlix" },
    {
      name: "description",
      content: "Las películas mejor valoradas de todos los tiempos",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;

  const topRatedMovies = await tmdbApi.getTopRatedMovies(page);
  return {
    movies: topRatedMovies.results,
    currentPage: topRatedMovies.page,
    totalPages: Math.min(topRatedMovies.total_pages, 500),
  };
}

export default function TopRated({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
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

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-principal)" }}
    >
      <Header />

      <main className="container mx-auto py-8 px-4">
        <h1
          className="text-4xl font-bold mb-6 flex items-center gap-3"
          style={{ color: "var(--color-texto-principal)" }}
        >
          <Star
            className="w-10 h-10"
            style={{ color: "var(--color-acentos)" }}
          />
          <span>Mejor Valoradas</span>
        </h1>

        <div className="mb-8">
          <GenreFilter
            selectedGenres={selectedGenres}
            onGenreToggle={handleGenreToggle}
          />
        </div>

        <MovieGrid movies={filteredMovies} showFilters />

        <Pagination
          currentPage={loaderData.currentPage}
          totalPages={loaderData.totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      <Footer />
    </div>
  );
}
