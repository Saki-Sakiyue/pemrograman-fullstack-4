//> Entitas Utama
export interface Category {
  id: number;
}

//> Params
export interface TemplateQueryParams {
  page?: number;
}

//> Payload
export interface CreateTemplatePayload {
  title: string;
}
export type UpdateTemplatePayload = Partial<CreateTemplatePayload>;

//> Response
// Jika endpoint /templates mengembalikan array dalam 'data'
export interface TemplateResponseData {
  categories: Category[];
}
