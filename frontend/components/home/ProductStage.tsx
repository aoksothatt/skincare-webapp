"use client";

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { FeaturedProduct } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { ProductIllustration } from "./ProductIllustration";

interface ProductStageProps {
  products: FeaturedProduct[];
}

export function ProductStage({ products }: ProductStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [wrappingItemIds, setWrappingItemIds] = useState<Set<string | number>>(new Set());

  const count = products.length;
  const prevOffsetsRef = useRef<Record<string | number, number>>({});
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  // Synchronized browser state hooks (React 19 compliant via useSyncExternalStore)
  const isDesktop = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("resize", onStoreChange);
      return () => window.removeEventListener("resize", onStoreChange);
    },
    () => window.innerWidth >= 768,
    () => true
  );

  const prefersReducedMotion = useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  const isTabHidden = useSyncExternalStore(
    (onStoreChange) => {
      document.addEventListener("visibilitychange", onStoreChange);
      return () => document.removeEventListener("visibilitychange", onStoreChange);
    },
    () => document.visibilityState === "hidden",
    () => false
  );

  // Calculate shortest modular offset from active item
  const getOffset = useCallback(
    (index: number, active: number, total: number): number => {
      if (total <= 0) return 0;
      let diff = index - active;
      while (diff > total / 2) diff -= total;
      while (diff < -total / 2) diff += total;
      return diff;
    },
    []
  );

  // Navigation handlers
  const goToSlide = useCallback(
    (newIndex: number) => {
      if (count <= 1) return;
      const normalizedIndex = ((newIndex % count) + count) % count;

      // Identify wrapping items before moving to prevent flying across screen
      const newWrapping = new Set<string | number>();
      products.forEach((prod, i) => {
        const prevOffset = prevOffsetsRef.current[prod.id];
        const newOffset = getOffset(i, normalizedIndex, count);
        if (prevOffset !== undefined && Math.abs(newOffset - prevOffset) > 1.5) {
          newWrapping.add(prod.id);
        }
      });

      if (newWrapping.size > 0) {
        setWrappingItemIds(newWrapping);
        requestAnimationFrame(() => {
          setTimeout(() => {
            setWrappingItemIds(new Set());
          }, 60);
        });
      }

      setActiveIndex(normalizedIndex);
    },
    [count, getOffset, products]
  );

  const nextSlide = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  // Record offsets after each activeIndex change for wrapping calculations
  useEffect(() => {
    const offsets: Record<string | number, number> = {};
    products.forEach((p, i) => {
      offsets[p.id] = getOffset(i, activeIndex, count);
    });
    prevOffsetsRef.current = offsets;
  }, [activeIndex, count, getOffset, products]);

  // Autoplay timer (4 seconds)
  useEffect(() => {
    if (
      count < 2 ||
      isPausedByUser ||
      isHovered ||
      isFocused ||
      isTabHidden ||
      prefersReducedMotion
    ) {
      return;
    }

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [
    count,
    isPausedByUser,
    isHovered,
    isFocused,
    isTabHidden,
    prefersReducedMotion,
    nextSlide,
  ]);

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    // Detect horizontal swipe intention
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const minSwipeDistance = 35;

    if (Math.abs(deltaX) >= minSwipeDistance) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;

    // Debounce resetting isSwiping to suppress any resulting click event
    setTimeout(() => {
      isSwiping.current = false;
    }, 120);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isSwiping.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (count === 0) return null;

  // Responsive step values for horizontal spacing
  const stepX = isDesktop ? 230 : 135;

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured skincare products"
      className="relative w-full max-w-6xl mx-auto px-4 pt-4 pb-2 select-none overflow-x-hidden max-w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Product Podium Stage Area */}
      <div className="relative w-full h-[430px] sm:h-[470px] md:h-[500px] overflow-visible">
        {products.map((product, i) => {
          const diff = getOffset(i, activeIndex, count);
          const isVisible = isDesktop ? Math.abs(diff) <= 2 : Math.abs(diff) <= 1;
          const isCenter = diff === 0;

          // Scale: 1 for center, 0.8 for next, 0.62 for outer
          let scale = 1.0;
          if (Math.abs(diff) === 1) scale = 0.8;
          else if (Math.abs(diff) >= 2) scale = 0.62;

          // Opacity according to viewport & distance
          let opacity = 0;
          if (diff === 0) {
            opacity = 1.0;
          } else if (Math.abs(diff) === 1) {
            opacity = 0.82;
          } else if (Math.abs(diff) === 2) {
            opacity = isDesktop ? 0.45 : 0;
          } else {
            opacity = 0;
          }

          if (!isVisible) opacity = 0;

          // Offset Y = diff^2 * 16px
          const offsetY = diff * diff * 16;
          const translateX = diff * stepX;
          const zIndex = isCenter ? 30 : 20 - Math.abs(diff) * 5;

          const isWrapping = wrappingItemIds.has(product.id);

          return (
            <div
              key={product.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!isVisible}
              inert={!isVisible ? true : undefined}
              className="absolute left-1/2 bottom-4 w-[190px] sm:w-[220px] md:w-[230px]"
              style={{
                transformOrigin: "bottom center",
                transform: `translateX(calc(-50% + ${translateX}px)) translateY(${offsetY}px) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: isVisible ? "auto" : "none",
                transition: isWrapping
                  ? "none"
                  : "transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 550ms ease",
              }}
            >
              <Link
                href={`/products/${product.slug}`}
                onClickCapture={handleLinkClick}
                tabIndex={isVisible ? 0 : -1}
                aria-label={`${product.name}, ${formatPrice(
                  product.sale_price ?? product.price
                )}. View product`}
                className="group block text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 rounded-3xl transition-transform"
              >
                {/* Product Stand (Image or SVG Illustration with Round Podium) */}
                <div className="relative mx-auto w-[180px] sm:w-[210px] md:w-[220px] h-[215px] sm:h-[235px] md:h-[245px] flex items-end justify-center transition-transform duration-300 group-hover:-translate-y-1">
                  {product.image_url ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-end">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        width={180}
                        height={200}
                        className="object-contain max-h-[190px]"
                      />
                      {/* Integrated round podium under the image */}
                      <div className="w-[150px] h-[24px] rounded-[50%] bg-surface border border-line shadow-sm -mt-2 z-[-1]" />
                    </div>
                  ) : (
                    <ProductIllustration
                      type={product.illustration_type}
                      tint={product.tint}
                      bodyColor={product.body_color}
                      className="w-full h-full drop-shadow-xs"
                    />
                  )}
                </div>

                {/* Caption Card */}
                <div className="mt-3 mx-auto w-full p-3 sm:p-3.5 rounded-2xl bg-surface/90 backdrop-blur-md border border-line shadow-xs group-hover:border-accent/40 group-hover:shadow-md transition-all">
                  {product.badge_text && (
                    <div className="mb-1">
                      <span className="inline-block text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-soft text-accent border border-accent/20">
                        {product.badge_text}
                      </span>
                    </div>
                  )}

                  <h3 className="font-semibold text-xs sm:text-sm text-ink line-clamp-1 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-muted mt-0.5">
                    {product.category_name} · {product.size_label}
                  </p>

                  <div className="mt-1.5 flex items-baseline justify-center gap-1.5">
                    {product.sale_price !== null ? (
                      <>
                        <span className="text-xs text-muted line-through">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-accent">
                          {formatPrice(product.sale_price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs sm:text-sm font-bold text-ink">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Controls: Previous / Dots / Pause-Play / Next (hidden if < 2 products) */}
      {count >= 2 && (
        <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3">
          {/* Previous Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous product"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-surface border border-line text-ink hover:text-accent hover:border-accent active:scale-95 transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div
            role="tablist"
            aria-label="Product slides"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/80 backdrop-blur-xs border border-line shadow-2xs"
          >
            {products.map((p, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  onClick={() => goToSlide(idx)}
                  aria-selected={isCurrent}
                  aria-label={`Go to slide ${idx + 1}: ${p.name}`}
                  className="min-h-[44px] min-w-[28px] sm:min-w-[32px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full transition-all"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? "w-6 bg-accent"
                        : "w-2 bg-line hover:bg-muted/60"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Pause / Play Button */}
          <button
            type="button"
            onClick={() => setIsPausedByUser(!isPausedByUser)}
            aria-label={
              isPausedByUser ? "Resume product rotation" : "Pause product rotation"
            }
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-surface border border-line text-ink hover:text-accent hover:border-accent active:scale-95 transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {isPausedByUser ? (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            ) : (
              <Pause className="w-4 h-4 fill-current" />
            )}
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next product"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-surface border border-line text-ink hover:text-accent hover:border-accent active:scale-95 transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
}
