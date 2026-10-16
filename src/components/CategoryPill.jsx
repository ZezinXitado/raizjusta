import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

export default function CategoryPill({ category }) {
  return (
    <Link
      to={`/produtos?categoria=${category.key}`}
      className="group relative shrink-0 w-28 sm:w-32 rounded-2xl overflow-hidden border border-border/70 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
    >
      <div className="aspect-square relative">
        <Image src={category.image} alt={category.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" fittingType="fill" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-900/20 to-transparent" />
        <div className="absolute bottom-2 inset-x-0 text-center">
          <span className="text-xl block">{category.emoji}</span>
          <span className="text-xs font-bold text-white">{category.label}</span>
        </div>
      </div>
    </Link>
  );
}