type Props = {
  query: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ query, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <input
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or #id..."
        className="
          w-full px-4 py-2 rounded-xl bg-white/10 text-white
          placeholder:text-white/50 outline-none
          focus:ring-2 focus:ring-white/20
        "
      />
      {query && (
        <button
          onClick={() => onChange("")}
          className="pill text-xs bg-white/10 hover:bg-white/15 transition"
        >
          Clear
        </button>
      )}
    </div>
  );
}
