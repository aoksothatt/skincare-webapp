"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management and scroll lock when mobile drawer opens
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      // Auto-focus close button when drawer opens
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle Escape key and focus trapping inside the drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!mobileMenuOpen) return;

      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-bg/85 border-b border-line/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Brand Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="font-logo font-semibold text-2xl sm:text-3xl text-ink tracking-tight hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1"
            >
              thatskin
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/80"
          >
            <Link
              href="/shop"
              className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1 py-0.5"
            >
              Shop
            </Link>
            <Link
              href="/skin-type"
              className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1 py-0.5"
            >
              Skin type
            </Link>
            <Link
              href="/about"
              className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1 py-0.5"
            >
              About
            </Link>
          </nav>

          {/* Right: Login & Cart (Desktop) | Cart & Hamburger (Mobile) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop Login Link */}
            <Link
              href="/login"
              className="hidden md:inline-flex items-center text-sm font-medium text-ink/80 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1"
            >
              Login
            </Link>

            {/* Cart Button with dynamic count */}
            <Link
              href="/cart"
              aria-label={`Shopping Cart, ${count} item${count === 1 ? "" : "s"}`}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-3.5 py-1.5 rounded-full bg-surface border border-line text-xs font-semibold text-ink shadow-2xs hover:border-accent hover:text-accent active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ShoppingBag className="w-4 h-4 text-accent" />
              <span>Cart ({count})</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="md:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl text-ink hover:bg-soft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Drawer Menu with Focus Trap */}
      <div
        id="mobile-navigation-drawer"
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop Overlay */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
          className={`fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Slide-in Panel from Right */}
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className={`fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-surface border-l border-line p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            {/* Header: Logo & Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-line">
              <span className="font-logo font-semibold text-2xl text-ink">
                thatskin
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-ink hover:bg-soft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-2 mt-6">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 rounded-lg text-base font-medium text-ink hover:bg-soft/50 hover:text-accent transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/skin-type"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 rounded-lg text-base font-medium text-ink hover:bg-soft/50 hover:text-accent transition-colors"
              >
                Skin type
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 rounded-lg text-base font-medium text-ink hover:bg-soft/50 hover:text-accent transition-colors"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-line flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center justify-center rounded-xl bg-surface border border-line text-sm font-semibold text-ink hover:border-accent hover:text-accent transition-all"
            >
              Login
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center justify-center rounded-xl bg-accent text-onaccent text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Shop all products
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
