"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Star } from "lucide-react";
import type { Listing } from "@/lib/data";

const GRADIENTS = ["img-ph", "img-ph img-ph-b", "img-ph img-ph-c", "img-ph img-ph-d"];

export default function ListingCard({ listing }: { listing: Listing }) {
  const [saved, setSaved] = useState(false);

  return (
    <Link href="/listing" className="group block">
      {/* Photo */}
      <div className="relative">
        <div
          className={`w-full rounded-card ${GRADIENTS[listing.id % GRADIENTS.length]}`}
          style={{ aspectRatio: "1 / 0.67" }}
        />

        {listing.guestFavorite && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-[10px] py-[6px] text-[12px] font-semibold leading-4 text-hof shadow-[0_1px_2px_rgba(0,0,0,0.18)]">
            Guest favourite
          </span>
        )}

        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          onClick={(e) => {
            e.preventDefault();
            setSaved((s) => !s);
          }}
          className="absolute right-3 top-3 p-1 transition-transform hover:scale-110"
        >
          <Heart
            className={
              saved
                ? "h-6 w-6 fill-rausch text-white"
                : "h-6 w-6 fill-black/50 text-white"
            }
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Details */}
      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-[15px] font-semibold leading-[19px] text-hof">
            {listing.location}
          </h3>
          <span className="flex shrink-0 items-center gap-[3px] text-[15px] leading-[19px] text-hof">
            <Star
              className="h-[13px] w-[13px] fill-hof text-hof"
              strokeWidth={0}
            />
            {listing.rating.toFixed(2)}
            <span className="text-foggy">({listing.reviews})</span>
          </span>
        </div>
        <p className="mt-[2px] truncate text-[15px] leading-[19px] text-foggy">
          {listing.distance}
        </p>
        <p className="truncate text-[15px] leading-[19px] text-foggy">
          {listing.dates}
        </p>
        <p className="mt-[6px] text-[15px] leading-[19px] text-hof">
          <span className="font-semibold">${listing.price}</span> night
        </p>
      </div>
    </Link>
  );
}
