import Link from "next/link";
import { X, Mail, ChevronDown } from "lucide-react";
import { BeloMark } from "@/components/AirbnbLogo";
import { GoogleIcon, AppleIcon, FacebookIcon } from "@/components/BrandIcons";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-bg-muted px-4 py-10">
      <div className="w-full max-w-[568px] overflow-hidden rounded-card border border-line bg-white shadow-menu">
        {/* Modal header */}
        <div className="relative flex h-16 items-center justify-center border-b border-line px-6">
          <Link
            href="/"
            aria-label="Close"
            className="absolute left-4 rounded-full p-2 transition-colors hover:bg-bg-muted"
          >
            <X className="h-4 w-4 text-hof" strokeWidth={2.6} />
          </Link>
          <span className="text-[16px] font-semibold leading-5 text-hof">
            Log in or sign up
          </span>
        </div>

        <div className="px-6 py-6">
          {/* Logo */}
          <div className="flex justify-center pb-2 text-rausch">
            <BeloMark className="h-10 w-10" />
          </div>

          <h1 className="pb-6 text-[22px] font-semibold leading-[26px] text-hof">
            Welcome to Airbnb
          </h1>

          {/* Country + phone */}
          <div className="rounded-btn border border-[#b0b0b0]">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-2 border-b border-[#b0b0b0] px-3 py-[10px] text-left"
            >
              <span className="min-w-0">
                <span className="block text-[12px] leading-4 text-foggy">
                  Country/Region
                </span>
                <span className="flex items-center gap-2 text-[14px] leading-[18px] text-hof">
                  <span aria-hidden="true" className="text-[16px] leading-none">
                    🇺🇸
                  </span>
                  United States (+1)
                </span>
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-hof" strokeWidth={2.4} />
            </button>

            <div className="px-3 py-[10px]">
              <label
                htmlFor="phone"
                className="block text-[12px] leading-4 text-foggy"
              >
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="(201) 555-0123"
                className="w-full bg-transparent text-[14px] leading-[18px] text-hof outline-none placeholder:text-foggy"
              />
            </div>
          </div>

          <p className="mt-2 text-[12px] leading-4 text-foggy">
            We&apos;ll call or text you to confirm your number. Standard message
            and data rates apply.{" "}
            <a href="#" className="font-semibold text-hof underline">
              Privacy Policy
            </a>
          </p>

          <button
            type="button"
            className="mt-4 w-full rounded-btn bg-rausch py-[14px] text-[16px] font-semibold text-white transition-colors hover:bg-rausch-dark"
          >
            Continue
          </button>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <span className="text-[12px] leading-4 text-hof">or</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <SocialButton label="Continue with Google">
              <GoogleIcon className="h-[18px] w-[18px]" />
            </SocialButton>
            <SocialButton label="Continue with Apple">
              <AppleIcon className="h-5 w-5" />
            </SocialButton>
            <SocialButton label="Continue with Facebook">
              <FacebookIcon className="h-5 w-5" />
            </SocialButton>
            <SocialButton label="Continue with email">
              <Mail className="h-[18px] w-[18px] text-hof" strokeWidth={2} />
            </SocialButton>
          
  <a href={"/listing"} style={{ display: "contents" }}><button style={{ position: "relative", display: "flex", width: "100%", alignItems: "center", justifyContent: "center", borderRadius: "8px", border: "1px solid #222222", padding: "13px 20px", fontSize: "14px", fontWeight: "600", color: "#222222", backgroundColor: "transparent", cursor: "pointer", transition: "background-color 0.2s" }}>
    <span style={{ position: "absolute", left: "20px", display: "flex", alignItems: "center" }}>
      <div>
        <div />
        <div />
        <div />
        <div />
      </div>
    </span>
    <span>Continue with Microsoft</span>
  </button></a>
</div>
        </div>
      </div>
    </div>
  );
}

function SocialButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="relative flex w-full items-center justify-center rounded-btn border border-hof px-5 py-[13px] text-[14px] font-semibold leading-[18px] text-hof transition-colors hover:bg-bg-muted"
    >
      <span className="absolute left-5 flex items-center">{children}</span>
      {label}
    </button>
  );
}
