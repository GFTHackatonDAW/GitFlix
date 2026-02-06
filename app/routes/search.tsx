import type { Route } from "./+types/search";
import { tmdbApi } from "../services/tmdb";
import { Header } from "../components/Header";
import { MovieGrid } from "../components/MovieGrid";
import { Footer } from "../components/Footer";
import { GenreFilter } from "../components/GenreFilter";
import { useState, useEffect } from "react";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Búsqueda - GitFlix` },
    { name: "description", content: "Buscar películas" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  if (!query) {
    return { movies: [], query: "" };
  }

  const response = await tmdbApi.searchMovies(query);
  return { movies: response.results, query };
}

export default function Search({ loaderData }: Route.ComponentProps) {
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

      <main className="container mx-auto px-4 py-8">
        {loaderData.query && (
          <>
            <div className="mb-8">
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: "var(--color-texto-principal)" }}
              >
                Resultados para: "{loaderData.query}"
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
                <svg
                  className="w-24 h-24 mx-auto mb-4 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xl">
                  No se encontraron películas con los filtros seleccionados
                </p>
              </div>
            )}
          </>
        )}

        {!loaderData.query && (
          <div
            className="text-center py-16"
            style={{ color: "var(--color-texto-secundario)" }}
          >
            <svg
              className="w-24 h-24 mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
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
