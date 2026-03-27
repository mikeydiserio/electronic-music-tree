import { useState } from "react";
import { Genre, genres } from "@/data/genreData";
import { X, Music, Users, Disc3, ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const colorMap: Record<string, string> = {
  cyan: "text-neon-cyan",
  magenta: "text-neon-magenta",
  green: "text-neon-green",
  orange: "text-neon-orange",
  purple: "text-neon-purple",
  yellow: "text-neon-yellow",
};

const borderMap: Record<string, string> = {
  cyan: "border-neon-cyan/30",
  magenta: "border-neon-magenta/30",
  green: "border-neon-green/30",
  orange: "border-neon-orange/30",
  purple: "border-neon-purple/30",
  yellow: "border-neon-yellow/30",
};

const bgMap: Record<string, string> = {
  cyan: "bg-neon-cyan/5",
  magenta: "bg-neon-magenta/5",
  green: "bg-neon-green/5",
  orange: "bg-neon-orange/5",
  purple: "bg-neon-purple/5",
  yellow: "bg-neon-yellow/5",
};

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function getWikiUrl(name: string): string {
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(name.replace(/ /g, "_"))}`;
}

interface GenreInfoSidebarProps {
  genre: Genre | null;
  onClose: () => void;
  onSelectGenre: (id: string) => void;
}

export function GenreInfoSidebar({ genre, onClose, onSelectGenre }: GenreInfoSidebarProps) {
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);

  if (!genre) return null;

  const textColor = colorMap[genre.color];
  const borderColor = borderMap[genre.color];
  const bgColor = bgMap[genre.color];
  const parentGenres = genres.filter((g) => genre.parents.includes(g.id));
  const childGenres = genres.filter((g) => g.parents.includes(genre.id));

  const toggleTrack = (key: string) => {
    setExpandedTrack((prev) => (prev === key ? null : key));
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 sm:hidden"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] sm:relative sm:inset-auto sm:z-auto sm:max-h-none w-full sm:w-[380px] sm:min-w-[380px] border-t sm:border-t-0 sm:border-l border-border bg-card flex flex-col overflow-hidden sm:h-full animate-in slide-in-from-bottom sm:slide-in-from-right-5 duration-300 rounded-t-2xl sm:rounded-none">
      {/* Mobile drag handle */}
      <div className="flex justify-center py-2 sm:hidden">
        <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
      </div>
      {/* Header */}
      <div className={`px-4 sm:p-5 pb-4 sm:pb-5 border-b ${borderColor} ${bgColor}`}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className={`text-xl font-bold ${textColor}`}>{genre.name}</h2>
            <p className="text-sm text-muted-foreground font-mono mt-1">Est. {genre.year}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ScrollArea className="flex-1 overflow-auto">
        <div className="p-5 space-y-6">
          {/* Description */}
          <div>
            <p className="text-sm text-foreground/80 leading-relaxed">{genre.description}</p>
          </div>

          {/* Characteristics */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Characteristics</h3>
            <div className="flex flex-wrap gap-1.5">
              {genre.characteristics.map((c) => (
                <span key={c} className={`text-xs px-2 py-0.5 rounded-full border ${borderColor} ${bgColor} ${textColor}`}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Key Artists */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Key Artists
            </h3>
            <div className="space-y-1.5">
              {genre.artists.map((a) => (
                <div key={a.name} className="flex items-baseline gap-2">
                  <a
                    href={a.wikiUrl || getWikiUrl(a.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium ${textColor} underline hover:opacity-80 transition-opacity`}
                  >
                    {a.name}
                  </a>
                  {a.note && <span className="text-xs text-muted-foreground">— {a.note}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Essential Tracks */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
              <Disc3 className="w-3.5 h-3.5" /> Essential Tracks
            </h3>
            <div className="space-y-2">
              {genre.tracks.map((t) => {
                const trackKey = `${t.artist}-${t.title}`;
                const isExpanded = expandedTrack === trackKey;
                const videoId = t.youtubeUrl ? getYouTubeId(t.youtubeUrl) : null;

                return (
                  <div key={trackKey} className={`rounded-md border ${borderColor} ${bgColor} overflow-hidden`}>
                    <button
                      onClick={() => videoId && toggleTrack(trackKey)}
                      className={`w-full p-2.5 flex items-center justify-between gap-2 text-left ${videoId ? "cursor-pointer hover:bg-muted/30" : "cursor-default"} transition-colors`}
                    >
                      <div>
                        <div className={`text-sm font-medium ${textColor}`}>{t.title}</div>
                        <div className="text-xs text-muted-foreground">{t.artist} · {t.year}</div>
                      </div>
                      {videoId && (
                        <ChevronDown className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                      )}
                    </button>
                    {isExpanded && videoId && (
                      <div className="px-2.5 pb-2.5">
                        <div className="relative w-full rounded overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                            title={`${t.title} - ${t.artist}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lineage */}
          {(parentGenres.length > 0 || childGenres.length > 0) && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" /> Lineage
              </h3>
              {parentGenres.length > 0 && (
                <div className="mb-2">
                  <span className="text-xs text-muted-foreground">Roots in: </span>
                  {parentGenres.map((p, i) => (
                    <span key={p.id}>
                      <button
                        onClick={() => onSelectGenre(p.id)}
                        className={`text-xs font-medium ${colorMap[p.color]} hover:underline`}
                      >
                        {p.name}
                      </button>
                      {i < parentGenres.length - 1 && <span className="text-muted-foreground">, </span>}
                    </span>
                  ))}
                </div>
              )}
              {childGenres.length > 0 && (
                <div>
                  <span className="text-xs text-muted-foreground">Led to: </span>
                  {childGenres.map((c, i) => (
                    <span key={c.id}>
                      <button
                        onClick={() => onSelectGenre(c.id)}
                        className={`text-xs font-medium ${colorMap[c.color]} hover:underline`}
                      >
                        {c.name}
                      </button>
                      {i < childGenres.length - 1 && <span className="text-muted-foreground">, </span>}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
    </>
  );
}
