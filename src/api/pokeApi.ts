// src/api/pokeApi.ts
import axios from "axios";
import type { PokemonPageResponse, PokemonDetail, PokemonCardData } from "../types";

const BASE = "https://pokeapi.co/api/v2";

export async function getPokemonPage(
  limit = 1025,
  offset = 0
): Promise<PokemonPageResponse> {
  const { data } = await axios.get<PokemonPageResponse>(`${BASE}/pokemon`, {
    params: { limit, offset }
  });
  return data;
}

export async function getPokemonDetail(
  nameOrId: string | number
): Promise<PokemonDetail> {
  const { data } = await axios.get<PokemonDetail>(`${BASE}/pokemon/${nameOrId}`);
  return data;
}

// Carga todas las cards tipadas (sin any)
export async function getAllPokemonCards(): Promise<PokemonCardData[]> {
  const page = await getPokemonPage(1025, 0);

  const details = await Promise.all(page.results.map((r) => getPokemonDetail(r.name)));

  return details.map((d): PokemonCardData => {
    const image =
      d.sprites.other?.["official-artwork"]?.front_default ??
      d.sprites.front_default ??
      "";

    const types = d.types.map((t) => t.type.name);

    return {
      id: d.id,
      name: d.name,
      image,
      types
    };
  });
}
