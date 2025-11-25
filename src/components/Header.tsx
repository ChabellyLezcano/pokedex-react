import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-20 mb-4">
      <div className="glass px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-brand-500 to-aqua grid place-items-center shadow-soft">
            {/* Pokéball */}
            <div className="relative w-6 h-6 rounded-full bg-white overflow-hidden border-2 border-black/90 shadow-md">
              {/* top red half */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-red-500" />
              {/* middle black line */}
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-black/90 -translate-y-1/2" />
              {/* center button */}
              <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-white rounded-full border-2 border-black/90 -translate-x-1/2 -translate-y-1/2" />
              {/* tiny inner dot */}
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-black/80 rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <h1 className="text-lg font-extrabold tracking-tight">Pokédex</h1>
            <p className="text-xs text-white/60 -mt-1">Kanto → Galar</p>
          </div>
        </Link>

        <nav className="flex gap-2 text-sm font-semibold">
          <Link
            to="/"
            className={`px-3 py-2 rounded-xl transition ${
              pathname === "/" ? "bg-white/10" : "hover:bg-white/10"
            }`}
          >
            List
          </Link>
        </nav>
      </div>
    </header>
  );
}
