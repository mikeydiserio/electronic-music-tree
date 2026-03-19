import { Genre } from "@/data/genreData";

const colorClasses: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  cyan: { bg: "bg-neon-cyan/10", border: "border-neon-cyan/60", glow: "shadow-[0_0_12px_hsl(187,100%,50%,0.4)]", text: "text-neon-cyan" },
  magenta: { bg: "bg-neon-magenta/10", border: "border-neon-magenta/60", glow: "shadow-[0_0_12px_hsl(300,80%,60%,0.4)]", text: "text-neon-magenta" },
  green: { bg: "bg-neon-green/10", border: "border-neon-green/60", glow: "shadow-[0_0_12px_hsl(140,70%,50%,0.4)]", text: "text-neon-green" },
  orange: { bg: "bg-neon-orange/10", border: "border-neon-orange/60", glow: "shadow-[0_0_12px_hsl(30,100%,55%,0.4)]", text: "text-neon-orange" },
  purple: { bg: "bg-neon-purple/10", border: "border-neon-purple/60", glow: "shadow-[0_0_12px_hsl(270,80%,65%,0.4)]", text: "text-neon-purple" },
  yellow: { bg: "bg-neon-yellow/10", border: "border-neon-yellow/60", glow: "shadow-[0_0_12px_hsl(50,100%,55%,0.4)]", text: "text-neon-yellow" },
};

interface GenreNodeProps {
  genre: Genre;
  isSelected: boolean;
  onClick: () => void;
}

export function GenreNode({ genre, isSelected, onClick }: GenreNodeProps) {
  const colors = colorClasses[genre.color];

  return (
    <button
      onClick={onClick}
      className={`
        relative px-3 py-2 rounded-lg border transition-all duration-300 cursor-pointer
        text-left min-w-[120px] max-w-[160px]
        ${colors.bg} ${colors.border}
        ${isSelected ? `${colors.glow} scale-110 border-2` : "hover:scale-105 border"}
      `}
    >
      <div className={`text-xs font-semibold leading-tight ${colors.text}`}>
        {genre.name}
      </div>
      <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">
        {genre.year}
      </div>
    </button>
  );
}
