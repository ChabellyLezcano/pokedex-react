import { Link } from "react-router-dom";
import type { PokemonCardData } from "../types/pokeApiTypes";

const TYPE_COLORS: Record<string, string> = {
  grass: "from-lime/30 to-emerald-500/20",
  fire: "from-orange-400/30 to-red-500/20",
  water: "from-sky-400/30 to-blue-600/20",
  electric: "from-yellow-300/30 to-amber-500/20",
  psychic: "from-fuchsia-400/30 to-purple-600/20",
  normal: "from-white/10 to-white/5",
  fighting: "from-red-500/30 to-rose-700/20",
  poison: "from-purple-400/30 to-fuchsia-700/20",
  bug: "from-lime-400/30 to-green-700/20",
  ground: "from-amber-400/30 to-yellow-700/20",
  rock: "from-stone-300/20 to-stone-700/20",
  ghost: "from-indigo-400/30 to-violet-700/20",
  ice: "from-cyan-200/30 to-sky-600/20",
  dragon: "from-indigo-500/30 to-slate-700/30",
  dark: "from-slate-400/30 to-black/30",
  steel: "from-slate-200/30 to-slate-500/30",
  fairy: "from-pink-300/30 to-rose-500/30"
};

export default function PokemonCard({ p }: { p: PokemonCardData }) {
  const grad = TYPE_COLORS[p.types[0]] ?? "from-white/10 to-white/5";

  return (
    <Link
      to={`/pokemon/${p.id}`}
      className={`group rounded-2xl bg-linear-to-br ${grad} border border-white/10 overflow-hidden
                  hover:-translate-y-1 hover:shadow-glow transition`}
    >
      <div className="relative p-3">
        <span className="pill text-xs bg-black/40">#{p.id}</span>
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-36 object-contain drop-shadow-xl group-hover:scale-105 transition"
          loading="lazy"
        />
      </div>

      <div className="px-3 pb-3">
        <h3 className="capitalize font-bold text-base">{p.name}</h3>
        <div className="flex flex-wrap gap-1 mt-1">
          {p.types.map((t) => (
            <span key={t} className="pill text-xs capitalize">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
