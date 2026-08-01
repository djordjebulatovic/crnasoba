import { useEffect, useRef, useState } from "react";
import { Radio, Volume2, VolumeX } from "lucide-react";

// Static "now playing" — radio is non-interactive for visitors
const STATION_NAME = "CRNA SOBA RADIO";
const NOW_PLAYING = "Live Mix — Mrak Sessions";

const RadioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true); // start muted (autoplay policy)
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.6;
    // Try to autoplay (will succeed muted)
    a.play().catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 900);
    return () => clearInterval(t);
  }, []);

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
    if (!a.muted) a.play().catch(() => {});
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-3 border border-border bg-background/85 backdrop-blur-sm px-4 py-3 shadow-lg max-w-[calc(100vw-2rem)]">
      {/* Hidden audio element — replace src with real stream URL */}
      <audio ref={audioRef} loop muted preload="none">
        <source src="" type="audio/mpeg" />
      </audio>

      <div className="relative flex items-center justify-center">
        <Radio className="w-5 h-5 text-accent" />
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent"
          style={{
            opacity: pulse ? 1 : 0.3,
            transition: "opacity 0.6s ease-in-out",
          }}
        />
      </div>

      <div className="flex flex-col leading-tight min-w-0">
        <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-body">
          {STATION_NAME}
        </span>
        <span className="text-xs text-foreground font-body truncate max-w-[180px]">
          {NOW_PLAYING}
        </span>
      </div>

      <button
        onClick={toggleMute}
        aria-label={muted ? "Uključi zvuk" : "Isključi zvuk"}
        className="ml-1 p-2 border border-border hover:border-accent hover:text-accent transition-colors text-foreground"
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default RadioPlayer;
