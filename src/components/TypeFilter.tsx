import { TYPE_COLORS, TYPES, isLightType, type PokemonType } from "../types";

type Props = {
  value: PokemonType | null;
  onToggle: (type: PokemonType) => void;
  onClear: () => void;
};

export default function TypeFilter({ value, onToggle, onClear }: Props) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white/90">Filter by type</p>

        {value && (
          <button
            onClick={onClear}
            className="pill text-xs bg-white/10 hover:bg-white/15 transition"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => {
          const active = value === t;
          const { c1, c2 } = TYPE_COLORS[t];
          const bg = `linear-gradient(135deg, rgb(${c1} / .95), rgb(${c2} / .95))`;

          return (
            <button
              key={t}
              onClick={() => onToggle(t)}
              className={[
                "px-3 py-1 rounded-full text-xs font-extrabold capitalize",
                "transition-all duration-200 select-none cursor-pointer",
                active
                  ? "ring-2 ring-white/90 scale-[1.04] shadow-lg shadow-black/30"
                  : "opacity-85 hover:opacity-100 hover:scale-[1.02]",
                isLightType(t) ? "text-black/90" : "text-white"
              ].join(" ")}
              style={{ background: bg }}
              aria-pressed={active}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
