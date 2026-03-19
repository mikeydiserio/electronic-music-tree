import React from "react";

interface MusicClefProps {
  className?: string;
  size?: number;
}

export const MusicClef: React.FC<MusicClefProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Treble Clef */}
    <path
      d="M28 8c0 0-8 6-8 16c0 8 4 12 4 18c0 4-2 8-6 10c-3 2-2 6 1 6c4 0 7-3 7-7c0-3-1-5-1-9c0-6 5-10 5-18C30 16 28 8 28 8z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="22" cy="52" r="4" stroke="currentColor" strokeWidth="2.5" />
    <line x1="28" y1="8" x2="28" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

    {/* Bass Clef */}
    <path
      d="M40 24c0 0 10 2 10 10c0 6-4 10-10 12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="44" cy="26" r="2" fill="currentColor" />
    <circle cx="44" cy="32" r="2" fill="currentColor" />
  </svg>
);
