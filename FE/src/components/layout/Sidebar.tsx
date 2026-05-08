import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col bg-slate-900 text-white md:flex">
      <div className="flex h-16 items-center justify-center border-b border-slate-700 text-xl font-bold">
        Templas V2
      </div>
      <nav className="flex-1 space-y-2 p-4">
        <Link
          href="/dashboard"
          className="block rounded bg-slate-800 p-3 transition hover:bg-slate-700"
        >
          Dashboard
        </Link>
        <Link
          href="/praktikum"
          className="block rounded p-3 transition hover:bg-slate-700"
        >
          Praktikum
        </Link>
        <Link
          href="/tugas"
          className="block rounded p-3 transition hover:bg-slate-700"
        >
          Tugas
        </Link>
      </nav>
    </aside>
  );
}
