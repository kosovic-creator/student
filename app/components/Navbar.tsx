"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/i18n/I18nProvider";

export default function Navbar() {
  const router = useRouter();
  const { lang: currentLang, setLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleChangeLanguage = (lng: "en" | "sr") => {
    setLang(lng);
    router.refresh();
    setMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow relative z-20">
      <div className="px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
        {/* Logo */}

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/studenti" className="text-foreground">Studenti</Link>
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => handleChangeLanguage("en")}
              className={`flex items-center gap-1 ${currentLang === "en" ? "font-bold underline" : ""}`}
            >
              <span role="img" aria-label="">
                🇬🇧
              </span>
              EN
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleChangeLanguage("sr")}
              className={`flex items-center gap-1 ${currentLang === "sr" ? "font-bold underline" : ""}`}
            >
              <span role="img" aria-label="MN">
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
            className={`block w-6 h-0.5 bg-black dark:bg-white transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black dark:bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black dark:bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 flex flex-col gap-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-left"
              asChild
              onClick={handleNavClick}
            >
              <Link href="/studenti" className="text-foreground">Studenti</Link>
            </Button>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex flex-col gap-2">
              <Button
                variant="ghost"
                className={`w-full justify-start flex items-center gap-2 ${currentLang === "en" ? "font-bold underline" : ""
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
                className={`w-full justify-start flex items-center gap-2 ${currentLang === "sr" ? "font-bold underline" : ""
                  }`}
                onClick={() => handleChangeLanguage("sr")}
              >
                <span role="img" aria-label="Serbian">
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