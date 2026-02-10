interface SortFilterProps {
  selected: string;
  onSort: (sortBy: string) => void;
}

export function SortFilter({ selected, onSort }: SortFilterProps) {
  const sortOptions = [
    { value: "popularity.desc", label: "Más Populares" },
    { value: "vote_average.desc", label: "Mejor Valoradas" },
    { value: "release_date.desc", label: "Más Recientes" },
    { value: "release_date.asc", label: "Más Antiguas" },
    { value: "title.asc", label: "A-Z" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-texto-secundario)" }}
        >
          Ordenar Por
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {sortOptions.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onSort(option.value)}
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
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
