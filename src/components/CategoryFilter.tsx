import React from 'react';
import { DestinationCategory } from '@/lib/types';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  categories,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center space-x-1.5 text-xs font-semibold text-charcoal-muted uppercase tracking-wider mr-2">
        <Filter className="w-3.5 h-3.5 text-teal-accent" />
        <span>Filter:</span>
      </div>

      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-2xs ${
              isSelected
                ? 'bg-teal-dark text-white shadow-sm ring-2 ring-teal-accent/50'
                : 'bg-white hover:bg-mint-pale text-charcoal border border-divider hover:border-teal-accent/50'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
