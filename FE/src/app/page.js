import { ArrowRight, Layout, ShieldCheck, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="flex flex-col items-center space-y-6 pt-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase">
          <Zap size={14} className="fill-current" />
          Community Driven Platform
        </div>

        <h1 className="max-w-4xl text-5xl font-black tracking-tighter md:text-7xl">
          Repositori Aset UI/UX <br />
          <span className="text-gray-400">Untuk Developer Modern.</span>
        </h1>

        <p className="max-w-2xl text-lg text-gray-500">
          Temukan dan bagikan template kode, desain komponen, hingga aset desain
          gratis untuk mempercepat workflow development tim kamu.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="/explore"
            className="flex items-center gap-2 rounded-xl bg-black px-8 py-4 font-bold text-white shadow-lg transition hover:bg-gray-800"
          >
            Explore Assets <ArrowRight size={20} />
          </Link>
          <Link
            href="/register"
            className="rounded-xl border-2 border-gray-200 bg-white px-8 py-4 font-bold transition hover:bg-gray-50"
          >
            Join Community
          </Link>
        </div>
      </section>

      {/* --- STATS / FEATURES --- */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <FeatureCard
          icon={<Layout className="text-blue-500" />}
          title="Curated Templates"
          desc="Template pilihan yang sudah dikurasi oleh komunitas untuk kualitas terbaik."
        />
        <FeatureCard
          icon={<Users className="text-purple-500" />}
          title="Active Community"
          desc="Berbagi dan kembangkan aset bersama ribuan developer lainnya."
        />
        <FeatureCard
          icon={<ShieldCheck className="text-green-500" />}
          title="Verified Source"
          desc="Setiap aset dipastikan memiliki link source dan demo yang valid."
        />
      </section>

      {/* --- PLACEHOLDER CONTENT (FEED) --- */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b pb-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Terpopuler Minggu Ini
          </h2>
          <Link
            href="/explore"
            className="text-sm font-bold text-blue-600 hover:underline"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card Mockup */}
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex h-48 items-center justify-center border-b bg-gray-100 transition group-hover:bg-gray-200">
                <Layout size={40} className="text-gray-300" />
              </div>
              <div className="space-y-2 p-5">
                <div className="flex h-4 w-20 items-center justify-center rounded bg-blue-100 text-[10px] font-bold text-blue-700 uppercase">
                  Next.js
                </div>
                <h3 className="text-lg font-bold">
                  Modern Dashboard Template v.{i}
                </h3>
                <p className="line-clamp-2 text-sm text-gray-500">
                  Template dashboard admin responsif dengan Tailwind 4 dan React
                  19.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Sub-component kecil untuk kerapian
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="space-y-4 rounded-3xl border p-8 transition-colors duration-500 hover:border-black">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
    </div>
  );
}
