export default function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      <div className="h-36 bg-white/10 animate-pulse" />
      <div className="p-3 grid gap-2">
        <div className="h-4 w-3/4 bg-white/10 animate-pulse rounded" />
        <div className="h-3 w-1/3 bg-white/10 animate-pulse rounded" />
      </div>
    </div>
  );
}
