import React from "react";
import Link from "next/link";
import { ShieldCheck, QrCode, Truck, Sparkles, ArrowRight } from "lucide-react";
import { HomepageData } from "@/lib/types";
import { ProductStage } from "./ProductStage";

interface HeroProps {
  data: HomepageData;
}

function renderTitle(title: string, highlightWord: string) {
  if (!highlightWord || !highlightWord.trim()) {
    return title.toUpperCase();
  }

  const lowerTitle = title.toLowerCase();
  const lowerHighlight = highlightWord.toLowerCase();
  const startIndex = lowerTitle.indexOf(lowerHighlight);

  if (startIndex === -1) {
    return title.toUpperCase();
  }

  const endIndex = startIndex + highlightWord.length;
  const before = title.slice(0, startIndex);
  const match = title.slice(startIndex, endIndex);
  const after = title.slice(endIndex);

  return (
    <>
      {before.toUpperCase()}
      <span className="text-accent">{match.toUpperCase()}</span>
      {after.toUpperCase()}
    </>
  );
}

export function Hero({ data }: HeroProps) {
  const { hero, featured } = data;

  return (
    <section className="relative w-full pt-8 pb-16 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Badge Pill */}
        {hero.badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-soft/80 text-accent border border-accent/25 shadow-2xs mb-5 sm:mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>{hero.badge}</span>
          </div>
        )}

        {/* H1 Headline */}
        <h1 className="font-display uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ink leading-[0.95] max-w-4xl mx-auto">
          {renderTitle(hero.title, hero.highlight_word)}
        </h1>

        {/* Subtitle */}
        {hero.subtitle && (
          <p className="mt-4 sm:mt-5 text-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {hero.subtitle}
          </p>
        )}

        {/* Primary Call to Action Button */}
        {hero.button_label && hero.button_link && (
          <div className="mt-6 sm:mt-7">
            <Link
              href={hero.button_link}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-8 py-3 rounded-full bg-accent text-onaccent font-semibold text-sm sm:text-base shadow-sm hover:opacity-90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span>{hero.button_label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Dynamic Product Stage Carousel */}
        <div className="w-full mt-10 sm:mt-12 md:mt-14">
          <ProductStage products={featured} />
        </div>

        {/* Trust Row */}
        <div className="w-full max-w-3xl mt-12 sm:mt-14 pt-8 border-t border-line/60">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 text-xs sm:text-sm text-muted font-medium">
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
              <span>100% authentic products</span>
            </div>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-line" />
            <div className="inline-flex items-center gap-2">
              <QrCode className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Pay with ABA or KHQR</span>
            </div>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-line" />
            <div className="inline-flex items-center gap-2">
              <Truck className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Delivery across Cambodia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
