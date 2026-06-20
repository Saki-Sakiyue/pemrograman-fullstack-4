'use client';

import { useProfile, useUpdateProfile } from '@/hooks/queries/profile.queries';
import { UpdateProfilePayload } from '@/types/profile.types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useRef } from 'react';
import { Camera, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { getFullImageUrl } from '@/lib/image';

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setUsername(profile?.username || '');
    setPassword('');
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUsername('');
    setPassword('');
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: UpdateProfilePayload = {};
    if (username && username !== profile?.username) {
      payload.username = username;
    }
    if (password) {
      payload.password = password;
    }
    if (avatarFile) {
      payload.avatar = avatarFile;
    }

    if (Object.keys(payload).length === 0) {
      handleCancel();
      return;
    }

    updateProfile.mutate(payload, {
      onSuccess: () => {
        handleCancel();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Profil tidak ditemukan</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const avatarUrl = avatarPreview || getFullImageUrl(profile.avatar_url);
  const initials = profile.username.substring(0, 2).toUpperCase();

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profil Pengguna</CardTitle>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            // View Mode
            <div className="space-y-6">
              {/* Avatar & Basic Info */}
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={avatarUrl || undefined}
                    alt={profile.username}
                  />
                  <AvatarFallback className="text-2xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{profile.username}</h2>
                  <p className="text-muted-foreground">{profile.email}</p>
                  <Badge className="mt-2">{profile.role}</Badge>
                </div>
              </div>

              {/* Details */}
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Username
                  </label>
                  <p className="text-lg">{profile.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <p className="text-lg">{profile.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Role
                  </label>
                  <p className="text-lg capitalize">{profile.role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Tanggal Bergabung
                  </label>
                  <p className="text-lg">
                    {format(new Date(profile.created_at), 'dd MMMM yyyy', {
                      locale: idLocale,
                    })}
                  </p>
                </div>
              </div>

              <Button onClick={handleEdit} className="w-full">
                Edit Profil
              </Button>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={avatarUrl || undefined}
                    alt={profile.username}
                  />
                  <AvatarFallback className="text-2xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Ubah Avatar
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username baru"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Password Baru</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Kosongkan jika tidak ingin mengubah"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {profile.email} (tidak dapat diubah)
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={updateProfile.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {updateProfile.isPending ? 'Menyimpan...' : 'Simpan'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={updateProfile.isPending}
                >
                  <X className="h-4 w-4 mr-2" />
                  Batal
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
