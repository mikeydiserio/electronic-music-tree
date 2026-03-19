import { useState, useCallback } from "react";
import { genres } from "@/data/genreData";
import { GenreTree } from "@/components/GenreTree";
import { GenreInfoSidebar } from "@/components/GenreInfoSidebar";
import { Zap } from "lucide-react";

const Index = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedGenre = selectedId ? genres.find((g) => g.id === selectedId) ?? null : null;

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => setSelectedId(null), []);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="border-b border-border px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <Zap className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">
            Electronic Music <span className="text-primary">Encyclopedia</span>
          </h1>
        </div>
        <p className="text-xs text-muted-foreground font-mono hidden sm:block">
          1940s → Present · {genres.length} genres · Click a node to explore
        </p>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        <GenreTree selectedId={selectedId} onSelect={handleSelect} />
        <GenreInfoSidebar genre={selectedGenre} onClose={handleClose} onSelectGenre={handleSelect} />
      </div>
    </div>
  );
};

export default Index;
