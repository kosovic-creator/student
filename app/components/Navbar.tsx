"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { i18n } = useTranslation("navbar");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const urlLang = searchParams.get("lang");
    if (urlLang === "en" || urlLang === "mn") {
      if (i18n.language !== urlLang) {
        i18n.changeLanguage(urlLang);
      }
    }
  }, [searchParams, i18n]);

  const handleChangeLanguage = (lng: "en" | "mn") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lng);
    router.push(`${pathname}?${params.toString()}`);
    i18n.changeLanguage(lng);
    setMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow relative z-20">
      <div className="px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href={`/?lang=${i18n.language}`} className="text-xl font-bold flex-shrink-0">
          <span className="font-bold text-sm sm:text-base">Korisnici</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/studenti?lang=${i18n.language}`}>Studenti</Link>
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => handleChangeLanguage("en")}
              className={`flex items-center gap-1 ${i18n.language === "en" ? "font-bold underline" : ""}`}
            >
              <span role="img" aria-label="English">
                🇬🇧
              </span>
              EN
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleChangeLanguage("mn")}
              className={`flex items-center gap-1 ${i18n.language === "mn" ? "font-bold underline" : ""}`}
            >
              <span role="img" aria-label="Montenegrin">
                🇲🇪
              </span>
              MN
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="px-4 py-3 flex flex-col gap-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-left"
              asChild
              onClick={handleNavClick}
            >
              <Link href={`/studenti?lang=${i18n.language}`}>Studenti</Link>
            </Button>

            <div className="border-t border-gray-200 pt-3 flex flex-col gap-2">
              <Button
                variant="ghost"
                className={`w-full justify-start flex items-center gap-2 ${i18n.language === "en" ? "font-bold underline" : ""
                  }`}
                onClick={() => handleChangeLanguage("en")}
              >
                <span role="img" aria-label="English">
                  🇬🇧
                </span>
                EN
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start flex items-center gap-2 ${i18n.language === "mn" ? "font-bold underline" : ""
                  }`}
                onClick={() => handleChangeLanguage("mn")}
              >
                <span role="img" aria-label="Montenegrin">
                  🇲🇪
                </span>
                MN
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}