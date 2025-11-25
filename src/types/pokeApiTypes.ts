export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export type TypeColors = { c1: string; c2: string };

export const TYPE_COLORS: Record<PokemonType, TypeColors> = {
  normal: { c1: "200 200 200", c2: "240 240 240" },
  fire: { c1: "255 70 70", c2: "255 170 60" },
  water: { c1: "70 150 255", c2: "80 220 255" },
  grass: { c1: "40 180 95", c2: "120 225 110" },
  electric: { c1: "255 230 70", c2: "255 170 0" },
  ice: { c1: "160 240 255", c2: "110 190 255" },
  fighting: { c1: "170 95 55", c2: "240 170 120" },
  poison: { c1: "170 90 255", c2: "90 220 180" },
  ground: { c1: "200 160 90", c2: "250 210 140" },
  flying: { c1: "150 200 255", c2: "220 230 255" },
  psychic: { c1: "255 90 200", c2: "180 100 255" },
  bug: { c1: "120 190 60", c2: "175 220 95" },
  rock: { c1: "170 140 100", c2: "220 190 140" },
  ghost: { c1: "150 90 255", c2: "110 120 220" },
  dragon: { c1: "120 80 255", c2: "80 220 255" },
  dark: { c1: "120 120 140", c2: "60 60 80" },
  steel: { c1: "170 190 210", c2: "120 140 170" },
  fairy: { c1: "255 170 220", c2: "255 220 250" }
};

export function getTypeColors(type: PokemonType): TypeColors {
  return TYPE_COLORS[type] ?? TYPE_COLORS.normal;
}

// ---------- Page list ----------
export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonPageResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

// ---------- Detail ----------
export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonTypeSlot = {
  slot: number;
  type: {
    name: PokemonType;
    url: string;
  };
};

export type PokemonAbilitySlot = {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonSprites = {
  front_default?: string | null;
  other?: {
    "official-artwork"?: {
      front_default?: string | null;
    };
  };
};

export type PokemonDetail = {
  id: number;
  name: string;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonTypeSlot[];
  abilities: PokemonAbilitySlot[];
};

// ---------- Card data ----------
export type PokemonCardData = {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
};
