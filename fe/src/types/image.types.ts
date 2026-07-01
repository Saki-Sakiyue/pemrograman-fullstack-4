/**
 * Image Upload Types
 * Defines interfaces untuk image upload functionality
 */

export interface ImageFile {
  id: string; // unique identifier untuk preview
  file: File;
  preview: string; // Data URL
  isPrimary: boolean;
  error?: string;
}

export interface ImageUploadState {
  images: ImageFile[];
  loading: boolean;
  errors: Record<string, string>;
}

export interface ImageValidationResult {
  valid: boolean;
  error?: string;
}
