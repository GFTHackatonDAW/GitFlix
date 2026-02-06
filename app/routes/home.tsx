import type { Route } from "./+types/home";
import { tmdbApi } from "../services/tmdb";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { MovieGrid } from "../components/MovieGrid";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GitFlix - Las mejores películas" },
    {
      name: "description",
      content: "Descubre las películas más populares y mejor valoradas",
    },
  ];
}

export async function loader() {
  const [popularMovies, topRatedMovies, nowPlayingMovies] = await Promise.all([
    tmdbApi.getPopularMovies(),
    tmdbApi.getTopRatedMovies(),
    tmdbApi.getNowPlayingMovies(),
  ]);

  return {
    heroMovie: popularMovies.results[0],
    popularMovies: popularMovies.results.slice(1, 13),
    topRatedMovies: topRatedMovies.results.slice(0, 12),
    nowPlayingMovies: nowPlayingMovies.results.slice(0, 12),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { heroMovie, popularMovies, topRatedMovies, nowPlayingMovies } =
    loaderData;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-principal)" }}
    >
      <Header />

      <main>
        {heroMovie && <Hero movie={heroMovie} />}

        <div className="container mx-auto space-y-12 py-8 px-4">
          <MovieGrid movies={popularMovies} title="🔥 Películas Populares" />
          <MovieGrid movies={nowPlayingMovies} title="🎬 En Cines Ahora" />
          <MovieGrid movies={topRatedMovies} title="⭐ Mejor Valoradas" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
