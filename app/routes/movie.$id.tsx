import type { Route } from "./+types/movie.$id";
import { Link } from "react-router";
import { tmdbApi } from "../services/tmdb";
import { Header } from "../components/Header";
import { MovieGrid } from "../components/MovieGrid";
import { Footer } from "../components/Footer";

export function meta({ data }: Route.MetaArgs) {
  const movie = data?.movie;
  return [
    { title: movie ? `${movie.title} - GitFlix` : "Película - GitFlix" },
    {
      name: "description",
      content: movie?.overview || "Detalles de la película",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const movieId = Number(params.id);

  if (isNaN(movieId)) {
    throw new Error("ID de película inválido");
  }

  const [movie, credits, similar] = await Promise.all([
    tmdbApi.getMovieDetails(movieId),
    tmdbApi.getMovieCredits(movieId),
    tmdbApi.getPopularMovies(), // Películas similares/recomendadas
  ]);

  return {
    movie,
    credits,
    similarMovies: similar.results.slice(0, 12),
  };
}

export default function MovieDetail({ loaderData }: Route.ComponentProps) {
  const { movie, credits, similarMovies } = loaderData;

  const backdropUrl = tmdbApi.getImageUrl(movie.backdrop_path, "original");
  const posterUrl = tmdbApi.getImageUrl(movie.poster_path, "w500");
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`
    : "N/A";

  const director = credits.crew.find((person) => person.job === "Director");
  const mainCast = credits.cast.slice(0, 6);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-principal)" }}
    >
      <Header />

      {/* Hero Section */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat h-150"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/90 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Poster */}
            <div className="shrink-0">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-64 md:w-80 rounded-lg shadow-2xl"
              />
            </div>

            {/* Info */}
            <div
              className="flex-1 space-y-6 pt-8"
              style={{ color: "var(--color-texto-principal)" }}
            >
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-2">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p
                    className="text-xl italic"
                    style={{ color: "var(--color-acentos)" }}
                  >
                    "{movie.tagline}"
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-lg">
                <div className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-bold">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{movie.vote_average.toFixed(1)}/10</span>
                </div>
                <span
                  className="px-4 py-2 rounded-full"
                  style={{ backgroundColor: "var(--color-secundario)" }}
                >
                  {year}
                </span>
                <span
                  className="px-4 py-2 rounded-full"
                  style={{ backgroundColor: "var(--color-secundario)" }}
                >
                  {runtime}
                </span>
                <span
                  className="px-4 py-2 rounded-full capitalize"
                  style={{ backgroundColor: "var(--color-secundario)" }}
                >
                  {movie.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: "var(--color-acentos)",
                      color: "var(--color-texto-principal)",
                    }}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">Sinopsis</h2>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "var(--color-texto-secundario)" }}
                >
                  {movie.overview || "No hay sinopsis disponible."}
                </p>
              </div>

              {director && (
                <div>
                  <h3 className="text-xl font-bold mb-2">Director</h3>
                  <p
                    className="text-lg"
                    style={{ color: "var(--color-acentos)" }}
                  >
                    {director.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {mainCast.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "var(--color-texto-principal)" }}
          >
            Reparto Principal
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {mainCast.map((actor) => (
              <Link
                key={actor.id}
                to={`/actor/${actor.id}`}
                className="text-center group cursor-pointer hover:scale-105 transition-transform"
              >
                <div
                  className="aspect-2/3 overflow-hidden rounded-lg mb-3"
                  style={{ backgroundColor: "var(--color-secundario)" }}
                >
                  <img
                    src={tmdbApi.getImageUrl(actor.profile_path, "w200")}
                    alt={actor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                </div>
                <h3
                  className="font-semibold text-sm group-hover:opacity-80"
                  style={{ color: "var(--color-texto-principal)" }}
                >
                  {actor.name}
                </h3>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-texto-secundario)" }}
                >
                  {actor.character}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="container mx-auto px-4 py-8">
        <div
          className="backdrop-blur-sm rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{
            backgroundColor: "var(--color-secundario)",
            color: "var(--color-texto-principal)",
          }}
        >
          <div>
            <h3
              className="font-bold mb-2"
              style={{ color: "var(--color-acentos)" }}
            >
              Presupuesto
            </h3>
            <p className="text-lg">
              {movie.budget > 0
                ? `$${movie.budget.toLocaleString()}`
                : "No disponible"}
            </p>
          </div>
          <div>
            <h3
              className="font-bold mb-2"
              style={{ color: "var(--color-acentos)" }}
            >
              Recaudación
            </h3>
            <p className="text-lg">
              {movie.revenue > 0
                ? `$${movie.revenue.toLocaleString()}`
                : "No disponible"}
            </p>
          </div>
          <div>
            <h3
              className="font-bold mb-2"
              style={{ color: "var(--color-acentos)" }}
            >
              Votos
            </h3>
            <p className="text-lg">{movie.vote_count.toLocaleString()} votos</p>
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="container mx-auto py-12">
          <MovieGrid
            movies={similarMovies}
            title="También te puede interesar"
          />
        </div>
      )}

      {/* Back Button */}
      <div className="container mx-auto px-4 pb-12">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 font-bold py-3 px-6 rounded-lg transition-all hover:scale-105"
          style={{
            backgroundColor: "var(--color-acentos)",
            color: "var(--color-texto-principal)",
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Volver al Inicio</span>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--color-principal)" }}
    >
      <Header />
      <div
        className="text-center px-4"
        style={{ color: "var(--color-texto-principal)" }}
      >
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p
          className="text-xl mb-8"
          style={{ color: "var(--color-texto-secundario)" }}
        >
          {error instanceof Error
            ? error.message
            : "No se pudo cargar la película"}
        </p>
        <Link
          to="/"
          className="inline-block font-bold py-3 px-6 rounded-lg transition-all hover:scale-105"
          style={{
            backgroundColor: "var(--color-acentos)",
            color: "var(--color-texto-principal)",
          }}
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
