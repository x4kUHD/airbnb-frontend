import { Globe, ChevronUp } from "lucide-react";

const LINKS = ["Privacy", "Terms", "Sitemap", "Company details"];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#3a3a3a] bg-[#222222] text-white">
      <div className="mx-auto flex max-w-[2520px] flex-col gap-4 px-6 py-6 text-[14px] sm:px-10 md:flex-row md:items-center md:justify-between lg:px-20">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#dddddd]">
          <span>© 2026 Airbnb, Inc.</span>
          {LINKS.map((link) => (
            <span key={link} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-[#717171]">
                ·
              </span>
              <a href="#" className="hover:underline">
                {link}
              </a>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 font-semibold">
          <button
            type="button"
            className="flex items-center gap-2 hover:underline"
          >
            <Globe className="h-4 w-4" strokeWidth={2.2} />
            English (US)
          </button>
          <button type="button" className="hover:underline">
            $ USD
          </button>
          <button
            type="button"
            className="flex items-center gap-2 hover:underline"
          >
            Support &amp; resources
            <ChevronUp className="h-4 w-4" strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </footer>
  );
}
