"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

export default function CategoryBar() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="mx-auto flex max-w-[2520px] items-center gap-6 px-6 sm:px-10 lg:px-20">
      <div className="no-scrollbar flex min-w-0 flex-1 items-center gap-8 overflow-x-auto">
        {CATEGORIES.map((category, i) => {
          const Icon = category.icon;
          const isSelected = i === selected;
          return (
            <button
              key={category.label}
              type="button"
              onClick={() => setSelected(i)}
              className={[
                "group flex shrink-0 flex-col items-center gap-2 whitespace-nowrap border-b-2 pb-3 pt-[18px] transition-colors",
                isSelected
                  ? "border-hof text-hof"
                  : "border-transparent text-foggy hover:border-line hover:text-hof",
              ].join(" ")}
            >
              <Icon
                className={`h-6 w-6 transition-opacity ${
                  isSelected ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                }`}
                strokeWidth={1.6}
              />
              <span className="text-[12px] font-semibold leading-4">
                {category.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="flex shrink-0 items-center gap-2 rounded-btn border border-line px-4 py-3 text-[12px] font-semibold text-hof transition-colors hover:border-hof hover:bg-bg-muted"
      >
        <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
        Filters
      </button>
    </div>
  );
}
