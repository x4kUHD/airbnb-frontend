import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Star,
  Share,
  Heart,
  Wifi,
  Utensils,
  Car,
  User,
  Medal,
  Grid3x3,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AMENITIES } from "@/lib/data";

const NIGHTLY = 412;
const NIGHTS = 5;
const CLEANING_FEE = 85;
const SERVICE_FEE = 268;

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export default function ListingPage() {
  const subtotal = NIGHTLY * NIGHTS;
  const total = subtotal + CLEANING_FEE + SERVICE_FEE;

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-[1280px] px-6 pb-20 sm:px-10 lg:px-20">
        {/* Back + title row */}
        <div className="flex items-center justify-between gap-4 pt-6">
          <Link
            href="/"
            className="-ml-2 flex items-center gap-1 rounded-full p-2 text-[14px] font-semibold text-hof transition-colors hover:bg-bg-muted"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
            Back
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-btn px-3 py-2 text-[14px] font-semibold text-hof underline transition-colors hover:bg-bg-muted"
            >
              <Share className="h-4 w-4" strokeWidth={2} />
              Share
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-btn px-3 py-2 text-[14px] font-semibold text-hof underline transition-colors hover:bg-bg-muted"
            >
              <Heart className="h-4 w-4" strokeWidth={2} />
              Save
            </button>
          </div>
        </div>

        {/* Photo grid — one large left, 2x2 right */}
        <div className="relative mt-2 grid h-[300px] grid-cols-1 gap-2 overflow-hidden rounded-card sm:h-[420px] sm:grid-cols-2 md:h-[480px]">
          <Photo src="/mock/villa-pool.svg" alt="Terrace and infinity pool" priority />
          <div className="hidden grid-cols-2 grid-rows-2 gap-2 sm:grid">
            <Photo src="/mock/int-living.svg" alt="Living room" />
            <Photo src="/mock/int-bedroom.svg" alt="Primary bedroom" />
            <Photo src="/mock/int-kitchen.svg" alt="Kitchen" />
            <Photo src="/mock/int-bath.svg" alt="Bathroom" />
          </div>

          <button
            type="button"
            className="absolute bottom-5 right-5 flex items-center gap-2 rounded-btn border border-hof bg-white px-4 py-[7px] text-[14px] font-semibold text-hof transition-colors hover:bg-bg-muted"
          >
            <Grid3x3 className="h-4 w-4" strokeWidth={2} />
            Show all photos
          </button>
        </div>

        {/* Two-column body */}
        <div className="mt-8 flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* -------------------------------- Left (60%) */}
          <div className="w-full lg:w-[58%]">
            <h1 className="text-[26px] font-semibold leading-[30px] text-hof">
              Oceanfront villa with infinity pool
            </h1>
            <p className="mt-2 text-[16px] leading-5 text-hof">
              Entire villa in Malibu, California, United States
            </p>
            <p className="mt-1 text-[16px] leading-5 text-foggy">
              8 guests · 4 bedrooms · 5 beds · 3 baths
            </p>
            <p className="mt-3 flex items-center gap-[6px] text-[14px] text-hof">
              <Star className="h-[14px] w-[14px] fill-hof text-hof" strokeWidth={0} />
              <span className="font-semibold">4.96</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold underline">184 reviews</span>
            </p>

            <Divider />

            {/* Host */}
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-foggy text-white">
                <User className="h-7 w-7" strokeWidth={2} />
              </span>
              <div>
                <p className="text-[16px] font-semibold leading-5 text-hof">
                  Hosted by Sofia
                </p>
                <p className="mt-[2px] text-[14px] leading-[18px] text-foggy">
                  Superhost · 7 years hosting
                </p>
              </div>
            </div>

            <Divider />

            {/* Highlights */}
            <ul className="flex flex-col gap-6">
              <Highlight
                icon={Wifi}
                title="Fast wifi"
                body="At 380 Mbps, you can take video calls and stream in HD."
              />
              <Highlight
                icon={Utensils}
                title="Kitchen"
                body="Guests often search for this popular amenity."
              />
              <Highlight
                icon={Car}
                title="Free parking on premises"
                body="This is one of the few places in the area with free parking."
              />
            </ul>

            <Divider />

            {/* Description */}
            <div className="text-[16px] leading-6 text-hof">
              <p>
                Wake up to the sound of the Pacific from this light-filled villa
                perched above Escondido Beach. Floor-to-ceiling glass opens onto
                a heated infinity pool that spills toward the horizon, and a
                private stair drops you straight onto the sand.
              </p>
              <p className="mt-4">
                Inside, four bedrooms are arranged around a double-height living
                room with a fireplace and a chef&apos;s kitchen finished in
                white oak. The primary suite has a freestanding tub facing the
                water. Sunsets here are the whole point.
              </p>
              <button
                type="button"
                className="mt-4 flex items-center gap-1 text-[16px] font-semibold text-hof underline"
              >
                Show more
                <ChevronDown className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </div>

            <Divider />

            {/* Amenities */}
            <div>
              <h2 className="text-[22px] font-semibold leading-[26px] text-hof">
                What this place offers
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2">
                {AMENITIES.slice(0, 10).map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-4 py-1">
                    <Icon className="h-6 w-6 shrink-0 text-hof" strokeWidth={1.6} />
                    <span className="text-[16px] leading-5 text-hof">{label}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-8 rounded-btn border border-hof px-5 py-[13px] text-[16px] font-semibold text-hof transition-colors hover:bg-bg-muted"
              >
                Show all 32 amenities
              </button>
            </div>
          </div>

          {/* -------------------------------- Right (40%) — booking card */}
          <div className="w-full lg:w-[42%]">
            {/* 81px sticky navbar + 24px breathing room */}
            <div className="sticky top-[105px]">
              <div className="rounded-card border border-line bg-white p-6 shadow-book">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[22px] leading-[26px] text-hof">
                    <span className="font-semibold">{money(NIGHTLY)}</span>
                    <span className="text-[16px]"> night</span>
                  </p>
                  <p className="flex items-center gap-1 text-[14px] text-hof">
                    <Star
                      className="h-[13px] w-[13px] fill-hof text-hof"
                      strokeWidth={0}
                    />
                    4.96
                    <span aria-hidden="true" className="text-foggy">
                      ·
                    </span>
                    <span className="text-foggy underline">184 reviews</span>
                  </p>
                </div>

                {/* Date picker placeholder */}
                <div className="mt-6 rounded-btn border border-[#b0b0b0]">
                  <div className="grid grid-cols-2">
                    <div className="border-r border-[#b0b0b0] px-3 py-[10px]">
                      <p className="text-[10px] font-bold uppercase leading-3 tracking-[0.04em] text-hof">
                        Check-in
                      </p>
                      <p className="mt-[2px] text-[14px] leading-[18px] text-foggy">
                        8/12/2026
                      </p>
                    </div>
                    <div className="px-3 py-[10px]">
                      <p className="text-[10px] font-bold uppercase leading-3 tracking-[0.04em] text-hof">
                        Checkout
                      </p>
                      <p className="mt-[2px] text-[14px] leading-[18px] text-foggy">
                        8/17/2026
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#b0b0b0] px-3 py-[10px]">
                    <div>
                      <p className="text-[10px] font-bold uppercase leading-3 tracking-[0.04em] text-hof">
                        Guests
                      </p>
                      <p className="mt-[2px] text-[14px] leading-[18px] text-foggy">
                        2 guests
                      </p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-hof" strokeWidth={2.4} />
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 w-full rounded-btn bg-rausch py-[14px] text-[16px] font-semibold text-white transition-colors hover:bg-rausch-dark"
                >
                  fefefe
                </button>

                <p className="mt-3 text-center text-[14px] leading-[18px] text-foggy">
                  You won&apos;t be charged yet
                </p>

                {/* Price breakdown */}
                <dl className="mt-6 flex flex-col gap-4 text-[16px] leading-5 text-hof">
                  <PriceRow
                    label={`${money(NIGHTLY)} x ${NIGHTS} nights`}
                    value={money(subtotal)}
                  />
                  <PriceRow label="Cleaning fee" value={money(CLEANING_FEE)} />
                  <PriceRow label="Airbnb service fee" value={money(SERVICE_FEE)} />
                </dl>

                <div className="my-6 h-px bg-line" />

                <div className="flex items-center justify-between text-[16px] font-semibold leading-5 text-hof">
                  <span>Total before taxes</span>
                  <span>{money(total)}</span>
                </div>
              </div>

              <p className="mt-6 flex items-center justify-center gap-2 text-[14px] text-foggy">
                <Medal className="h-4 w-4" strokeWidth={2} />
                This is a rare find — usually booked.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ---------------------------------------------------------------- */

function Photo({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-bg-muted">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        priority={priority}
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover transition-[filter] hover:brightness-95"
      />
    </div>
  );
}

function Divider() {
  return <div className="my-8 h-px w-full bg-line" />;
}

function Highlight({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  body: string;
}) {
  return (
    <li className="flex items-start gap-4">
      <Icon className="mt-[2px] h-6 w-6 shrink-0 text-hof" strokeWidth={1.6} />
      <div>
        <p className="text-[16px] font-semibold leading-5 text-hof">{title}</p>
        <p className="mt-[2px] text-[14px] leading-[18px] text-foggy">{body}</p>
      </div>
    </li>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="underline">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
