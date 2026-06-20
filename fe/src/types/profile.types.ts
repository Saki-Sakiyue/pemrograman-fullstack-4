export interface ProfileData {
  id: number;
  username: string;
  email: string;
  role: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfilePayload {
  username?: string;
  password?: string;
  avatar?: File;
}

export interface UpdateProfileResponse {
  id: number;
  username: string;
  avatar_url?: string;
  password?: string;
  token?: string;
}
