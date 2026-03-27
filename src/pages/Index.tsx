import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { genres } from "@/data/genreData";
import { GenreTree } from "@/components/GenreTree";
import { GenreInfoSidebar } from "@/components/GenreInfoSidebar";
import { ShaderBackground } from "@/components/ShaderBackground";
import { SplashScreen } from "@/components/SplashScreen";
import { MusicClef } from "@/components/MusicClef";

const Index = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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
        className={`border-b border-border/50 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-2 shrink-0 transition-opacity duration-700 ${
          showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <MusicClef size={18} className="text-primary shrink-0" />
          <h1 className="text-sm sm:text-lg font-bold text-foreground truncate">
            <span className="hidden sm:inline">Mikey D's </span>
            <span className="text-primary">Encyclopedia De Musique</span>
          </h1>
        </div>
        <div className="relative shrink-0">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-muted/50 border border-border/50 rounded-md pl-8 pr-3 py-1.5 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 w-28 sm:w-48"
          />
        </div>
      </header>

      {/* Main content */}
      <div
        className={`flex flex-col sm:flex-row flex-1 overflow-hidden transition-opacity duration-700 relative ${
          showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
        <GenreTree selectedId={selectedId} onSelect={handleSelect} searchQuery={searchQuery} />
        <GenreInfoSidebar genre={selectedGenre} onClose={handleClose} onSelectGenre={handleSelect} />
      </div>
    </div>
  );
};

export default Index;
