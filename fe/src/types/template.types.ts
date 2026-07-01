import { Tag } from './tag.types';
import { Stack } from './stack.types';

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
  status: 'pending' | 'approved' | 'rejected';
  is_active: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
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
  stacks: Stack[];
  images: TemplateImages[];
  tags: Tag[];
}

//> Params
export interface TemplateQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category_id?: number | null; // Filter berdasarkan ID kategori
  status?: 'pending' | 'approved' | 'rejected'; // Admin can filter by status
  tag_id?: number[] | number | null;
  stack_id?: number[] | number | null;
}

//> Payload
export interface CreateTemplatePayload {
  title: string;
  description: string;
  category_id: number;
  upload_type?: string;
  source_url?: string;
  demo_url?: string;
  tag_ids?: number[];
  stack_ids?: number[];
}

export type UpdateTemplatePayload = Partial<CreateTemplatePayload>;

//> Response
// Jika endpoint /templates mengembalikan array dalam 'data'
export interface TemplateResponseData {
  templates: Template[];
  pagination: PaginationMeta;
}

export type TemplateDetailResponseData = TemplateDetail;
