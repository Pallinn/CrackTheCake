"use client";
import { useRef, useState, useEffect, ReactNode } from "react";

export function SketchBox({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => {
      if (ref.current) setDims({ w: ref.current.offsetWidth, h: ref.current.offsetHeight });
    };
    update();
    const ro = new ResizeObserver(update);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {dims.w > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none overflow-visible"
          width={dims.w}
          height={dims.h}
          style={{ zIndex: 0 }}
        >
          <defs>
            <filter id="sk-box" x="-8%" y="-8%" width="116%" height="116%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="5" result="n"/>
              <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
          <rect
            x="8" y="8"
            width={dims.w - 16} height={dims.h - 16}
            fill="none"
            stroke="#2C5F2E"
            strokeWidth="2.8"
            rx="16"
            filter="url(#sk-box)"
          />
        </svg>
      )}
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

/* Sketch-style button box (for choices) */
export function SketchChoiceBox({
  children,
  selected,
  onClick,
  className = "",
}: {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => {
      if (ref.current) setDims({ w: ref.current.offsetWidth, h: ref.current.offsetHeight });
    };
    update();
    const ro = new ResizeObserver(update);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`choice-box relative w-full text-left px-5 py-3.5 ${className}`}
      style={{
        background: selected ? "rgba(44,95,46,0.08)" : "transparent",
        transition: "all .2s ease",
      }}
    >
      {dims.w > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none overflow-visible"
          width={dims.w}
          height={dims.h}
          style={{ zIndex: 0 }}
        >
          <defs>
            <filter id="sk-choice" x="-8%" y="-8%" width="116%" height="116%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="9" result="n"/>
              <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
          <rect
            x="5" y="5"
            width={dims.w - 10} height={dims.h - 10}
            fill="none"
            stroke={selected ? "#2C5F2E" : "rgba(44,95,46,0.4)"}
            strokeWidth={selected ? "2.5" : "1.8"}
            rx="12"
            filter="url(#sk-choice)"
          />
        </svg>
      )}
      <span className="relative" style={{ zIndex: 1 }}>
        {children}
      </span>
    </button>
  );
}
