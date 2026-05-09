export interface BaseResponse<T = unknown> {
  status: number;
  code: string;
  message_dev: string;
  message_user: string;
  data: T | null;
  request_id: string;
  timestamp: string;
}
