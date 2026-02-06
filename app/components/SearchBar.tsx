import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { tmdbApi } from "../services/tmdb";
import type { Movie } from "../types/movie";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await tmdbApi.searchMovies(query);
        setSuggestions(response.results.slice(0, 6));
        setIsOpen(true);
      } catch (error) {
        console.error("Error searching movies:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchMovies, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      if (onSearch) {
        onSearch(query);
      }
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSelectMovie = (movieId: number) => {
    setIsOpen(false);
    setQuery("");
    navigate(`/movie/${movieId}`);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <svg
            className="absolute left-4 w-5 h-5 z-10"
            style={{ color: "var(--color-texto-secundario)" }}
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
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar películas..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all text-sm"
            style={{
              backgroundColor: "var(--color-secundario)",
              borderColor: isOpen
                ? "var(--color-acentos)"
                : "var(--color-texto-secundario)",
              color: "var(--color-texto-principal)",
            }}
          />
          {isLoading && (
            <div className="absolute right-4">
              <div
                className="animate-spin rounded-full h-5 w-5 border-b-2"
                style={{ borderColor: "var(--color-acentos)" }}
              ></div>
            </div>
          )}
        </div>
      </form>

      {/* Autocompletado */}
      {isOpen && suggestions.length > 0 && (
        <div
          className="absolute top-full mt-2 w-full rounded-xl shadow-2xl overflow-hidden z-50 border"
          style={{
            backgroundColor: "var(--color-secundario)",
            borderColor: "var(--color-texto-secundario)",
          }}
        >
          <div className="max-h-96 overflow-y-auto">
            {suggestions.map((movie) => (
              <button
                key={movie.id}
                onClick={() => handleSelectMovie(movie.id)}
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors hover:opacity-80"
                style={{
                  backgroundColor: "var(--color-secundario)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-principal)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-secundario)";
                }}
              >
                <img
                  src={tmdbApi.getImageUrl(movie.poster_path, "w200")}
                  alt={movie.title}
                  className="w-12 h-18 object-cover rounded"
                />
                <div className="flex-1 text-left">
                  <h4
                    className="font-semibold text-sm line-clamp-1"
                    style={{ color: "var(--color-texto-principal)" }}
                  >
                    {movie.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-texto-secundario)" }}
                    >
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "N/A"}
                    </span>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "var(--color-texto-principal)" }}
                      >
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div
            className="px-4 py-2 text-xs text-center border-t"
            style={{
              color: "var(--color-texto-secundario)",
              borderColor: "var(--color-texto-secundario)",
            }}
          >
            Presiona Enter para ver todos los resultados
          </div>
        </div>
      )}
    </div>
  );
}
