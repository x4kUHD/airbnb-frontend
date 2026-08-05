"use client";

import Image from "next/image";
import { useState } from "react";
import {
  User,
  Luggage,
  Heart,
  MessageCircle,
  Bell,
  Settings,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TRIPS } from "@/lib/data";

const MENU: { label: string; icon: LucideIcon }[] = [
  { label: "Trips", icon: Luggage },
  { label: "Wishlists", icon: Heart },
  { label: "Messages", icon: MessageCircle },
  { label: "Notifications", icon: Bell },
  { label: "Account", icon: Settings },
];

const TABS = ["Upcoming", "Past", "Cancelled"];

export default function ProfilePage() {
  const [menu, setMenu] = useState("Trips");
  const [tab, setTab] = useState("Upcoming");

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-[1120px] flex-1 px-6 py-10 sm:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          {/* ------------------------------- Sidebar */}
          <aside className="w-full shrink-0 md:w-[280px]">
            <div className="flex flex-col items-center rounded-card border border-line p-6 text-center shadow-book">
              <span className="grid h-[104px] w-[104px] place-items-center rounded-full bg-foggy text-white" style={{ width: "202px", height: "163px" }}>
                <User className="h-14 w-14" strokeWidth={1.8} />
              </span>
              <p className="mt-4 text-[22px] font-semibold leading-[26px] text-hof">
                Eric Kim
              </p>
              <p className="mt-1 text-[14px] leading-[18px] text-foggy">
                12 reviews · 6 years on Airbnb
              </p>
            </div>

            <nav className="mt-8 flex flex-col">
              {MENU.map(({ label, icon: Icon }) => {
                const selected = label === menu;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setMenu(label)}
                    aria-current={selected ? "page" : undefined}
                    className={[
                      "flex items-center gap-4 rounded-btn px-3 py-3 text-left text-[16px] leading-5 transition-colors hover:bg-bg-muted",
                      selected ? "font-semibold text-hof" : "text-foggy",
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
                    {label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ------------------------------- Content */}
          <section className="min-w-0 flex-1">
            <h1 className="text-[32px] font-semibold leading-9 text-hof">
              Trips
            </h1>

            {/* Tabs */}
            <div className="mt-6 flex items-center gap-8 border-b border-line">
              {TABS.map((t) => {
                const selected = t === tab;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={[
                      "-mb-px border-b-2 pb-4 text-[16px] leading-5 transition-colors",
                      selected
                        ? "border-hof font-semibold text-hof"
                        : "border-transparent text-foggy hover:text-hof",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Trip cards */}
            <div className="mt-8 flex flex-col gap-6">
              {TRIPS.map((trip) => (
                <article
                  key={trip.id}
                  className="flex flex-col gap-5 rounded-card border border-line p-4 transition-shadow hover:shadow-book sm:flex-row sm:items-center"
                >
                  <div
                    className="relative w-full shrink-0 overflow-hidden rounded-btn bg-bg-muted sm:w-[200px]"
                    style={{ aspectRatio: "1 / 0.67" }}
                  >
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      fill
                      unoptimized
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-[18px] font-semibold leading-6 text-hof">
                      {trip.title}
                    </h2>
                    <p className="mt-1 truncate text-[15px] leading-[19px] text-foggy">
                      {trip.location}
                    </p>
                    <p className="mt-[2px] text-[15px] leading-[19px] text-foggy">
                      {trip.dates}
                    </p>
                    <p className="mt-[2px] text-[15px] leading-[19px] text-foggy">
                      {trip.host}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="shrink-0 self-start rounded-btn border border-hof px-5 py-[11px] text-[14px] font-semibold text-hof transition-colors hover:bg-bg-muted sm:self-auto"
                  >
                    View details
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
