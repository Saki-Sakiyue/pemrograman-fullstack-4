//> Entitas Utama
export interface Template {
  id: number;
  title: string;
  description: string;
  upload_type: string;
  source_url: string;
  demo_url: string;
  download_count: number;
  popularity_score: number;
  created_at: string;
  category_name: string;
  author: string;
  thumbnail_url?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface TemplateStacks {
  name: string;
  icon_url: string;
}
interface TemplateImages {
  image_url: string;
  is_primary: number;
}

export interface TemplateDetail {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  description: string;
  upload_type: string;
  source_url: string;
  demo_url: string;
  download_count: number;
  popularity_score: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  category_name: string;
  category_slug: string;
  author: string;
  avatar_url: string;
  stacks: TemplateStacks[];
  images: TemplateImages[];
}

//> Params
export interface TemplateQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string; // Persiapan jika nanti butuh filter kategori
}

//> Payload
export interface CreateTemplatePayload {
  title: string;
  description: string;
  demo_url: string;
  category_id: number;
  thumbnail_url?: string;
}

export type UpdateTemplatePayload = Partial<CreateTemplatePayload>;

//> Response
// Jika endpoint /templates mengembalikan array dalam 'data'
export interface TemplateResponseData {
  templates: Template[];
  pagination: PaginationMeta;
}

export type TemplateDetailResponseData = TemplateDetail;
