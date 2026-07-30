import Image from "next/image";
import { ChevronDown, Map } from "lucide-react";
import Navbar from "@/components/Navbar";
import ListingCard from "@/components/ListingCard";
import { LISTINGS, FILTER_PILLS } from "@/lib/data";

/** Price pins scattered over the map, positioned in % of the map box. */
const PINS = [
  { price: 412, x: 32, y: 22 },
  { price: 289, x: 62, y: 31 },
  { price: 356, x: 24, y: 45 },
  { price: 198, x: 55, y: 52 },
  { price: 524, x: 74, y: 64 },
  { price: 245, x: 38, y: 70 },
  { price: 167, x: 68, y: 15 },
  { price: 431, x: 18, y: 78 },
];

/** 80px nav row + 72px filter row + 1px header border. Both rows are given
 *  explicit heights below so the map can be sized against this exactly. */
const HEADER_H = 153;

export default function SearchPage() {
  return (
    <>
      <Navbar>
        {/* Filter pills */}
        <div className="no-scrollbar mx-auto flex h-[72px] max-w-[2520px] items-center gap-3 overflow-x-auto px-6 sm:px-10 lg:px-20">
          {FILTER_PILLS.map((pill) => (
            <button
              key={pill}
              type="button"
              className="flex shrink-0 items-center gap-2 rounded-full border border-line px-4 py-[10px] text-[14px] leading-[18px] text-hof transition-colors hover:border-hof hover:bg-bg-muted"
            >
              {pill}
              <ChevronDown className="h-3.5 w-3.5 text-foggy" strokeWidth={2.4} />
            </button>
          ))}
        </div>
      </Navbar>

      {/* Results + map */}
      <main
        className="flex flex-1 flex-col lg:h-[var(--body-h)] lg:flex-row"
        style={{ "--body-h": `calc(100vh - ${HEADER_H}px)` } as React.CSSProperties}
      >
        <section className="w-full overflow-y-auto px-6 pb-12 pt-6 sm:px-10 lg:w-[62%] lg:px-10">
          <h1 className="text-[14px] leading-[18px] text-foggy">
            Over 1,000 stays
          </h1>
          <h2 className="mt-1 text-[22px] font-semibold leading-[26px] text-hof">
            Stays in Malibu
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
            {LISTINGS.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        {/* Map */}
        <aside className="hidden w-[38%] lg:block">
          <div
            className="sticky h-[var(--body-h)] w-full overflow-hidden bg-[#eae6df]"
            style={{ top: HEADER_H }}
          >
            <Image
              src="/mock/map.svg"
              alt="Map of Malibu"
              fill
              unoptimized
              sizes="38vw"
              className="object-cover"
            />

            {/* Price pins */}
            {PINS.map((pin) => (
              <button
                key={pin.price}
                type="button"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-[10px] py-[6px] text-[14px] font-semibold leading-[18px] text-hof shadow-[0_2px_8px_rgba(0,0,0,0.28)] transition-transform hover:scale-110 hover:bg-hof hover:text-white"
              >
                ${pin.price}
              </button>
            ))}

            {/* Map-view badge, as Airbnb overlays its map controls */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-hof px-4 py-3 text-[14px] font-semibold text-white shadow-book">
              <Map className="h-4 w-4" strokeWidth={2} />
              Map view
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
