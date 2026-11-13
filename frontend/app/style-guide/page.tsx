"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Plus,
  Minus,
  ShoppingBag,
  Check,
  ShieldCheck,
  Star,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProductIllustration } from "@/components/ProductIllustration";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export default function StyleGuidePage() {
  const { addItem, showToast, count } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("serum");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>(["Hydration"]);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("all");

  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  };

  const colors = [
    { name: "bg", label: "Background", css: "var(--bg)", light: "#F6FBFA", dark: "#0E1A18" },
    { name: "ink", label: "Primary Ink", css: "var(--ink)", light: "#12302A", dark: "#E8F4F1" },
    { name: "muted", label: "Muted Ink", css: "var(--muted)", light: "#5B7771", dark: "#9BB5AF" },
    { name: "accent", label: "Accent Emerald", css: "var(--accent)", light: "#0B8A6B", dark: "#4FD1AE" },
    { name: "soft", label: "Soft Mint", css: "var(--soft)", light: "#DDF4EC", dark: "#16302A" },
    { name: "surface", label: "Surface Card", css: "var(--surface)", light: "#FFFFFF", dark: "#14241F" },
    { name: "line", label: "Line / Border", css: "var(--line)", light: "#DDEBE7", dark: "#243B35" },
    { name: "onaccent", label: "On Accent", css: "var(--onaccent)", light: "#FFFFFF", dark: "#0E1A18" },
    { name: "warn", label: "Warning Amber", css: "var(--warn)", light: "#9A6B00", dark: "#E8C95A" },
    { name: "sky", label: "Sky Tint", css: "var(--sky)", light: "#DFF0F9", dark: "#14303D" },
    { name: "skya", label: "Sky Accent", css: "var(--skya)", light: "#4AA6D1", dark: "#6CC0E8" },
    { name: "lemon", label: "Lemon Tint", css: "var(--lemon)", light: "#FFF4D1", dark: "#3A3517" },
    { name: "lemona", label: "Lemon Accent", css: "var(--lemona)", light: "#E3B52F", dark: "#E8C95A" },
  ];

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col transition-colors">
      <SiteHeader />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Breadcrumb Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Style Guide Header */}
        <div className="pb-8 border-b border-line">
          <span className="inline-block text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-soft text-accent border border-accent/20 mb-3">
            Phase 0 Foundation
          </span>
          <h1 className="font-display uppercase tracking-tight text-4xl sm:text-6xl text-ink leading-[0.95]">
            Design System <span className="text-accent">& Style Guide</span>
          </h1>
          <p className="mt-3 text-muted text-sm sm:text-base max-w-2xl leading-relaxed">
            The foundational design language for thatskin: responsive design tokens, typography, interactive states, accessible controls, and vector illustrations.
          </p>
        </div>

        {/* SECTION 1: COLORS */}
        <section className="py-12 border-b border-line">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
            1. Color Tokens
          </h2>
          <p className="text-muted text-sm mb-6">
            Configured as CSS variables in <code className="text-xs bg-surface px-1.5 py-0.5 rounded border border-line">app/globals.css</code> with automatic switching via <code className="text-xs bg-surface px-1.5 py-0.5 rounded border border-line">prefers-color-scheme</code>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {colors.map((c) => (
              <div
                key={c.name}
                className="p-3 rounded-2xl bg-surface border border-line shadow-2xs flex flex-col justify-between"
              >
                <div
                  className="w-full h-12 rounded-xl border border-line/40 shadow-inner mb-2"
                  style={{ backgroundColor: c.css }}
                />
                <div>
                  <p className="text-xs font-bold text-ink">--{c.name}</p>
                  <p className="text-[11px] text-muted">{c.label}</p>
                  <p className="text-[10px] text-muted/80 mt-1 font-mono">
                    Light: {c.light}
                  </p>
                  <p className="text-[10px] text-muted/80 font-mono">
                    Dark: {c.dark}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: TYPOGRAPHY */}
        <section className="py-12 border-b border-line space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              2. Typography
            </h2>
            <p className="text-muted text-sm">
              Next.js Font optimization with zero external font file requests at runtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Anton */}
            <div className="p-6 rounded-2xl bg-surface border border-line">
              <span className="text-xs uppercase font-bold text-muted tracking-wider block mb-2">
                Headline Font (Anton)
              </span>
              <p className="font-display uppercase text-3xl sm:text-4xl text-ink leading-tight">
                Skin that feels <span className="text-accent">Calm</span>
              </p>
              <p className="text-xs text-muted mt-4">
                Used for primary section headings, banners, and product showcase titles.
              </p>
            </div>

            {/* Cormorant Garamond */}
            <div className="p-6 rounded-2xl bg-surface border border-line">
              <span className="text-xs uppercase font-bold text-muted tracking-wider block mb-2">
                Brand & Editorial (Cormorant 600)
              </span>
              <p className="font-logo font-semibold text-3xl sm:text-4xl text-ink">
                thatskin
              </p>
              <p className="font-logo text-2xl text-muted mt-2">
                Clean, clinically proven simplicity.
              </p>
              <p className="text-xs text-muted mt-4">
                Used for logos, luxury sub-headings, and editorial numbers.
              </p>
            </div>

            {/* Inter Body */}
            <div className="p-6 rounded-2xl bg-surface border border-line">
              <span className="text-xs uppercase font-bold text-muted tracking-wider block mb-2">
                Body Font (Inter)
              </span>
              <p className="font-sans text-sm text-ink leading-relaxed">
                Inter delivers optimal clarity across high-DPI smartphone screens and desktop browsers with balanced tabular numerals: <strong>$24.00</strong>.
              </p>
              <p className="text-xs text-muted mt-4">
                Used for copy, product descriptions, pricing, reviews, and interactive UI controls.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: BUTTONS & CART INTERACTION */}
        <section className="py-12 border-b border-line space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              3. Buttons & Interactive States
            </h2>
            <p className="text-muted text-sm">
              All interactive elements feature visible focus rings and meet the strict <strong>≥ 44px</strong> touch target requirement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => showToast("Primary button triggered!", "info")}
              className="min-h-[44px] px-8 py-3 rounded-full bg-accent text-onaccent font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Primary Button
            </button>

            {/* Secondary Button */}
            <button
              type="button"
              onClick={() => showToast("Secondary button clicked", "info")}
              className="min-h-[44px] px-6 py-2.5 rounded-full bg-surface border border-line text-ink font-semibold text-sm hover:border-accent hover:text-accent active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-2xs"
            >
              Secondary Button
            </button>

            {/* Outline Button */}
            <button
              type="button"
              className="min-h-[44px] px-6 py-2.5 rounded-full border border-accent text-accent font-semibold text-sm hover:bg-soft/40 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Outline Button
            </button>

            {/* Disabled Button */}
            <button
              type="button"
              disabled
              className="min-h-[44px] px-6 py-2.5 rounded-full bg-surface border border-line text-muted font-medium text-sm opacity-50 cursor-not-allowed"
            >
              Out of Stock (Disabled)
            </button>

            {/* Interactive Cart Test Button */}
            <button
              type="button"
              onClick={() => addItem("var-1-1", 1, "Dewy Hydration Serum added to cart!")}
              className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-onaccent font-bold text-sm shadow-sm hover:shadow-md active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Mock Item to Cart (Current: {count})</span>
            </button>
          </div>
        </section>

        {/* SECTION 4: CHIPS & FILTERS */}
        <section className="py-12 border-b border-line space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              4. Chips & Filter Selectors
            </h2>
            <p className="text-muted text-sm">
              Single-select category chips and multi-select skin concern pills for the shop catalog.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase font-bold text-muted mb-2">
                Single-Select Chips (Category):
              </p>
              <div className="flex flex-wrap gap-2">
                {["all", "serum", "cleanser", "moisturizer", "sunscreen", "toner"].map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold capitalize transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        isActive
                          ? "bg-accent text-onaccent shadow-xs"
                          : "bg-surface border border-line text-ink hover:border-accent hover:text-accent"
                      }`}
                    >
                      {cat === "all" ? "All Categories" : cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase font-bold text-muted mb-2">
                Multi-Select Chips (Concerns):
              </p>
              <div className="flex flex-wrap gap-2">
                {["Hydration", "Acne", "Brightening"].map((concern) => {
                  const isSelected = selectedConcerns.includes(concern);
                  return (
                    <button
                      key={concern}
                      type="button"
                      onClick={() => toggleConcern(concern)}
                      className={`min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        isSelected
                          ? "bg-soft text-accent border border-accent/40"
                          : "bg-surface border border-line text-ink hover:border-line hover:bg-bg"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent" />}
                      <span>{concern}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase font-bold text-muted mb-2">
                Removable Filter Tag:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-soft text-accent text-xs font-semibold border border-accent/20">
                  <span>Skin: Oily</span>
                  <button
                    type="button"
                    aria-label="Remove filter"
                    className="hover:text-ink transition-colors"
                  >
                    ✕
                  </button>
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-soft text-accent text-xs font-semibold border border-accent/20">
                  <span>Price: Under $20</span>
                  <button
                    type="button"
                    aria-label="Remove filter"
                    className="hover:text-ink transition-colors"
                  >
                    ✕
                  </button>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: BADGES */}
        <section className="py-12 border-b border-line space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              5. Badges & Status Indicators
            </h2>
            <p className="text-muted text-sm">
              Subtle, high-contrast pills used to highlight product promotions and stock alerts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-soft text-accent border border-accent/25">
              Bestseller
            </span>

            <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-lemon text-lemona border border-lemona/30">
              Sale · 20% OFF
            </span>

            <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky text-skya border border-skya/30">
              New Arrival
            </span>

            <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-warn/15 text-warn border border-warn/30">
              Only 3 Left
            </span>

            <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-line text-muted">
              Out of Stock
            </span>
          </div>
        </section>

        {/* SECTION 6: FORM INPUTS */}
        <section className="py-12 border-b border-line space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              6. Form Inputs & Steppers
            </h2>
            <p className="text-muted text-sm">
              Accessible inputs, accessible dropdown select, and clamped quantity steppers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Search Input */}
            <div>
              <label htmlFor="search-input" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Search Products
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search serum, cleanser..."
                  className="w-full min-h-[44px] pl-10 pr-4 rounded-xl bg-surface border border-line text-ink text-sm placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all"
                />
              </div>
            </div>

            {/* Select Dropdown */}
            <div>
              <label htmlFor="price-select" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Price Filter
              </label>
              <select
                id="price-select"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full min-h-[44px] px-3.5 rounded-xl bg-surface border border-line text-ink text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all"
              >
                <option value="all">All Prices</option>
                <option value="u20">Under $20</option>
                <option value="m">$20 – $30</option>
                <option value="o30">Over $30</option>
              </select>
            </div>

            {/* Quantity Stepper */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Quantity Selector
              </label>
              <div className="inline-flex items-center rounded-xl bg-surface border border-line p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-lg text-ink hover:bg-soft/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  disabled={quantity >= 10}
                  className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-lg text-ink hover:bg-soft/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: PRODUCT ILLUSTRATIONS (PODIUM VS TILE) */}
        <section className="py-12 border-b border-line space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              7. Product Vector Illustrations (Podium & Tile Modes)
            </h2>
            <p className="text-muted text-sm">
              Procedural vector illustrations for serum, pump, jar, and tube products. (Real photography will replace these in production).
            </p>
          </div>

          <div className="space-y-8">
            {/* Podium Mode */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">
                Podium Mode (Elevated 3D Stand — Used in Hero Section):
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-line text-center">
                  <div className="h-48 flex items-end justify-center">
                    <ProductIllustration type="serum" tint="soft" bodyColor="accent" mode="podium" />
                  </div>
                  <p className="text-xs font-semibold text-ink mt-2">Serum (Dropper)</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-line text-center">
                  <div className="h-48 flex items-end justify-center">
                    <ProductIllustration type="pump" tint="sky" bodyColor="skya" mode="podium" />
                  </div>
                  <p className="text-xs font-semibold text-ink mt-2">Pump (Cleanser/Toner)</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-line text-center">
                  <div className="h-48 flex items-end justify-center">
                    <ProductIllustration type="jar" tint="lemon" bodyColor="lemona" mode="podium" />
                  </div>
                  <p className="text-xs font-semibold text-ink mt-2">Jar (Moisturizer Cream)</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-line text-center">
                  <div className="h-48 flex items-end justify-center">
                    <ProductIllustration type="tube" tint="soft" bodyColor="accent" mode="podium" />
                  </div>
                  <p className="text-xs font-semibold text-ink mt-2">Tube (Sunscreen/Gel)</p>
                </div>
              </div>
            </div>

            {/* Tile Mode */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">
                Tile Mode (Centered on Tinted Square — Used in Shop Cards & Details):
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-surface border border-line text-center">
                  <div className="h-48 flex items-center justify-center">
                    <ProductIllustration type="serum" tint="soft" bodyColor="accent" mode="tile" />
                  </div>
                  <p className="text-xs font-semibold text-ink mt-2">Serum Tile</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-line text-center">
                  <div className="h-48 flex items-center justify-center">
                    <ProductIllustration type="pump" tint="sky" bodyColor="skya" mode="tile" />
                  </div>
                  <p className="text-xs font-semibold text-ink mt-2">Pump Tile</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-line text-center">
                  <div className="h-48 flex items-center justify-center">
                    <ProductIllustration type="jar" tint="lemon" bodyColor="lemona" mode="tile" />
                  </div>
                  <p className="text-xs font-semibold text-ink mt-2">Jar Tile</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-line text-center">
                  <div className="h-48 flex items-center justify-center">
                    <ProductIllustration type="tube" tint="soft" bodyColor="accent" mode="tile" />
                  </div>
                  <p className="text-xs font-semibold text-ink mt-2">Tube Tile</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: COMPONENT PREVIEWS */}
        <section className="py-12 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              8. Component Previews: Product Card & Review Card
            </h2>
            <p className="text-muted text-sm">
              Building blocks for Phase 2 (Shop catalog) and Phase 3 (Product details).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Card Preview */}
            <div className="p-5 rounded-2xl bg-surface border border-line max-w-sm shadow-xs">
              <div className="relative w-full h-56 flex items-center justify-center mb-4">
                <ProductIllustration type="serum" tint="soft" bodyColor="accent" mode="tile" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-soft text-accent border border-accent/20">
                  Bestseller
                </span>
              </div>
              <p className="text-xs text-muted">Serum · 30 ml</p>
              <h3 className="font-semibold text-base text-ink mt-0.5">
                Dewy Hydration Serum
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-base font-bold text-ink">{formatPrice(24)}</span>
              </div>
              <button
                type="button"
                onClick={() => addItem("var-1-1", 1, "Dewy Hydration Serum added!")}
                className="mt-4 w-full min-h-[44px] rounded-xl bg-accent text-onaccent font-semibold text-sm hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Add to cart</span>
              </button>
            </div>

            {/* Review Card Preview */}
            <div className="p-5 rounded-2xl bg-surface border border-line max-w-md shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-ink">Sophea M.</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-soft text-accent font-medium">
                      Dry skin
                    </span>
                  </div>
                  <span className="text-xs text-muted">2 weeks ago</span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-accent mb-3" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-muted leading-relaxed">
                  &ldquo;Instantly plumps my skin without feeling greasy. A holy grail in Phnom Penh weather!&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-line/60 flex items-center gap-1.5 text-xs text-muted font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Verified Buyer</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
