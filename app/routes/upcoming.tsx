import { tmdbApi } from "../services/tmdb";
import { Header } from "../components/Header";
import { MovieGrid } from "../components/MovieGrid";
import { Footer } from "../components/Footer";
import { GenreFilter } from "../components/GenreFilter";
import { Pagination } from "../components/Pagination";
import { Loading } from "../components/Loading";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Film } from "lucide-react";
import type { Movie } from "../types/movie";

export function meta() {
  return [
    { title: "Próximamente - GitFlix" },
    {
      name: "description",
      content: "Películas que se estrenarán próximamente",
    },
  ];
}

export default function Upcoming() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setLoading(true);

    tmdbApi
      .getUpcomingMovies(page)
      .then((response) => {
        setMovies(response.results);
        setCurrentPage(response.page);
        setTotalPages(Math.min(response.total_pages, 500));
        setFilteredMovies(response.results);
      })
      .catch((error) => console.error("Error loading movies:", error))
      .finally(() => setLoading(false));
  }, [searchParams]);

  useEffect(() => {
    if (selectedGenres.length === 0) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) =>
        selectedGenres.some((genreId) => movie.genre_ids.includes(genreId)),
      );
      setFilteredMovies(filtered);
    }
  }, [selectedGenres, movies]);

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

  if (loading) {
    return <Loading />;
  }

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
          <Film
            className="w-10 h-10"
            style={{ color: "var(--color-acentos)" }}
          />
          <span>Próximamente</span>
        </h1>

        <div className="mb-8">
          <GenreFilter
            selectedGenres={selectedGenres}
            onGenreToggle={handleGenreToggle}
          />
        </div>

        <MovieGrid movies={filteredMovies} showFilters />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      <Footer />
    </div>
  );
}
