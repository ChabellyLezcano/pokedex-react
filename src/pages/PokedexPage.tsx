import { useEffect, useMemo, useState } from "react";
import { getAllPokemonCards } from "../api/pokeApi";
import PokemonCard from "../components/PokemonCard";
import SkeletonCard from "../components/SkeletonCard";
import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";
import type { PokemonCardData, PokemonType } from "../types";

export default function PokedexPage() {
  const [items, setItems] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<PokemonType | null>(null);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      const all = await getAllPokemonCards();
      setItems(all);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    let res = items;

    if (query.trim()) {
      const q = query.toLowerCase();
      res = res.filter((p) => p.name.includes(q) || p.id.toString() === q);
    }

    if (typeFilter) {
      res = res.filter((p) => p.types.includes(typeFilter));
    }

    return res;
  }, [items, query, typeFilter]);

  return (
    <section className="grid gap-4">
      <div className="glass p-3 sm:p-4 grid gap-3">
        <SearchBar query={query} onChange={setQuery} />

        <TypeFilter
          value={typeFilter}
          onToggle={(t) => setTypeFilter(typeFilter === t ? null : t)}
          onClear={() => setTypeFilter(null)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((p) => (
          <PokemonCard key={p.id} p={p} />
        ))}

        {loading && Array.from({ length: 16 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>

      {!loading && !filtered.length && (
        <p className="text-white/70 text-center">No results with that filter 🥲</p>
      )}
    </section>
  );
}
