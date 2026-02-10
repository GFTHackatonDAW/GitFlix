import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { tmdbApi } from "../services/tmdb";
import type { Movie } from "../types/movie";
import { Search, Loader2, Star } from "lucide-react";

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
          <Search
            className="absolute left-4 w-5 h-5 z-10"
            style={{ color: "var(--color-texto-secundario)" }}
          />
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
              <Loader2
                className="animate-spin w-5 h-5"
                style={{ color: "var(--color-acentos)" }}
              />
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
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
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
