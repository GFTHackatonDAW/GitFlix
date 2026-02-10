import { Link } from "react-router";
import { SearchBar } from "./SearchBar";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className="shadow-xl sticky top-0 z-50 backdrop-blur-sm"
      style={{
        backgroundColor: "var(--color-principal)",
        borderBottom: "1px solid var(--color-texto-secundario)",
      }}
    >
      <div className="container mx-auto px-4 py-4">
        {/* Desktop Layout */}
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity shrink-0"
          >
            <img src="/logo.png" className="w-25"></img>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <SearchBar />
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg transition-all font-medium text-sm hover:scale-105"
              style={{ color: "var(--color-texto-principal)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-acentos)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Inicio
            </Link>
            <Link
              to="/popular"
              className="px-4 py-2 rounded-lg transition-all font-medium text-sm hover:scale-105"
              style={{ color: "var(--color-texto-principal)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-acentos)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Populares
            </Link>
            <Link
              to="/top-rated"
              className="px-4 py-2 rounded-lg transition-all font-medium text-sm hover:scale-105"
              style={{ color: "var(--color-texto-principal)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-acentos)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Top
            </Link>
            <Link
              to="/upcoming"
              className="px-4 py-2 rounded-lg transition-all font-medium text-sm hover:scale-105"
              style={{ color: "var(--color-texto-principal)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-acentos)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Próximamente
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            style={{ color: "var(--color-texto-principal)" }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <SearchBar />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav
            className="md:hidden mt-4 pt-4 border-t space-y-2"
            style={{ borderColor: "var(--color-texto-secundario)" }}
          >
            <Link
              to="/"
              className="block px-4 py-2 rounded-lg transition-all font-medium"
              style={{
                color: "var(--color-texto-principal)",
                backgroundColor: "var(--color-secundario)",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/popular"
              className="block px-4 py-2 rounded-lg transition-all font-medium"
              style={{
                color: "var(--color-texto-principal)",
                backgroundColor: "var(--color-secundario)",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Populares
            </Link>
            <Link
              to="/top-rated"
              className="block px-4 py-2 rounded-lg transition-all font-medium"
              style={{
                color: "var(--color-texto-principal)",
                backgroundColor: "var(--color-secundario)",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Top Valoradas
            </Link>
            <Link
              to="/upcoming"
              className="block px-4 py-2 rounded-lg transition-all font-medium"
              style={{
                color: "var(--color-texto-principal)",
                backgroundColor: "var(--color-secundario)",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Próximamente
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
