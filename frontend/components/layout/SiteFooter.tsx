import React from "react";
import Link from "next/link";
import { QrCode, CreditCard, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface border-t border-line text-ink transition-colors mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link
              href="/"
              className="font-logo font-semibold text-2xl text-ink tracking-tight inline-block hover:opacity-90 transition-opacity"
            >
              thatskin
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              Authentic, clinically supported skincare designed for calm, clear, and healthy skin in humid climates.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-medium text-accent">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Authentic Guaranteed</span>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-semibold text-sm text-ink mb-3.5 tracking-wide uppercase">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link href="/shop" className="hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=serum" className="hover:text-accent transition-colors">
                  Serums & Treatments
                </Link>
              </li>
              <li>
                <Link href="/shop?category=cleanser" className="hover:text-accent transition-colors">
                  Cleansers
                </Link>
              </li>
              <li>
                <Link href="/shop?category=moisturizer" className="hover:text-accent transition-colors">
                  Moisturizers
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sunscreen" className="hover:text-accent transition-colors">
                  Sun Protection
                </Link>
              </li>
            </ul>
          </div>

          {/* Skin Concerns & Routine */}
          <div>
            <h4 className="font-semibold text-sm text-ink mb-3.5 tracking-wide uppercase">
              Skin Types
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link href="/shop?skin=sensitive" className="hover:text-accent transition-colors">
                  Sensitive Skin
                </Link>
              </li>
              <li>
                <Link href="/shop?skin=oily" className="hover:text-accent transition-colors">
                  Oily & Acne-Prone
                </Link>
              </li>
              <li>
                <Link href="/shop?skin=dry" className="hover:text-accent transition-colors">
                  Dry & Dehydrated
                </Link>
              </li>
              <li>
                <Link href="/shop?skin=combination" className="hover:text-accent transition-colors">
                  Combination
                </Link>
              </li>
              <li>
                <Link href="/style-guide" className="hover:text-accent transition-colors text-xs font-semibold text-accent/80">
                  Design Style Guide →
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment & Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-ink mb-3.5 tracking-wide uppercase">
              Payment & Delivery
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Fast, direct door-to-door delivery across all 25 provinces in Cambodia.
            </p>

            {/* Official Payment Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {/* ABA PayWay Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg border border-line text-xs font-semibold text-ink shadow-2xs">
                <CreditCard className="w-3.5 h-3.5 text-accent" />
                <span>ABA PayWay</span>
              </div>

              {/* Bakong KHQR Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg border border-line text-xs font-semibold text-ink shadow-2xs">
                <QrCode className="w-3.5 h-3.5 text-accent" />
                <span>Bakong KHQR</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-muted">
              <p>Phnom Penh, Cambodia</p>
              <p className="mt-0.5">Support: hello@thatskin.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© 2026 thatskin. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-accent transition-colors">
              About Us
            </Link>
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
