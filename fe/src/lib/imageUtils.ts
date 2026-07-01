/**
 * Image Utility Functions
 * Helper functions untuk image validation dan processing
 */

import { ImageValidationResult } from '@/types/image.types';

// Constants
export const IMAGE_CONFIG = {
  MAX_FILES: 5,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_FORMATS: ['jpg', 'jpeg', 'png'],
  ACCEPTED_MIMETYPES: ['image/jpeg', 'image/jpg', 'image/png'],
};

/**
 * Validate image type
 */
export const validateImageType = (file: File): ImageValidationResult => {
  const isValidMimetype = IMAGE_CONFIG.ACCEPTED_MIMETYPES.includes(
    file.type.toLowerCase()
  );
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  const isValidExtension =
    fileExtension && IMAGE_CONFIG.ACCEPTED_FORMATS.includes(fileExtension);

  if (!isValidMimetype || !isValidExtension) {
    return {
      valid: false,
      error: 'Only JPG and PNG images are allowed',
    };
  }

  return { valid: true };
};

/**
 * Validate image size
 */
export const validateImageSize = (file: File): ImageValidationResult => {
  if (file.size > IMAGE_CONFIG.MAX_FILE_SIZE) {
    const maxSizeMB = IMAGE_CONFIG.MAX_FILE_SIZE / (1024 * 1024);
    return {
      valid: false,
      error: `File size must not exceed ${maxSizeMB}MB (current: ${(file.size / (1024 * 1024)).toFixed(2)}MB)`,
    };
  }

  return { valid: true };
};

/**
 * Validate single image file
 */
export const validateImageFile = (file: File): ImageValidationResult => {
  // Check type
  const typeValidation = validateImageType(file);
  if (!typeValidation.valid) {
    return typeValidation;
  }

  // Check size
  const sizeValidation = validateImageSize(file);
  if (!sizeValidation.valid) {
    return sizeValidation;
  }

  return { valid: true };
};

/**
 * Validate total image count
 */
export const validateImageCount = (
  currentCount: number,
  newFilesCount: number
): ImageValidationResult => {
  const totalCount = currentCount + newFilesCount;

  if (totalCount > IMAGE_CONFIG.MAX_FILES) {
    return {
      valid: false,
      error: `Maximum ${IMAGE_CONFIG.MAX_FILES} files allowed (current: ${currentCount}, adding: ${newFilesCount})`,
    };
  }

  return { valid: true };
};

/**
 * Generate image preview (Data URL)
 */
export const generatePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Generate unique ID untuk image
 */
export const generateImageId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format file size untuk display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
