import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const maxPagesToShow = 5;
  const halfRange = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentPage - halfRange);
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "var(--color-secundario)",
          color: "var(--color-texto-principal)",
        }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 rounded-lg transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--color-secundario)",
              color: "var(--color-texto-secundario)",
            }}
          >
            1
          </button>
          {startPage > 2 && (
            <span style={{ color: "var(--color-texto-secundario)" }}>...</span>
          )}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className="px-4 py-2 rounded-lg transition-all hover:scale-105 font-medium"
          style={{
            backgroundColor:
              page === currentPage
                ? "var(--color-acentos)"
                : "var(--color-secundario)",
            color:
              page === currentPage
                ? "var(--color-texto-principal)"
                : "var(--color-texto-secundario)",
          }}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span style={{ color: "var(--color-texto-secundario)" }}>...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 rounded-lg transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--color-secundario)",
              color: "var(--color-texto-secundario)",
            }}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "var(--color-secundario)",
          color: "var(--color-texto-principal)",
        }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
