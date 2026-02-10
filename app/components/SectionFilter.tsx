import { useState } from "react";
import { ArrowUpDown, Star, Calendar, Clock } from "lucide-react";

interface SectionFilterProps {
  onSort: (sortBy: string) => void;
}

export function SectionFilter({ onSort }: SectionFilterProps) {
  const [selected, setSelected] = useState("default");

  const filters = [
    { value: "default", label: "Por Defecto", icon: ArrowUpDown },
    { value: "rating", label: "Rating", icon: Star },
    { value: "recent", label: "Recientes", icon: Calendar },
    { value: "year", label: "Por Año", icon: Clock },
  ];

  const handleSort = (value: string) => {
    setSelected(value);
    onSort(value);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-texto-secundario)" }}
      >
        Ordenar:
      </span>
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isSelected = selected === filter.value;
        return (
          <button
            key={filter.value}
            onClick={() => handleSort(filter.value)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all border hover:scale-105 flex items-center gap-1.5"
            style={{
              backgroundColor: isSelected
                ? "var(--color-acentos)"
                : "var(--color-secundario)",
              color: isSelected
                ? "var(--color-texto-principal)"
                : "var(--color-texto-secundario)",
              borderColor: isSelected ? "var(--color-acentos)" : "transparent",
            }}
          >
            <Icon className="w-3 h-3" />
            <span>{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}
