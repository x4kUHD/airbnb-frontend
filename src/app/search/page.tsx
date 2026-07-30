import { ChevronDown, Map } from "lucide-react";
import Navbar from "@/components/Navbar";
import ListingCard from "@/components/ListingCard";
import { LISTINGS, FILTER_PILLS } from "@/lib/data";

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

        {/* Map placeholder */}
        <aside className="hidden w-[38%] lg:block">
          <div
            className="img-ph sticky flex h-[var(--body-h)] w-full items-center justify-center"
            style={{ top: HEADER_H }}
          >
            <div className="relative z-10 flex flex-col items-center gap-2 text-foggy">
              <Map className="h-8 w-8" strokeWidth={1.6} />
              <span className="text-[16px] font-semibold">Map view</span>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
