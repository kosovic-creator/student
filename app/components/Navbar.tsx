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
  const { t, i18n } = useTranslation("navbar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted] = useState(true);

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
    setMenuOpen(false);
  };



  return (
    <nav className="w-full bg-white shadow px-4 py-3 flex justify-between items-center md:px-6 md:py-4 relative z-20">
      {/* Logo & desktop nav */}
      <div className="flex flex-col items-start gap-1">
        <Link href={`/?lang=${i18n.language}`} className="text-xl font-bold">
          <span className="font-bold text-sm sm:text-base truncate ">

          </span>
        </Link>
        <div className="hidden sm:block">

          <Button variant="ghost" size="sm" asChild>
            <Link href={`/studenti?lang=${i18n.language}`}>Studenti</Link>
          </Button>
        </div>

      </div>


          {/* Language buttons */}
          <div className="flex flex-row gap-2">
            <Button
              variant="ghost"
              onClick={() => handleChangeLanguage("en")}
              className={`flex items-center gap-1 ${i18n.language === "en" ? "font-bold underline" : ""}`}
            >
              <span role="img" aria-label="English">🇬🇧</span> EN
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleChangeLanguage("mn")}
              className={`flex items-center gap-1 ${i18n.language === "mn" ? "font-bold underline" : ""}`}
            >
              <span role="img" aria-label="Montenegrin">🇲🇪</span> MN
            </Button>
          </div>
    </nav>
  );
}