"use client";

import { useState } from "react";
import { Search } from "lucide-react";

type Segment = "where" | "checkin" | "checkout" | "who";

/** Base styling for one search cell — padding + direction are set per cell. */
function cellClass(active: Segment | null, name: Segment) {
  return [
    "relative h-full rounded-full text-left transition",
    active === name
      ? "bg-white shadow-[0_3px_12px_rgba(0,0,0,0.15)]"
      : active === null
        ? "hover:bg-[#EBEBEB]"
        : "hover:bg-[#DDDDDD]",
  ].join(" ");
}

const LABEL = "text-[12px] font-semibold leading-4 text-hof";
const VALUE = "text-[14px] leading-[18px] text-foggy";

export default function SearchBar() {
  const [active, setActive] = useState<Segment | null>(null);

  /* Airbnb hides a divider when either cell it sits between is lit up */
  const dividerHidden = (left: Segment, right: Segment) =>
    active === left || active === right;

  return (
    <div
      className={[
        "flex h-[66px] w-full max-w-[850px] items-center rounded-full border border-line shadow-pill transition-colors",
        active ? "bg-[#EBEBEB]" : "bg-white",
      ].join(" ")}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setActive(null);
      }}
    >
      {/* Where — a real text input */}
      <div
        className={`${cellClass(active, "where")} flex flex-[1.35] cursor-text flex-col justify-center pl-8 pr-6`}
        onClick={() => setActive("where")}
      >
        <label htmlFor="where" className={`${LABEL} cursor-text`}>
          Where
        </label>
        <input
          id="where"
          type="text"
          placeholder="Search destinations"
          autoComplete="off"
          onFocus={() => setActive("where")}
          className={`${VALUE} w-full cursor-text bg-transparent outline-none placeholder:text-foggy`}
        />
      </div>

      <Divider hidden={dividerHidden("where", "checkin")} />

      <button
        type="button"
        onClick={() => setActive("checkin")}
        className={`${cellClass(active, "checkin")} flex flex-1 flex-col justify-center px-6`}
      >
        <span className={LABEL}>Check in</span>
        <span className={VALUE}>Add dates</span>
      </button>

      <Divider hidden={dividerHidden("checkin", "checkout")} />

      <button
        type="button"
        onClick={() => setActive("checkout")}
        className={`${cellClass(active, "checkout")} flex flex-1 flex-col justify-center px-6`}
      >
        <span className={LABEL}>Check out</span>
        <span className={VALUE}>Add dates</span>
      </button>

      <Divider hidden={dividerHidden("checkout", "who")} />

      {/* Who — shares its cell with the search button */}
      <div
        className={`${cellClass(active, "who")} flex flex-[1.15] items-center justify-between gap-2 pl-6 pr-2`}
      >
        <button
          type="button"
          onClick={() => setActive("who")}
          className="flex min-w-0 flex-col justify-center text-left"
        >
          <span className={LABEL}>Who</span>
          <span className={VALUE}>Add guests</span>
        </button>
        <button
          type="button"
          aria-label="Search"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rausch text-white transition-colors hover:bg-rausch-dark"
        >
          <Search className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

function Divider({ hidden }: { hidden: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`h-8 w-px shrink-0 bg-line transition-opacity ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    />
  );
}
