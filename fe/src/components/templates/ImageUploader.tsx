'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  ImageFile,
  ImageValidationResult,
} from '@/types/image.types';
import {
  validateImageFile,
  validateImageCount,
  generatePreview,
  generateImageId,
  IMAGE_CONFIG,
} from '@/lib/imageUtils';
import { ImagePreviewItem } from './ImagePreviewItem';
import { Upload, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImagesChange: (images: ImageFile[]) => void;
  maxFiles?: number;
  maxFileSize?: number;
  acceptedFormats?: string[];
  initialImages?: ImageFile[];
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesChange,
  maxFiles = IMAGE_CONFIG.MAX_FILES,
  maxFileSize = IMAGE_CONFIG.MAX_FILE_SIZE,
  acceptedFormats = IMAGE_CONFIG.ACCEPTED_FORMATS,
  initialImages = [],
}) => {
  const [images, setImages] = useState<ImageFile[]>(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notify parent component when images change
  useEffect(() => {
    onImagesChange(images);
  }, [images, onImagesChange]);

  /**
   * Handle file selection/drop
   */
  const handleFiles = useCallback(
    async (files: FileList) => {
      setGeneralError(null);
      const newImages: ImageFile[] = [];
      const errors: string[] = [];

      // Validate total count
      const countValidation = validateImageCount(images.length, files.length);
      if (!countValidation.valid) {
        setGeneralError(countValidation.error);
        return;
      }

      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file
        const validation = validateImageFile(file);
        if (!validation.valid) {
          errors.push(`${file.name}: ${validation.error}`);
          continue;
        }

        // Check if file already added
        const isDuplicate = images.some(
          (img) => img.file.name === file.name && img.file.size === file.size
        );
        if (isDuplicate) {
          errors.push(`${file.name}: File already added`);
          continue;
        }

        try {
          // Generate preview
          const preview = await generatePreview(file);
          const imageId = generateImageId();

          newImages.push({
            id: imageId,
            file,
            preview,
            isPrimary: images.length === 0 && newImages.length === 0, // First image is primary
            error: undefined,
          });
        } catch (err) {
          errors.push(`${file.name}: Failed to process image`);
        }
      }

      // Show errors if any
      if (errors.length > 0) {
        setGeneralError(
          errors.length === 1
            ? errors[0]
            : `${errors.length} files have errors. ${errors[0]}`
        );
      }

      // Add new images
      if (newImages.length > 0) {
        setImages((prev) => [...prev, ...newImages]);
      }
    },
    [images]
  );

  /**
   * Handle file input change
   */
  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      handleFiles(e.target.files);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  /**
   * Handle drag over
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  /**
   * Handle drag leave
   */
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  /**
   * Handle drop
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  /**
   * Remove image by ID
   */
  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      // If removed image was primary, set first as primary
      if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
        updated[0].isPrimary = true;
      }
      return updated;
    });
  };

  /**
   * Set image as primary
   */
  const handleSetPrimary = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPrimary: img.id === id,
      }))
    );
  };

  /**
   * Handle reorder via drag
   */
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  /**
   * Handle drop to reorder
   */
  const handleDropReorder = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (sourceIndex === targetIndex) return;

    setImages((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(sourceIndex, 1);
      updated.splice(targetIndex, 0, removed);
      return updated;
    });
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:hover:border-gray-500'
        }`}
      >
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <Upload
            className={`mb-3 transition-colors ${
              isDragging
                ? 'text-blue-500'
                : 'text-gray-400 dark:text-gray-500'
            }`}
            size={32}
          />

          <p className="font-medium text-gray-700 dark:text-gray-300">
            Drag and drop your images here
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            or click to browse
          </p>

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Max {maxFiles} files, {maxFileSize / (1024 * 1024)}MB each • JPG, PNG only
          </p>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={`.${acceptedFormats.join(', .')}`}
            onChange={handleFileInputChange}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </div>
      </div>

      {/* General Error */}
      {generalError && (
        <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-700 dark:text-red-300">{generalError}</p>
        </div>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Selected Images ({images.length}/{maxFiles})
            </label>
            {images.some((img) => img.isPrimary) && (
              <span className="text-xs text-blue-600 dark:text-blue-400">
                ★ Primary image selected
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {images.map((image, index) => (
              <div
                key={image.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverId(image.id);
                }}
                onDragLeave={() => setDragOverId(null)}
                onDrop={(e) => {
                  handleDropReorder(e, index);
                  setDragOverId(null);
                }}
                className={`cursor-move transition-opacity ${
                  dragOverId === image.id ? 'opacity-50' : ''
                }`}
              >
                <ImagePreviewItem
                  image={image}
                  index={index}
                  onRemove={handleRemoveImage}
                  onSetPrimary={handleSetPrimary}
                  isDragging={dragOverId === image.id}
                />
              </div>
            ))}
          </div>

          {/* Info */}
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            💡 Tip: Drag items to reorder, click to set primary image
          </p>
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && !generalError && (
        <div className="rounded-lg border border-dashed border-gray-300 px-4 py-8 text-center dark:border-gray-600">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No images selected yet
          </p>
        </div>
      )}
    </div>
  );
};
