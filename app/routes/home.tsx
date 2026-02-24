import { tmdbApi } from "../services/tmdb";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { MovieGrid } from "../components/MovieGrid";
import { Footer } from "../components/Footer";
import { SortFilter } from "../components/SortFilter";
import { GenreFilter } from "../components/GenreFilter";
import { Loading } from "../components/Loading";
import { useState, useEffect } from "react";
import { Flame, Film, Star, Target } from "lucide-react";
import type { Movie } from "../types/movie";

export function meta() {
  return [
    { title: "GitFlix - Las mejores películas" },
    {
      name: "description",
      content: "Descubre las películas más populares y mejor valoradas",
    },
  ];
}

export default function Home() {
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [discoverMovies, setDiscoverMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const [popular, topRated, nowPlaying, discover] = await Promise.all([
          tmdbApi.getPopularMovies(),
          tmdbApi.getTopRatedMovies(),
          tmdbApi.getNowPlayingMovies(),
          tmdbApi.discoverMovies(),
        ]);

        setHeroMovie(popular.results[0]);
        setPopularMovies(popular.results.slice(1, 13));
        setTopRatedMovies(topRated.results.slice(0, 12));
        setNowPlayingMovies(nowPlaying.results.slice(0, 12));
        setDiscoverMovies(discover.results);
        setFilteredMovies(discover.results);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, []);

  useEffect(() => {
    let movies = [...discoverMovies];

    // Filtrar por género
    if (selectedGenres.length > 0) {
      movies = movies.filter((movie) =>
        selectedGenres.some((genreId) => movie.genre_ids.includes(genreId)),
      );
    }

    // Ordenar
    movies.sort((a, b) => {
      switch (sortBy) {
        case "popularity.desc":
          return b.popularity - a.popularity;
        case "vote_average.desc":
          return b.vote_average - a.vote_average;
        case "release_date.desc":
          return (
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
          );
        case "release_date.asc":
          return (
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
          );
        case "title.asc":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredMovies(movies);
  }, [sortBy, selectedGenres, discoverMovies]);

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

      <main>
        {heroMovie && <Hero movie={heroMovie} />}

        <div className="container mx-auto space-y-12 py-8 px-4">
          <MovieGrid
            movies={popularMovies}
            title="Películas Populares"
            icon={Flame}
            showFilters
          />
          <MovieGrid
            movies={nowPlayingMovies}
            title="En Cines Ahora"
            icon={Film}
            showFilters
          />
          <MovieGrid
            movies={topRatedMovies}
            title="Mejor Valoradas"
            icon={Star}
            showFilters
          />

          {/* Sección de Descubrir con Filtros */}
          <div className="space-y-6">
            <h2
              className="text-3xl font-bold flex items-center gap-2"
              style={{ color: "var(--color-texto-principal)" }}
            >
              <Target
                className="w-8 h-8"
                style={{ color: "var(--color-acentos)" }}
              />
              <span>Descubrir Películas</span>
            </h2>

            <div className="space-y-4">
              <SortFilter selected={sortBy} onSort={setSortBy} />
              <GenreFilter
                selectedGenres={selectedGenres}
                onGenreToggle={handleGenreToggle}
              />
            </div>

            <MovieGrid movies={filteredMovies.slice(0, 18)} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
