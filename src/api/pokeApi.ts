import axios from "axios";
import type { PokemonPageResponse, PokemonDetail, PokemonCardData } from "../types";

const BASE = "https://pokeapi.co/api/v2";

export async function getPokemonPage(limit = 1025, offset = 0) {
  const { data } = await axios.get<PokemonPageResponse>(`${BASE}/pokemon`, {
    params: { limit, offset }
  });
  return data;
}

export async function getPokemonDetail(nameOrId: string | number) {
  const { data } = await axios.get<PokemonDetail>(`${BASE}/pokemon/${nameOrId}`);
  return data;
}

// Carga todos para la pokedex grid
export async function getAllPokemonCards(): Promise<PokemonCardData[]> {
  const page = await getPokemonPage(1025, 0);

  const details = await Promise.all(page.results.map((p) => getPokemonDetail(p.name)));

  return details.map((d) => {
    const image =
      d.sprites.other?.["official-artwork"]?.front_default ||
      d.sprites.front_default ||
      "";

    return {
      id: d.id,
      name: d.name,
      image,
      types: d.types.map((t) => t.type.name)
    };
  });
}
