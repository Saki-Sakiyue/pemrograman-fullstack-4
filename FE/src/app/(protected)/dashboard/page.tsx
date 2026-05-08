'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHydration } from '@/hooks/useHydration';
import { useAuthStore } from '@/store/useAuthStore';
import { Bookmark, Download, Heart, Layout } from 'lucide-react';

export default function DashboardPage() {
  const isHydrated = useHydration();
  const user = useAuthStore(state => state.user);

  if (!isHydrated) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Halo, {user?.username || 'User'}! 👋
        </h1>
        <p className="text-slate-500">
          Berikut adalah ringkasan aset Templas kamu bulan ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Template
            </CardTitle>
            <Layout className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground text-xs">
              Aset yang kamu publikasikan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Download
            </CardTitle>
            <Download className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-muted-foreground text-xs">
              +12% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upvotes</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-muted-foreground text-xs">
              Orang menyukai karyamu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
            <Bookmark className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-muted-foreground text-xs">
              Disimpan untuk nanti
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder untuk Recent Activity atau Chart */}
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
        Grafik Statistik (Coming Soon)
      </div>
    </div>
  );
}
