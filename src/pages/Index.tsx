import { useState, useCallback } from "react";
import { genres } from "@/data/genreData";
import { GenreTree } from "@/components/GenreTree";
import { GenreInfoSidebar } from "@/components/GenreInfoSidebar";
import { ShaderBackground } from "@/components/ShaderBackground";
import { SplashScreen } from "@/components/SplashScreen";
import { MusicClef } from "@/components/MusicClef";

const Index = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const selectedGenre = selectedId ? genres.find((g) => g.id === selectedId) ?? null : null;

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => setSelectedId(null), []);
  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  return (
    <div className="h-screen flex flex-col bg-background/80 overflow-hidden relative">
      <ShaderBackground />

      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Header */}
      <header
        className={`border-b border-border/50 backdrop-blur-sm px-6 py-3 flex items-center justify-between shrink-0 transition-opacity duration-700 ${
          showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <MusicClef size={20} className="text-primary" />
          <h1 className="text-lg font-bold text-foreground">
            Mikey D's <span className="text-primary">Encyclopedia De Musique</span>
          </h1>
        </div>
        <p className="text-xs text-muted-foreground font-mono hidden sm:block">
          1940s → Present · {genres.length} genres · Click a node to explore
        </p>
      </header>

      {/* Main content */}
      <div
        className={`flex flex-1 overflow-hidden transition-opacity duration-700 ${
          showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
        <GenreTree selectedId={selectedId} onSelect={handleSelect} />
        <GenreInfoSidebar genre={selectedGenre} onClose={handleClose} onSelectGenre={handleSelect} />
      </div>
    </div>
  );
};

export default Index;

