'use client';

import React, { useState } from 'react';
import { ImageFile } from '@/types/image.types';
import { formatFileSize } from '@/lib/imageUtils';
import { Trash2, Star, GripVertical } from 'lucide-react';
import Image from 'next/image';

interface ImagePreviewItemProps {
  image: ImageFile;
  index: number;
  onRemove: (id: string) => void;
  onSetPrimary: (id: string) => void;
  isDragging?: boolean;
}

export const ImagePreviewItem: React.FC<ImagePreviewItemProps> = ({
  image,
  index,
  onRemove,
  onSetPrimary,
  isDragging = false,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border-2 border-dashed transition-all ${
        isDragging
          ? 'scale-95 opacity-50'
          : image.error
            ? 'border-red-400 bg-red-50 dark:bg-red-950'
            : image.isPrimary
              ? 'border-blue-400 bg-blue-50 dark:bg-blue-950'
              : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
      }`}
    >
      {/* Image Preview */}
      <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-800">
        {!imageError ? (
          <Image
            src={image.preview}
            alt={image.file.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100px, 150px"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Preview Error
            </span>
          </div>
        )}

        {/* Primary Badge */}
        {image.isPrimary && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white shadow-lg">
            <Star size={12} className="fill-current" />
            Primary
          </div>
        )}

        {/* Error Badge */}
        {image.error && (
          <div className="absolute right-2 top-2 flex items-center rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow-lg">
            Error
          </div>
        )}

        {/* Drag Handle */}
        <div className="absolute left-2 top-2 hidden rounded bg-black/50 p-1 text-white transition-opacity group-hover:block">
          <GripVertical size={16} />
        </div>

        {/* Action Buttons Overlay (on hover) */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
          {/* Set Primary Button */}
          {!image.isPrimary && (
            <button
              onClick={() => onSetPrimary(image.id)}
              className="flex items-center gap-1 rounded-full bg-yellow-500 hover:bg-yellow-600 px-3 py-2 text-xs font-semibold text-white shadow-lg transition-colors"
              title="Set as primary image"
              type="button"
            >
              <Star size={14} />
              Primary
            </button>
          )}

          {/* Remove Button */}
          <button
            onClick={() => onRemove(image.id)}
            className="flex items-center gap-1 rounded-full bg-red-500 hover:bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-lg transition-colors"
            title="Remove image"
            type="button"
          >
            <Trash2 size={14} />
            Remove
          </button>
        </div>
      </div>

      {/* File Info */}
      <div className="bg-white p-3 dark:bg-gray-900">
        <p className="truncate text-xs font-medium text-gray-700 dark:text-gray-300">
          {image.file.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatFileSize(image.file.size)}
        </p>

        {/* Error Message */}
        {image.error && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {image.error}
          </p>
        )}
      </div>
    </div>
  );
};
