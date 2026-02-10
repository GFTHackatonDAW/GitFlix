import type { Route } from "./+types/actor.$id";
import { Link } from "react-router";
import { tmdbApi } from "../services/tmdb";
import { Header } from "../components/Header";
import { MovieGrid } from "../components/MovieGrid";
import { Footer } from "../components/Footer";
import { Calendar, MapPin } from "lucide-react";

export function meta({ data }: Route.MetaArgs) {
  const actor = data?.actor;
  return [
    { title: actor ? `${actor.name} - GitFlix` : "Actor - GitFlix" },
    {
      name: "description",
      content: actor?.biography || "Información del actor",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const actorId = Number(params.id);

  if (isNaN(actorId)) {
    throw new Error("ID de actor inválido");
  }

  const [actor, movieCredits] = await Promise.all([
    tmdbApi.getActorDetails(actorId),
    tmdbApi.getActorMovieCredits(actorId),
  ]);

  const movies = movieCredits.cast
    .filter((movie) => movie.poster_path)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 20);

  return {
    actor,
    movies,
  };
}

export default function ActorDetail({ loaderData }: Route.ComponentProps) {
  const { actor, movies } = loaderData;

  const profileUrl = tmdbApi.getImageUrl(actor.profile_path, "w500");
  const age = actor.birthday
    ? new Date().getFullYear() - new Date(actor.birthday).getFullYear()
    : null;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-principal)" }}
    >
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Actor Info */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="shrink-0">
            <img
              src={profileUrl}
              alt={actor.name}
              className="w-64 md:w-80 rounded-lg shadow-2xl"
            />
          </div>

          <div className="flex-1 space-y-4">
            <h1
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "var(--color-texto-principal)" }}
            >
              {actor.name}
            </h1>

            {actor.known_for_department && (
              <p
                className="text-xl font-semibold"
                style={{ color: "var(--color-acentos)" }}
              >
                {actor.known_for_department}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-sm">
              {actor.birthday && (
                <div
                  className="flex items-center gap-2"
                  style={{ color: "var(--color-texto-secundario)" }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(actor.birthday).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {age && ` (${age} años)`}
                  </span>
                </div>
              )}

              {actor.place_of_birth && (
                <div
                  className="flex items-center gap-2"
                  style={{ color: "var(--color-texto-secundario)" }}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{actor.place_of_birth}</span>
                </div>
              )}
            </div>

            {actor.biography && (
              <div>
                <h2
                  className="text-2xl font-bold mb-3"
                  style={{ color: "var(--color-texto-principal)" }}
                >
                  Biografía
                </h2>
                <p
                  className="text-base leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--color-texto-secundario)" }}
                >
                  {actor.biography}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Movies */}
        {movies.length > 0 && (
          <div>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: "var(--color-texto-principal)" }}
            >
              Películas
            </h2>
            <MovieGrid movies={movies} />
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 font-bold py-3 px-6 rounded-lg transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--color-acentos)",
              color: "var(--color-texto-principal)",
            }}
          >
            <span>← Volver</span>
          </Link>
        </div>
      </main>

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
            : "No se pudo cargar la información del actor"}
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
