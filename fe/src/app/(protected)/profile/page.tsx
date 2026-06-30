'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useHydration } from '@/hooks/common/useHydration';
import { useGetProfile, useUpdateProfile } from '@/hooks/queries/profile.queries';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Mail, User, Camera, X } from 'lucide-react';
import { getFullImageUrl } from '@/lib/image';
import { UpdateProfilePayload } from '@/services/profile.service';
import MyTemplatesSection from './my-templates';

// Validation Schema
const updateProfileSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username minimal 3 karakter')
      .max(30, 'Username maksimal 30 karakter')
      .optional()
      .or(z.literal('')),
    password: z
      .string()
      .min(6, 'Password minimal 6 karakter')
      .optional()
      .or(z.literal('')),
    passwordConfirm: z
      .string()
      .optional()
      .or(z.literal('')),
  })
  .refine(
    data => !data.password || data.password === data.passwordConfirm,
    {
      message: 'Password tidak cocok',
      path: ['passwordConfirm'],
    }
  );

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export default function ProfilePage() {
  const isHydrated = useHydration();
  const [isEditMode, setIsEditMode] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { data: profile, isLoading, error } = useGetProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const updateUser = useAuthStore(state => state.updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: profile?.username || '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleStartEdit = () => {
    setIsEditMode(true);
    reset({
      username: profile?.username || '',
      password: '',
      passwordConfirm: '',
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return;
      }

      setAvatarFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const onSubmit = (data: UpdateProfileFormData) => {
    const payload: UpdateProfilePayload = {};
    if (data.username && data.username !== profile?.username) {
      payload.username = data.username;
    }
    if (data.password) {
      payload.password = data.password;
    }
    if (avatarFile) {
      payload.avatar = avatarFile;
    }

    if (Object.keys(payload).length === 0) {
      return;
    }

    updateProfile(payload, {
      onSuccess: (response) => {
        // Update Zustand store with new user data
        if (response.data) {
          updateUser(response.data);
        }

        setIsEditMode(false);
        setAvatarFile(null);
        setAvatarPreview(null);
      },
    });
  };

  const handleCancel = () => {
    setIsEditMode(false);
    reset({
      username: profile?.username || '',
      password: '',
      passwordConfirm: '',
    });
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  if (!isHydrated) return null;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Profil Saya</h1>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Profil Saya</h1>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-700">Gagal memuat profil. Silakan coba lagi.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Profil Saya</h1>
        {!isEditMode && (
          <Button
            onClick={handleStartEdit}
            variant="outline"
            size="sm"
          >
            Edit Profil
          </Button>
        )}
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Akun</CardTitle>
        </CardHeader>
        <CardContent>
          {!isEditMode ? (
            // View Mode
            <div className="space-y-6">
              {/* Avatar & Basic Info */}
              <div className="flex items-center gap-4">
                {profile?.avatar_url && (
                  <Image
                    src={getFullImageUrl(profile.avatar_url)}
                    alt={profile.username}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {profile?.username}
                  </h2>
                  <p className="text-sm text-slate-500">{profile?.role}</p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Email */}
                <div className="flex items-start gap-3 rounded-lg border border-slate-200 p-4">
                  <Mail className="mt-1 h-5 w-5 text-slate-400" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-500">Email</p>
                    <p className="truncate text-sm font-medium text-slate-900">
                      {profile?.email}
                    </p>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-start gap-3 rounded-lg border border-slate-200 p-4">
                  <User className="mt-1 h-5 w-5 text-slate-400" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-500">Role</p>
                    <p className="text-sm font-medium text-slate-900">
                      {profile?.role === 'admin' ? 'Admin' : 'User'}
                    </p>
                  </div>
                </div>

                {/* Join Date */}
                <div className="flex items-start gap-3 rounded-lg border border-slate-200 p-4 md:col-span-2">
                  <Calendar className="mt-1 h-5 w-5 text-slate-400" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-slate-500">
                      Tanggal Bergabung
                    </p>
                    <p className="text-sm font-medium text-slate-900">
                      {profile?.created_at
                        ? formatDate(profile.created_at)
                        : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Avatar Upload Section */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Avatar
                </label>
                <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end">
                  {/* Avatar Preview */}
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 border-dashed border-slate-300 bg-slate-50">
                    {avatarPreview || profile?.avatar_url ? (
                      <Image
                        src={avatarPreview || getFullImageUrl(profile?.avatar_url || '')}
                        alt="Avatar preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Camera className="h-8 w-8 text-slate-300" />
                      </div>
                    )}
                    {(avatarPreview || profile?.avatar_url) && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* File Input */}
                  <div className="flex-1">
                    <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-blue-400 hover:bg-blue-50">
                      <span>Pilih foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        disabled={isUpdating}
                        className="hidden"
                      />
                    </label>
                    <p className="mt-1 text-xs text-slate-500">
                      Format: JPG, PNG, GIF (Max 5MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Username Field */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Username
                </label>
                <Input
                  placeholder="Masukkan username baru"
                  {...register('username')}
                  disabled={isUpdating}
                  className="mt-1"
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Password Baru
                </label>
                <Input
                  type="password"
                  placeholder="Masukkan password baru (kosongkan jika tidak ingin mengubah)"
                  {...register('password')}
                  disabled={isUpdating}
                  className="mt-1"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Konfirmasi Password
                </label>
                <Input
                  type="password"
                  placeholder="Konfirmasi password baru"
                  {...register('passwordConfirm')}
                  disabled={isUpdating}
                  className="mt-1"
                />
                {errors.passwordConfirm && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.passwordConfirm.message}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 border-t border-slate-200 pt-6">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1"
                >
                  {isUpdating ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isUpdating}
                  className="flex-1"
                >
                  Batal
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <MyTemplatesSection />
    </div>
  );
}
