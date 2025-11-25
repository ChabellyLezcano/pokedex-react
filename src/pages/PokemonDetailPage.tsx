import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonDetail } from "../api/pokeApi";

// desde tu barrel de types
import {
  type PokemonDetail,
  type PokemonStat,
  type PokemonTypeSlot,
  type PokemonAbilitySlot
} from "../types/pokeApiTypes";

import { getTypeColors, type PokemonType } from "../types/index";

export default function PokemonDetailPage() {
  const { id } = useParams();
  const [p, setP] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      const data = await getPokemonDetail(id!);
      setP(data);
      setLoading(false);
    })();
  }, [id]);

  // Total energy (0..1)
  const energy = useMemo(() => {
    const stats = p?.stats ?? [];
    const sum = stats.reduce((acc: number, s: PokemonStat) => acc + s.base_stat, 0);
    return Math.min(1, sum / 600);
  }, [p]);

  // Primary type (literal union)
  const primaryType: PokemonType = p?.types?.[0]?.type?.name ?? "normal";

  // Aura colors from typed helper
  const auraColors = getTypeColors(primaryType);

  const auraVarsStyle: React.CSSProperties & Record<"--c1" | "--c2" | "--c3", string> = {
    "--c1": auraColors.c1,
    "--c2": auraColors.c2,
    "--c3": auraColors.c1 // derivado
  };

  function statToHue(value: number) {
    const pct = Math.min(1, value / 255);
    return pct * 120;
  }

  function statBarStyle(value: number) {
    const pct = Math.min(100, (value / 255) * 100);
    const hue = statToHue(value);
    const color = `hsl(${hue} 90% 55%)`;

    return {
      width: `${pct}%`,
      background: color,
      boxShadow: `0 0 18px ${color}66`
    } as React.CSSProperties;
  }

  const aura = useMemo(() => {
    const baseOpacity = 0.25 + energy * 0.6;
    const baseScale = 0.9 + energy * 0.7;

    return {
      opacity: baseOpacity,
      transform: `scale(${baseScale})`,
      spin: `${30 - energy * 10}s`,
      pulse: `${5.8 - energy * 1.8}s`,
      flicker: `${3.8 - energy * 1.0}s`,
      waves: `${8.5 - energy * 2.0}s`
    };
  }, [energy]);

  if (loading || !p) {
    return (
      <div className="glass p-5 grid gap-3">
        <div className="h-56 bg-white/10 animate-pulse rounded-2xl" />
        <div className="h-5 w-1/2 bg-white/10 animate-pulse rounded" />
      </div>
    );
  }

  const image =
    p.sprites?.other?.["official-artwork"]?.front_default ||
    p.sprites?.front_default ||
    "";

  return (
    <section className="grid gap-4">
      <Link to="/" className="pill w-fit">
        ← Back
      </Link>

      {/* HERO */}
      <div className="glass overflow-hidden">
        <div className="relative p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold capitalize">{p.name}</h1>
            <span className="pill text-sm">#{p.id}</span>
          </div>

          {/* IMAGE + AURA */}
          <div
            className="
    relative mt-3 mb-4 grid place-items-center isolate
    overflow-visible
    min-h-82 sm:mism:min-h-100
  "
            style={auraVarsStyle}
          >
            <div className="absolute inset-0 grid place-items-center pointer-events-none z-0">
              <div
                className="aura-rays w-72 h-72 sm:w-80 sm:h-80 rounded-full blur-xl"
                style={{
                  opacity: aura.opacity,
                  transform: aura.transform,
                  animationDuration: aura.spin
                }}
              />

              <div
                className="aura-core absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full blur-2xl"
                style={{
                  opacity: aura.opacity * 0.9,
                  transform: aura.transform,
                  animationDuration: aura.pulse
                }}
              />

              <div
                className="aura-waves absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full"
                style={{
                  opacity: aura.opacity * 0.65,
                  transform: aura.transform,
                  animationDuration: aura.waves
                }}
              />

              <div
                className="aura-flicker absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full blur-2xl"
                style={{
                  opacity: aura.opacity * 0.7,
                  transform: aura.transform,
                  animationDuration: aura.flicker
                }}
              />
            </div>

            <img
              src={image}
              alt={p.name}
              className="relative z-10 w-full h-56 sm:h-64 object-contain drop-shadow-2xl animate-floaty"
            />
          </div>

          {/* Types */}
          <div className="flex gap-2 flex-wrap">
            {p.types.map((t: PokemonTypeSlot) => (
              <span key={t.type.name} className="pill capitalize">
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="glass p-4 sm:p-6 grid gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Stats</h2>
          <span className="pill text-xs">Energy: {Math.round(energy * 100)}%</span>
        </div>

        <div className="grid gap-3">
          {p.stats.map((s: PokemonStat) => (
            <div key={s.stat.name} className="grid gap-1">
              <div className="flex justify-between text-sm">
                <span className="capitalize text-white/80">{s.stat.name}</span>
                <span className="font-semibold">{s.base_stat}</span>
              </div>

              <div className="h-3 rounded-full bg-white/10 overflow-hidden border border-white/10">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={statBarStyle(s.base_stat)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ABILITIES */}
      <div className="glass p-4 sm:p-6">
        <h2 className="font-bold text-lg mb-2">Abilities</h2>
        <div className="flex gap-2 flex-wrap">
          {p.abilities.map((a: PokemonAbilitySlot) => (
            <span key={a.ability.name} className="pill capitalize">
              {a.ability.name}
            </span>
          ))}
        </div>
      </div>

      {/* Aura CSS */}
      <style>{`
        @keyframes auraSpin { to { transform: rotate(360deg); } }

        @keyframes auraPulse {
          0%, 100% { transform: scale(0.95); filter: brightness(0.9); }
          50%      { transform: scale(1.08); filter: brightness(1.25); }
        }

        @keyframes auraWaves {
          0%   { transform: scale(0.85); opacity: 0; }
          25%  { opacity: 0.35; }
          100% { transform: scale(1.35); opacity: 0; }
        }

        @keyframes auraFlicker {
          0%,100% { filter: brightness(0.9); opacity: 0.12; }
          40%     { filter: brightness(1.35); opacity: 0.45; }
          60%     { filter: brightness(1.1); opacity: 0.22; }
          80%     { filter: brightness(1.55); opacity: 0.52; }
        }

        .aura-rays {
          background:
            conic-gradient(from 0deg,
              rgba(255,255,255,0) 0deg,
              rgb(var(--c1) / 0.18) 30deg,
              rgba(255,255,255,0) 70deg,
              rgb(var(--c2) / 0.22) 120deg,
              rgba(255,255,255,0) 170deg,
              rgb(var(--c1) / 0.18) 220deg,
              rgba(255,255,255,0) 360deg
            );
          animation: auraSpin linear infinite;
          mix-blend-mode: screen;

          /* máscara para evitar manchas laterales */
          -webkit-mask-image: radial-gradient(circle, black 0%, black 55%, transparent 75%);
          mask-image: radial-gradient(circle, black 0%, black 55%, transparent 75%);
        }

        .aura-core {
          background:
            radial-gradient(circle,
              rgb(var(--c1) / 0.60) 0%,
              rgb(var(--c2) / 0.28) 45%,
              rgba(0,0,0,0) 70%
            );
          animation: auraPulse ease-in-out infinite;
          mix-blend-mode: screen;
        }

        .aura-waves {
          background:
            radial-gradient(circle,
              rgb(var(--c1) / 0.14) 0%,
              rgb(var(--c2) / 0.10) 40%,
              rgba(0,0,0,0) 70%
            );
          filter: blur(28px);
          animation: auraWaves ease-out infinite;
          mix-blend-mode: screen;

          /* máscara para difuminar bordes */
          -webkit-mask-image: radial-gradient(circle, black 0%, black 60%, transparent 82%);
          mask-image: radial-gradient(circle, black 0%, black 60%, transparent 82%);
        }

        .aura-flicker {
          background:
            radial-gradient(circle,
              rgb(var(--c2) / 0.35) 0%,
              rgb(var(--c1) / 0.18) 35%,
              rgba(0,0,0,0) 70%
            );
          animation: auraFlicker ease-in-out infinite;
          mix-blend-mode: screen;

          /* evita “burbujas” laterales */
          -webkit-mask-image: radial-gradient(circle, black 0%, black 60%, transparent 80%);
          mask-image: radial-gradient(circle, black 0%, black 60%, transparent 80%);
        }
      `}</style>
    </section>
  );
}
