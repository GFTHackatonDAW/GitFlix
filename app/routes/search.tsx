import { tmdbApi } from "../services/tmdb";
import { Header } from "../components/Header";
import { MovieGrid } from "../components/MovieGrid";
import { Footer } from "../components/Footer";
import { GenreFilter } from "../components/GenreFilter";
import { Loading } from "../components/Loading";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Frown, Search as SearchIcon } from "lucide-react";
import type { Movie } from "../types/movie";

export function meta() {
  return [
    { title: `Búsqueda - GitFlix` },
    { name: "description", content: "Buscar películas" },
  ];
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);

    if (!q) {
      setMovies([]);
      setFilteredMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    tmdbApi
      .searchMovies(q)
      .then((response) => {
        setMovies(response.results);
        setFilteredMovies(response.results);
      })
      .catch((error) => console.error("Error searching movies:", error))
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-principal)" }}
    >
      <Header />

      <main className="container mx-auto px-4 py-8">
        {query && (
          <>
            <div className="mb-8">
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: "var(--color-texto-principal)" }}
              >
                Resultados para: "{query}"
              </h1>
              <p style={{ color: "var(--color-texto-secundario)" }}>
                {filteredMovies.length} película(s) encontrada(s)
              </p>
            </div>

            {/* Filtros de Género */}
            <div className="mb-8">
              <GenreFilter
                selectedGenres={selectedGenres}
                onGenreToggle={handleGenreToggle}
              />
            </div>

            {filteredMovies.length > 0 ? (
              <MovieGrid movies={filteredMovies} />
            ) : (
              <div
                className="text-center py-16"
                style={{ color: "var(--color-texto-secundario)" }}
              >
                <Frown className="w-24 h-24 mx-auto mb-4 opacity-50" />
                <p className="text-xl">
                  No se encontraron películas con los filtros seleccionados
                </p>
              </div>
            )}
          </>
        )}

        {!query && (
          <div
            className="text-center py-16"
            style={{ color: "var(--color-texto-secundario)" }}
          >
            <SearchIcon className="w-24 h-24 mx-auto mb-4 opacity-50" />
            <p className="text-xl">
              Usa el buscador en la parte superior para encontrar películas
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
