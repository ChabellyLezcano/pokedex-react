import type { PokemonType } from "./typeColors";

export interface PokemonPageItem {
  name: string;
  url: string;
}

export interface PokemonPageResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonPageItem[];
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonTypeSlot {
  slot: number;
  type: { name: PokemonType };
}

export interface PokemonAbilitySlot {
  is_hidden: boolean;
  ability: { name: string };
}

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    "official-artwork"?: { front_default: string | null };
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonTypeSlot[];
  abilities: PokemonAbilitySlot[];
}

export interface PokemonCardData {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
}
