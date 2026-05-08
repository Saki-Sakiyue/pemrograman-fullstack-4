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
