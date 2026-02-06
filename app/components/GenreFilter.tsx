import { useState, useEffect } from "react";
import { tmdbApi } from "../services/tmdb";
import type { Genre } from "../types/movie";

interface GenreFilterProps {
  selectedGenres: number[];
  onGenreToggle: (genreId: number) => void;
}

export function GenreFilter({
  selectedGenres,
  onGenreToggle,
}: GenreFilterProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await tmdbApi.getMovieGenres();
        setGenres(response.genres);
      } catch (error) {
        console.error("Error loading genres:", error);
      }
    };
    loadGenres();
  }, []);

  const displayedGenres = isExpanded ? genres : genres.slice(0, 8);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-texto-secundario)" }}
        >
          Géneros
        </h3>
        {selectedGenres.length > 0 && (
          <button
            onClick={() => selectedGenres.forEach((id) => onGenreToggle(id))}
            className="text-xs font-medium transition-opacity hover:opacity-80"
            style={{ color: "var(--color-acentos)" }}
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {displayedGenres.map((genre) => {
          const isSelected = selectedGenres.includes(genre.id);
          return (
            <button
              key={genre.id}
              onClick={() => onGenreToggle(genre.id)}
              className="px-4 py-2 rounded-full text-xs font-medium transition-all border-2 hover:scale-105"
              style={{
                backgroundColor: isSelected
                  ? "var(--color-acentos)"
                  : "var(--color-secundario)",
                color: isSelected
                  ? "var(--color-texto-principal)"
                  : "var(--color-texto-secundario)",
                borderColor: isSelected
                  ? "var(--color-acentos)"
                  : "var(--color-texto-secundario)",
              }}
            >
              {genre.name}
            </button>
          );
        })}

        {genres.length > 8 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 rounded-full text-xs font-medium transition-all border-2 hover:scale-105"
            style={{
              backgroundColor: "var(--color-principal)",
              color: "var(--color-acentos)",
              borderColor: "var(--color-acentos)",
            }}
          >
            {isExpanded ? "Ver menos" : `+${genres.length - 8} más`}
          </button>
        )}
      </div>
    </div>
  );
}
