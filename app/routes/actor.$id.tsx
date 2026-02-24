import { Link, useParams } from "react-router";
import { tmdbApi } from "../services/tmdb";
import { Header } from "../components/Header";
import { MovieGrid } from "../components/MovieGrid";
import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";
import { Calendar, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import type { ActorDetails, Movie } from "../types/movie";

export function meta() {
  return [
    { title: "Actor - GitFlix" },
    {
      name: "description",
      content: "Información del actor",
    },
  ];
}

export default function ActorDetail() {
  const params = useParams();
  const [actor, setActor] = useState<ActorDetails | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const actorId = Number(params.id);

    if (isNaN(actorId)) {
      setError("ID de actor inválido");
      setLoading(false);
      return;
    }

    Promise.all([
      tmdbApi.getActorDetails(actorId),
      tmdbApi.getActorMovieCredits(actorId),
    ])
      .then(([actorData, creditsData]) => {
        setActor(actorData);
        const filteredMovies = creditsData.cast
          .filter((movie) => movie.poster_path)
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 20);
        setMovies(filteredMovies);
      })
      .catch((err) => {
        console.error("Error loading actor:", err);
        setError("No se pudo cargar la información del actor");
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !actor) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "var(--color-principal)" }}
      >
        <Header />
        <div
          className="flex-1 flex items-center justify-center px-4"
          style={{ color: "var(--color-texto-principal)" }}
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Error</h1>
            <p
              className="text-xl mb-8"
              style={{ color: "var(--color-texto-secundario)" }}
            >
              {error || "No se pudo cargar la información del actor"}
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
      </div>
    );
  }

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
