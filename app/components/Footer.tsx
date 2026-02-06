export function Footer() {
  return (
    <footer
      className="mt-16 py-8 border-t"
      style={{
        backgroundColor: "var(--color-secundario)",
        borderColor: "var(--color-texto-secundario)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{
                backgroundColor: "var(--color-acentos)",
                color: "var(--color-texto-principal)",
              }}
            >
              GF
            </div>
            <span
              className="text-xl font-bold"
              style={{ color: "var(--color-texto-principal)" }}
            >
              Git<span style={{ color: "var(--color-acentos)" }}>Flix</span>
            </span>
          </div>

          <div
            className="text-center"
            style={{ color: "var(--color-texto-secundario)" }}
          >
            <p>
              © 2026 GitFlix. Datos proporcionados por The Movie Database (TMDb)
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--color-texto-secundario)" }}
            >
              TMDb
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--color-texto-secundario)" }}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
