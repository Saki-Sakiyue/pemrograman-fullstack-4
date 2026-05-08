//> Entitas Utama
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  avatar_url: string;
}

//> Payload
export interface LoginPayload {
  identifier: string; // Bisa username atau email
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

//> Response
export interface LoginResponseData {
  token: string;
  user: UserProfile;
}
