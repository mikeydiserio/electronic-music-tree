import { useState, useEffect } from "react";
import { MusicClef } from "@/components/MusicClef";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("hold"), 100);
    const holdTimer = setTimeout(() => setPhase("exit"), 2800);
    const exitTimer = setTimeout(() => onComplete(), 3800);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Glowing icon */}
      <div
        className={`mb-6 transition-all duration-1000 ease-out ${
          phase === "enter"
            ? "opacity-0 scale-50"
            : "opacity-100 scale-100"
        }`}
      >
        <div className="relative">
          <MusicClef size={64} className="text-primary drop-shadow-[0_0_24px_hsl(var(--primary)/0.8)]" />
          <div className="absolute inset-0 animate-ping">
            <MusicClef size={64} className="text-primary/30" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1
        className={`text-4xl sm:text-5xl font-bold text-foreground tracking-tight text-center transition-all duration-1000 delay-300 ease-out ${
          phase === "enter"
            ? "opacity-0 translate-y-6"
            : "opacity-100 translate-y-0"
        }`}
      >
        Mikey D's
      </h1>
      <h2
        className={`text-2xl sm:text-3xl font-bold mt-2 text-center transition-all duration-1000 delay-500 ease-out ${
          phase === "enter"
            ? "opacity-0 translate-y-6"
            : "opacity-100 translate-y-0"
        }`}
      >
        <span className="text-primary text-glow-cyan">Encyclopedia</span>{" "}
        <span className="text-secondary text-glow-magenta">De Musique</span>
      </h2>

      {/* Subtitle */}
      <p
        className={`mt-6 text-sm font-mono text-muted-foreground transition-all duration-1000 delay-700 ease-out ${
          phase === "enter"
            ? "opacity-0"
            : "opacity-100"
        }`}
      >
        1940s → Present
      </p>

      {/* Decorative line */}
      <div
        className={`mt-8 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-all duration-1000 delay-500 ease-out ${
          phase === "enter" ? "w-0" : "w-64"
        }`}
      />
    </div>
  );
}
