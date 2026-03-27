import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { genres, decades, Genre } from "@/data/genreData";
import { GenreNode } from "./GenreNode";

interface GenreTreeProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  searchQuery: string;
}

// Positions for each genre within its decade column
function useLayout() {
  return useMemo(() => {
    const decadeX: Record<string, number> = {};
    decades.forEach((d, i) => {
      decadeX[d] = i * 240 + 80;
    });

    // Group genres by decade
    const byDecade: Record<string, Genre[]> = {};
    decades.forEach((d) => (byDecade[d] = []));
    genres.forEach((g) => {
      if (byDecade[g.decade]) byDecade[g.decade].push(g);
    });

    // Assign positions
    const positions: Record<string, { x: number; y: number }> = {};
    Object.entries(byDecade).forEach(([decade, genreList]) => {
      const baseX = decadeX[decade];
      genreList.forEach((g, i) => {
        positions[g.id] = {
          x: baseX,
          y: 80 + i * 70,
        };
      });
    });

    const maxY = Math.max(...Object.values(positions).map((p) => p.y)) + 100;
    const maxX = (decades.length) * 240 + 160;

    return { positions, decadeX, maxX, maxY };
  }, []);
}

export function GenreTree({ selectedId, onSelect, searchQuery }: GenreTreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { positions, decadeX, maxX, maxY } = useLayout();

  const filteredGenreIds = useMemo(() => {
    if (!searchQuery.trim()) return null; // null means show all
    const q = searchQuery.toLowerCase();
    return new Set(genres.filter(g => g.name.toLowerCase().includes(q)).map(g => g.id));
  }, [searchQuery]);

  // Scroll selected node into view
  useEffect(() => {
    if (selectedId && containerRef.current) {
      const pos = positions[selectedId];
      if (pos) {
        containerRef.current.scrollTo({
          left: pos.x - containerRef.current.clientWidth / 2 + 70,
          top: pos.y - containerRef.current.clientHeight / 2 + 25,
          behavior: "smooth",
        });
      }
    }
  }, [selectedId, positions]);

  // SVG lines connecting parent -> child
  const connections = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [];
    const colorHsl: Record<string, string> = {
      cyan: "hsl(187,100%,50%)",
      magenta: "hsl(300,80%,60%)",
      green: "hsl(140,70%,50%)",
      orange: "hsl(30,100%,55%)",
      purple: "hsl(270,80%,65%)",
      yellow: "hsl(50,100%,55%)",
    };
    genres.forEach((g) => {
      const to = positions[g.id];
      if (!to) return;
      g.parents.forEach((pid) => {
        const from = positions[pid];
        if (!from) return;
        const parent = genres.find((x) => x.id === pid);
        lines.push({
          x1: from.x + 70,
          y1: from.y + 22,
          x2: to.x + 10,
          y2: to.y + 22,
          color: colorHsl[parent?.color || g.color],
        });
      });
    });
    return lines;
  }, [positions]);

  return (
    <div ref={containerRef} className="flex-1 overflow-auto scrollbar-thin relative">
      <div style={{ width: maxX, height: maxY, position: "relative" }}>
        {/* SVG connections layer */}
        <svg
          width={maxX}
          height={maxY}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {connections.map((c, i) => (
            <line
              key={i}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              stroke={c.color}
              strokeWidth={1.5}
              strokeOpacity={selectedId ? 0.15 : 0.3}
              strokeDasharray="4 4"
            />
          ))}
          {/* Highlight connections for selected genre */}
          {selectedId &&
            connections
              .filter((c) => {
                const selected = genres.find((g) => g.id === selectedId);
                if (!selected) return false;
                // Check if this connection involves the selected genre
                const selPos = positions[selectedId];
                return (
                  (Math.abs(c.x2 - selPos.x - 10) < 2 && Math.abs(c.y2 - selPos.y - 22) < 2) ||
                  (Math.abs(c.x1 - selPos.x - 70) < 2 && Math.abs(c.y1 - selPos.y - 22) < 2)
                );
              })
              .map((c, i) => (
                <line
                  key={`hl-${i}`}
                  x1={c.x1}
                  y1={c.y1}
                  x2={c.x2}
                  y2={c.y2}
                  stroke={c.color}
                  strokeWidth={2.5}
                  strokeOpacity={0.8}
                />
              ))}
        </svg>

        {/* Decade labels */}
        {decades.map((d) => (
          <div
            key={d}
            className="absolute text-xs font-mono text-muted-foreground/50 uppercase tracking-widest"
            style={{ left: decadeX[d], top: 20 }}
          >
            {d}
          </div>
        ))}

        {/* Decade separator lines */}
        {decades.map((d, i) => (
          <div
            key={`sep-${d}`}
            className="absolute top-0 bottom-0 border-l border-border/30"
            style={{ left: decadeX[d] - 20, height: maxY }}
          />
        ))}

        {/* Genre nodes */}
        {genres.map((g) => {
          const pos = positions[g.id];
          if (!pos) return null;
          const isHidden = filteredGenreIds !== null && !filteredGenreIds.has(g.id);
          return (
            <div
              key={g.id}
              className={`absolute transition-opacity duration-300 ${isHidden ? 'opacity-10 pointer-events-none' : 'opacity-100'}`}
              style={{ left: pos.x, top: pos.y, zIndex: 1 }}
            >
              <GenreNode
                genre={g}
                isSelected={selectedId === g.id}
                onClick={() => onSelect(g.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
