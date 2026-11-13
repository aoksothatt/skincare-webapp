import React from "react";
import { IllustrationType, IllustrationMode } from "@/lib/types";

// Real photos will replace these procedural vector illustrations.

interface ProductIllustrationProps {
  type: IllustrationType;
  tint: string;
  bodyColor: string;
  mode?: IllustrationMode; // "podium" (default) or "tile"
  className?: string;
  ariaLabel?: string;
}

/**
 * Resolves color string to either a CSS variable or literal color.
 */
function resolveColor(c: string): string {
  if (!c) return "var(--accent)";
  if (
    c.startsWith("#") ||
    c.startsWith("rgb") ||
    c.startsWith("hsl") ||
    c.startsWith("var(")
  ) {
    return c;
  }
  return `var(--${c})`;
}

export function ProductIllustration({
  type,
  tint,
  bodyColor,
  mode = "podium",
  className = "w-full h-auto",
  ariaLabel,
}: ProductIllustrationProps) {
  const resolvedTint = resolveColor(tint);
  const resolvedBody = resolveColor(bodyColor);

  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={ariaLabel ? "img" : "presentation"}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      <defs>
        {/* Soft shadow for the podium */}
        <radialGradient
          id={`podium-shadow-${type}-${mode}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(100 226) scale(84 15)"
        >
          <stop stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>

        {/* Podium cylinder top surface gradient */}
        <linearGradient
          id={`podium-top-${type}`}
          x1="100"
          y1="198"
          x2="100"
          y2="216"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--surface)" stopOpacity="0.95" />
          <stop offset="1" stopColor="var(--line)" stopOpacity="0.85" />
        </linearGradient>

        {/* Podium cylinder rim / side */}
        <linearGradient
          id={`podium-side-${type}`}
          x1="24"
          y1="207"
          x2="176"
          y2="207"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--line)" />
          <stop offset="0.5" stopColor="var(--surface)" />
          <stop offset="1" stopColor="var(--line)" />
        </linearGradient>

        {/* Bottle drop shadow */}
        <radialGradient
          id={`bottle-shadow-${type}-${mode}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(100 208) scale(38 9)"
        >
          <stop stopColor="#000000" stopOpacity="0.18" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Glass specular sheen */}
        <linearGradient id={`glass-sheen-${type}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="0.3" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="0.7" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* --- BACKGROUND MODE --- */}
      {mode === "tile" ? (
        /* Tile mode: Centered on a tinted square with soft rounded corners and subtle border */
        <g id="illustration-tile-bg">
          <rect
            x="12"
            y="12"
            width="176"
            height="216"
            rx="24"
            fill={resolvedTint}
            fillOpacity="0.35"
            stroke="var(--line)"
            strokeWidth="1.2"
          />
          {/* Subtle inner ambient sheen */}
          <rect
            x="14"
            y="14"
            width="172"
            height="100"
            rx="22"
            fill="#FFFFFF"
            fillOpacity="0.12"
          />
          {/* Ground drop shadow under bottle inside tile */}
          <ellipse cx="100" cy="204" rx="42" ry="8" fill="url(#bottle-shadow)" />
        </g>
      ) : (
        /* Podium mode: Standing on an elevated 3D round cylindrical podium */
        <g id="illustration-podium-bg">
          {/* Ground ambient shadow */}
          <ellipse
            cx="100"
            cy="226"
            rx="84"
            ry="15"
            fill={`url(#podium-shadow-${type}-${mode})`}
            className="text-ink"
          />

          {/* Podium base depth / 3D rim */}
          <path
            d="M 24 207 A 76 15 0 0 0 176 207 L 176 218 A 76 15 0 0 1 24 218 Z"
            fill={`url(#podium-side-${type})`}
          />
          <path
            d="M 24 218 A 76 15 0 0 0 176 218"
            stroke="var(--line)"
            strokeWidth="1"
            fill="none"
          />

          {/* Podium top round disc */}
          <ellipse
            cx="100"
            cy="207"
            rx="76"
            ry="15"
            fill={`url(#podium-top-${type})`}
            stroke="var(--line)"
            strokeWidth="1.2"
          />

          {/* Subtle inner podium bevel */}
          <ellipse
            cx="100"
            cy="206.5"
            rx="72"
            ry="13.5"
            stroke="#FFFFFF"
            strokeOpacity="0.6"
            strokeWidth="0.8"
            fill="none"
          />

          {/* Bottle contact shadow on podium surface */}
          <ellipse
            cx="100"
            cy="207"
            rx="36"
            ry="7"
            fill={`url(#bottle-shadow-${type}-${mode})`}
          />
        </g>
      )}

      {/* --- PRODUCT TYPE SPECIFIC ILLUSTRATIONS --- */}
      {type === "serum" && (
        <g id="illustration-serum">
          {/* Outer Glass Bottle Body */}
          <rect
            x="68"
            y="98"
            width="64"
            height="102"
            rx="16"
            fill={resolvedTint}
            fillOpacity="0.75"
            stroke="var(--line)"
            strokeWidth="1.5"
          />

          {/* Internal Serum Liquid with curved meniscus */}
          <path
            d="M 71 130 Q 100 134 129 130 L 129 186 A 13 13 0 0 1 116 198 L 84 198 A 13 13 0 0 1 71 186 Z"
            fill={resolvedBody}
            fillOpacity="0.22"
          />

          {/* Inner pipette stem */}
          <rect x="98" y="70" width="4" height="112" rx="2" fill="#FFFFFF" fillOpacity="0.5" />
          <circle cx="100" cy="184" r="3.5" fill={resolvedBody} fillOpacity="0.5" />

          {/* Glass reflection gloss */}
          <rect x="73" y="102" width="10" height="92" rx="5" fill={`url(#glass-sheen-${type})`} />
          <path d="M 125 106 L 125 190" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />

          {/* Minimalist bottle label */}
          <rect x="77" y="132" width="46" height="42" rx="4" fill="var(--surface)" fillOpacity="0.94" stroke="var(--line)" strokeWidth="1" />
          <rect x="85" y="142" width="30" height="2.5" rx="1.25" fill={resolvedBody} />
          <rect x="89" y="150" width="22" height="1.5" rx="0.75" fill="var(--muted)" fillOpacity="0.6" />
          <rect x="91" y="156" width="18" height="1.5" rx="0.75" fill="var(--muted)" fillOpacity="0.4" />

          {/* Bottle Collar */}
          <rect x="85" y="86" width="30" height="14" rx="2" fill={resolvedTint} stroke="var(--line)" strokeWidth="1.2" />
          <rect x="83" y="74" width="34" height="13" rx="3" fill={resolvedBody} />
          <rect x="85" y="76" width="30" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.4" />

          {/* Rubber Bulb Cap */}
          <path
            d="M 89 74 C 89 54 94 48 100 48 C 106 48 111 54 111 74 Z"
            fill="var(--ink)"
            fillOpacity="0.88"
          />
          <path
            d="M 94 72 C 94 58 97 52 100 52"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
        </g>
      )}

      {type === "pump" && (
        <g id="illustration-pump">
          {/* Tall Cleanser/Toner Bottle Body */}
          <rect
            x="72"
            y="82"
            width="56"
            height="124"
            rx="12"
            fill={resolvedTint}
            fillOpacity="0.85"
            stroke="var(--line)"
            strokeWidth="1.5"
          />

          {/* Liquid gradient fill */}
          <rect
            x="75"
            y="104"
            width="50"
            height="98"
            rx="9"
            fill={resolvedBody}
            fillOpacity="0.18"
          />

          {/* Glass specular sheen line */}
          <rect x="76" y="86" width="6" height="116" rx="3" fill="#FFFFFF" fillOpacity="0.4" />
          <path d="M 124 90 L 124 196" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.3" strokeLinecap="round" />

          {/* Label Card */}
          <rect x="79" y="112" width="42" height="58" rx="4" fill="var(--surface)" fillOpacity="0.94" stroke="var(--line)" strokeWidth="1" />
          <rect x="86" y="124" width="28" height="3" rx="1.5" fill={resolvedBody} />
          <rect x="88" y="133" width="24" height="1.5" rx="0.75" fill="var(--muted)" fillOpacity="0.7" />
          <rect x="91" y="140" width="18" height="1.5" rx="0.75" fill="var(--muted)" fillOpacity="0.5" />
          <circle cx="100" cy="154" r="3.5" fill={resolvedTint} stroke={resolvedBody} strokeWidth="1" />

          {/* Bottle Neck Ring */}
          <rect x="86" y="70" width="28" height="13" rx="2" fill="var(--line)" />
          {/* Pump Collar */}
          <rect x="84" y="60" width="32" height="12" rx="3" fill={resolvedBody} />
          <rect x="86" y="62" width="28" height="1.5" rx="0.75" fill="#FFFFFF" fillOpacity="0.4" />

          {/* Pump Stem */}
          <rect x="96" y="50" width="8" height="11" fill="var(--muted)" fillOpacity="0.6" />

          {/* Pump Dispenser Head with angled spout */}
          <path
            d="M 80 40 L 112 40 C 115 40 117 42 117 45 L 117 49 C 117 51 115 53 112 53 L 86 53 L 78 57 C 76 58 74 57 74 55 L 75 45 C 75 42 77 40 80 40 Z"
            fill="var(--ink)"
            fillOpacity="0.88"
          />
          <rect x="92" y="38" width="18" height="3" rx="1.5" fill="var(--muted)" fillOpacity="0.5" />
        </g>
      )}

      {type === "jar" && (
        <g id="illustration-jar">
          {/* Wide Cream Jar Base Glass */}
          <rect
            x="52"
            y="138"
            width="96"
            height="68"
            rx="14"
            fill={resolvedTint}
            fillOpacity="0.85"
            stroke="var(--line)"
            strokeWidth="1.5"
          />

          {/* Rich Cream Interior */}
          <rect
            x="57"
            y="146"
            width="86"
            height="55"
            rx="10"
            fill={resolvedBody}
            fillOpacity="0.25"
          />

          {/* Jar Sheen Highlight */}
          <rect x="58" y="142" width="10" height="58" rx="5" fill="#FFFFFF" fillOpacity="0.4" />
          <path d="M 142 144 L 142 198" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" />

          {/* Minimalist front jar label */}
          <rect x="68" y="152" width="64" height="36" rx="4" fill="var(--surface)" fillOpacity="0.94" stroke="var(--line)" strokeWidth="1" />
          <rect x="78" y="162" width="44" height="3" rx="1.5" fill={resolvedBody} />
          <rect x="84" y="171" width="32" height="1.5" rx="0.75" fill="var(--muted)" fillOpacity="0.6" />

          {/* Jar Rim / Neck */}
          <rect x="56" y="132" width="88" height="8" rx="2" fill="var(--line)" />

          {/* Luxury Screw-on Jar Lid */}
          <rect
            x="48"
            y="114"
            width="104"
            height="20"
            rx="5"
            fill={resolvedBody}
            stroke="var(--line)"
            strokeWidth="1.2"
          />
          <rect x="50" y="116" width="100" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.5" />
          <ellipse cx="100" cy="114" rx="48" ry="4" fill={resolvedBody} />
          <ellipse cx="100" cy="113.5" rx="42" ry="2.5" fill="#FFFFFF" fillOpacity="0.3" />
        </g>
      )}

      {type === "tube" && (
        <g id="illustration-tube">
          {/* Sunscreen / Squeeze Tube Body */}
          <path
            d="M 72 74 L 128 74 C 130 74 131 75 131 77 L 122 172 C 122 174 120 176 118 176 L 82 176 C 80 176 78 174 78 172 L 69 77 C 69 75 70 74 72 74 Z"
            fill={resolvedTint}
            fillOpacity="0.88"
            stroke="var(--line)"
            strokeWidth="1.5"
          />

          {/* Accent wave across the tube */}
          <path
            d="M 70.5 98 C 85 106 115 92 129.5 101 L 126.5 136 C 112 128 88 142 73.5 133 Z"
            fill={resolvedBody}
            fillOpacity="0.28"
          />

          {/* Top crimped seal seam */}
          <rect x="67" y="66" width="66" height="9" rx="2" fill={resolvedBody} />
          <rect x="69" y="68" width="62" height="1.5" rx="0.75" fill="#FFFFFF" fillOpacity="0.4" />
          <line x1="78" y1="68" x2="78" y2="73" stroke="var(--surface)" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="86" y1="68" x2="86" y2="73" stroke="var(--surface)" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="94" y1="68" x2="94" y2="73" stroke="var(--surface)" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="102" y1="68" x2="102" y2="73" stroke="var(--surface)" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="110" y1="68" x2="110" y2="73" stroke="var(--surface)" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="118" y1="68" x2="118" y2="73" stroke="var(--surface)" strokeWidth="1" strokeOpacity="0.6" />

          {/* Minimalist branding on tube body */}
          <rect x="84" y="110" width="32" height="2.5" rx="1.25" fill="var(--ink)" fillOpacity="0.8" />
          <rect x="88" y="117" width="24" height="1.5" rx="0.75" fill="var(--muted)" fillOpacity="0.7" />
          <rect x="91" y="123" width="18" height="1.5" rx="0.75" fill="var(--muted)" fillOpacity="0.5" />
          <circle cx="100" cy="144" r="8" fill="var(--surface)" stroke={resolvedBody} strokeWidth="1.2" />
          <text x="100" y="147" fontSize="6" fontWeight="bold" fill={resolvedBody} textAnchor="middle">50+</text>

          {/* Screw Cap at bottom resting on podium */}
          <rect
            x="84"
            y="176"
            width="32"
            height="26"
            rx="4"
            fill="var(--surface)"
            stroke="var(--line)"
            strokeWidth="1.5"
          />
          <line x1="90" y1="180" x2="90" y2="198" stroke="var(--line)" strokeWidth="1" />
          <line x1="96" y1="180" x2="96" y2="198" stroke="var(--line)" strokeWidth="1" />
          <line x1="104" y1="180" x2="104" y2="198" stroke="var(--line)" strokeWidth="1" />
          <line x1="110" y1="180" x2="110" y2="198" stroke="var(--line)" strokeWidth="1" />
        </g>
      )}
    </svg>
  );
}
