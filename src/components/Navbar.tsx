import Link from "next/link";
import { Globe, Menu, User } from "lucide-react";
import AirbnbLogo from "./AirbnbLogo";
import SearchBar from "./SearchBar";

/**
 * Sticky top navigation shared by every page except /login.
 * `children` renders as a second row inside the same sticky header —
 * that's how Airbnb keeps the category rail pinned under the nav.
 */
export default function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white">
      <div className="mx-auto flex h-20 max-w-[2520px] items-center gap-4 px-6 sm:px-10 lg:px-20">
        {/* Left — logo */}
        <div className="flex shrink-0 basis-0 justify-start lg:flex-1">
          <Link href="/" aria-label="Airbnb homepage">
            <AirbnbLogo />
          </Link>
        </div>

        {/* Centre — search */}
        <div className="flex min-w-0 flex-1 justify-center">
          <SearchBar />
        </div>

        {/* Right — host, locale, account */}
        <div className="flex shrink-0 basis-0 items-center justify-end lg:flex-1">
          <Link
            href="/login"
            className="hidden rounded-full px-4 py-3 text-sm font-medium text-hof transition-colors hover:bg-bg-muted xl:block"
          >
            Airbnb your home
          </Link>
          <button
            type="button"
            aria-label="Choose a language and currency"
            className="hidden rounded-full p-3 transition-colors hover:bg-bg-muted md:block"
          >
            <Globe className="h-4 w-4" strokeWidth={2.4} />
          </button>
          <Link
            href="/profile"
            aria-label="Main navigation menu"
            className="ml-2 flex items-center gap-3 rounded-full border border-line py-[5px] pl-3 pr-[5px] transition-shadow hover:shadow-pill-hover"
          >
            <Menu className="h-4 w-4" strokeWidth={2.4} />
            <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-foggy text-white">
              <User className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </span>
          </Link>
        </div>
      </div>

      {children}
    </header>
  );
}
