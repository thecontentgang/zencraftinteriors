'use client';

import React from 'react';

interface ConsultationButtonProps {
  text?: string;
  topText?: string;
  bottomText?: string;
  color?: string;
  onClick?: () => void;
  className?: string;
}

const ConsultationButton: React.FC<ConsultationButtonProps> = ({
  text = 'Book a Free Call',
  topText = 'Expert Advice',
  bottomText = "Let's Talk",
  color = '#C8A97E',
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`group relative inline-flex items-center justify-center cursor-pointer ${className}`}
      onClick={onClick}
      style={
        {
          '--btn-color': color,
          '--duration': '300ms',
          '--timing-function': 'cubic-bezier(0.22, 1, 0.36, 1)',
        } as React.CSSProperties
      }
    >
      <style>{`
        .consult-btn-layer {
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,0.25),
              rgba(255,255,255,0.05)
            ),
            var(--btn-color);
        }

        .consult-btn-shadow {
          box-shadow:
            inset 0 1px 1px rgba(255,255,255,0.4),
            0 4px 12px rgba(0,0,0,0.12);
        }

        .consult-btn-text-shadow {
          text-shadow:
            0 1px 1px rgba(255,255,255,0.4),
            0 -1px 1px rgba(0,0,0,0.08);
        }

        @keyframes floatGlow {
          0%,100% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(-12deg);
          }
        }

        .group:hover .drawer-anim {
          animation: floatGlow 3s linear infinite;
        }
      `}</style>

      {/* TOP DRAWER */}
      <div
        className="
          absolute
          top-0
          left-0
          h-[24px]
          px-3
          rounded-t-lg
          flex
          items-start
          justify-center
          text-[10px]
          font-medium
          uppercase
          tracking-[0.18em]
          text-black/60
          consult-btn-layer
          opacity-0
          blur-[2px]
          transition-all
          duration-200
          ease-out
          group-hover:-translate-y-4
          group-hover:rotate-2
          group-hover:opacity-100
          group-hover:blur-0
          drawer-anim
          group-active:translate-y-0
          group-active:opacity-0
        "
      >
        {topText}
      </div>

      {/* BOTTOM DRAWER */}
      <div
        className="
          absolute
          bottom-0
          right-0
          h-[24px]
          px-3
          rounded-b-lg
          flex
          items-end
          justify-center
          text-[10px]
          font-medium
          uppercase
          tracking-[0.18em]
          text-black/60
          consult-btn-layer
          opacity-0
          blur-[2px]
          transition-all
          duration-200
          ease-out
          group-hover:translate-y-4
          group-hover:rotate-2
          group-hover:opacity-100
          group-hover:blur-0
          drawer-anim
          group-active:translate-y-0
          group-active:opacity-0
        "
      >
        {bottomText}
      </div>

      {/* MAIN BUTTON */}
      <button
        className="
          relative
          min-w-[150px]
          md:min-w-[170px]
          h-[42px]
          md:h-[46px]
          px-5
          rounded-xl
          border-none
          consult-btn-layer
          consult-btn-shadow
          z-10
          overflow-hidden
          transition-all
          group-hover:scale-[1.03]
          group-hover:-translate-y-0.5
          group-hover:shadow-xl
          group-active:scale-[0.98]
        "
        style={{
          transitionDuration: 'var(--duration)',
          transitionTimingFunction: 'var(--timing-function)',
        }}
      >
        {/* Shine Effect */}
        <span
          className="
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            group-hover:translate-x-full
            transition-transform
            duration-1000
          "
        />

        <span
          className="
            relative
            z-10
            text-sm
            font-medium
            tracking-[0.02em]
            text-black/75
            consult-btn-text-shadow
          "
        >
          {text}
        </span>
      </button>

      {/* TOP LEFT */}
      <svg
        className="
          absolute
          w-5
          fill-none
          stroke-black/10
          top-0
          left-0
          -translate-x-3
          -translate-y-3
          rotate-90
          transition-all
          duration-300
          group-hover:-translate-x-5
          group-hover:-translate-y-5
          group-hover:stroke-black/20
        "
        viewBox="-1 1 32 32"
      >
        <path d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z" />
      </svg>

      {/* TOP RIGHT */}
      <svg
        className="
          absolute
          w-5
          fill-none
          stroke-black/10
          top-0
          right-0
          translate-x-3
          -translate-y-3
          rotate-180
          transition-all
          duration-300
          group-hover:translate-x-5
          group-hover:-translate-y-5
          group-hover:stroke-black/20
        "
        viewBox="-1 1 32 32"
      >
        <path d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z" />
      </svg>

      {/* BOTTOM RIGHT */}
      <svg
        className="
          absolute
          w-5
          fill-none
          stroke-black/10
          bottom-0
          right-0
          translate-x-3
          translate-y-3
          -rotate-90
          transition-all
          duration-300
          group-hover:translate-x-5
          group-hover:translate-y-5
          group-hover:stroke-black/20
        "
        viewBox="-1 1 32 32"
      >
        <path d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z" />
      </svg>

      {/* BOTTOM LEFT */}
      <svg
        className="
          absolute
          w-5
          fill-none
          stroke-black/10
          bottom-0
          left-0
          -translate-x-3
          translate-y-3
          transition-all
          duration-300
          group-hover:-translate-x-5
          group-hover:translate-y-5
          group-hover:stroke-black/20
        "
        viewBox="-1 1 32 32"
      >
        <path d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z" />
      </svg>
    </div>
  );
};

export default ConsultationButton;