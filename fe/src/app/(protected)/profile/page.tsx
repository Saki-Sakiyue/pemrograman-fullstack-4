'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useProfile, useUpdateProfile } from '@/hooks/queries/profile.queries';
import { useHydration } from '@/hooks/common/useHydration';
import { Camera, Mail, Save, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ProfilePage() {
  const isHydrated = useHydration();
  const { data: profile, isLoading } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Isi form saat data profile sudah loaded
  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setEmail(profile.email);
    }
  }, [profile]);

  if (!isHydrated) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      username,
      email,
      ...(avatarFile && { avatar: avatarFile }),
    });
  };

  const avatarSrc =
    avatarPreview ||
    (profile?.avatar_url
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${profile.avatar_url}`
      : undefined);

  const initials = profile?.username
    ? profile.username.slice(0, 2).toUpperCase()
    : 'US';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profil Saya</h1>
        <p className="text-slate-500">
          Kelola informasi akun dan foto profilmu.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Card Kiri: Avatar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Foto Profil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {isLoading ? (
              <Skeleton className="h-24 w-24 rounded-full" />
            ) : (
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarSrc} alt={profile?.username} />
                  <AvatarFallback className="bg-slate-200 text-lg font-semibold text-slate-600">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {/* Tombol ganti foto */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white shadow hover:bg-slate-700"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            )}

            {isLoading ? (
              <>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </>
            ) : (
              <>
                <p className="font-semibold text-slate-900">
                  {profile?.username}
                </p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 capitalize">
                  {profile?.role}
                </span>
              </>
            )}

            <p className="text-center text-xs text-slate-400">
              Klik ikon kamera untuk mengganti foto.
              <br />
              Format: JPG, PNG. Maks 2MB.
            </p>
          </CardContent>
        </Card>

        {/* Card Kanan: Form Edit */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Informasi Akun</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-28" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <User className="h-4 w-4" />
                    Username
                  </label>
                  <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username kamu"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@kamu.com"
                    required
                  />
                </div>

                {/* Role (read-only) */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Role
                  </label>
                  <Input
                    value={profile?.role || ''}
                    disabled
                    className="cursor-not-allowed bg-slate-50 text-slate-400"
                  />
                  <p className="text-xs text-slate-400">
                    Role tidak dapat diubah sendiri.
                  </p>
                </div>

                <Button type="submit" disabled={isPending} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
