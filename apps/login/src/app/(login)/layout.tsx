import "@/styles/globals.scss";

import { BackgroundWrapper } from "@/components/background-wrapper";
import { LanguageProvider } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Skeleton } from "@/components/skeleton";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeSwitch from "@/components/theme-switch";
import { LANGS, getLanguage } from "@/lib/i18n";
import { getServiceConfig } from "@/lib/service-url";
import { getAllowedLanguages } from "@/lib/zitadel";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Inter_Tight } from "next/font/google";
import { headers } from "next/headers";
import React, { Suspense } from "react";

const interTight = Inter_Tight({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return { title: t("title") };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const _headers = await headers();
  const { serviceConfig } = getServiceConfig(_headers);

  let languages = LANGS;
  try {
    const settings = await getAllowedLanguages({ serviceConfig });
    if (settings.allowedLanguages?.length) {
      languages = settings.allowedLanguages
        .filter((code) => LANGS.find((l) => l.code === code))
        .map((code) => getLanguage(code));
    }
  } catch (e) {
    console.error("Failed to load supported languages", e);
  }

  return (
    <html className={`${interTight.className}`} suppressHydrationWarning>
      <head />
      <body className="wyp">
        <div className="wyp-grid" aria-hidden />
        <div className="wyp-spotlight" aria-hidden />
        <div className="wyp-spotlight-secondary" aria-hidden />
        <div className="wyp-beam wyp-beam-1" aria-hidden />
        <div className="wyp-beam wyp-beam-2" aria-hidden />
        <div className="wyp-beam wyp-beam-3" aria-hidden />
        <ThemeProvider>
          <Tooltip.Provider>
            <Suspense
              fallback={
                <BackgroundWrapper className={`relative flex min-h-screen flex-col justify-center`}>
                  <div className="relative mx-auto w-full max-w-[440px] py-8">
                    <Skeleton>
                      <div className="h-40"></div>
                    </Skeleton>
                    <div className="flex flex-row items-center justify-end space-x-4 py-4">
                      <ThemeSwitch />
                    </div>
                  </div>
                </BackgroundWrapper>
              }
            >
              <LanguageProvider>
                <BackgroundWrapper className={`relative flex h-[100dvh] flex-col justify-center overflow-hidden`}>
                  <div className="relative mx-auto w-full max-w-[1100px] py-3">
                    <div>{children}</div>
                    <div className="mx-auto flex max-w-[440px] flex-row items-center justify-center space-x-3 px-4 py-2 md:max-w-full md:px-8 mt-2">
                      <LanguageSwitcher languages={languages} />
                      <ThemeSwitch />
                    </div>
                  </div>
                </BackgroundWrapper>
              </LanguageProvider>
            </Suspense>
          </Tooltip.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
