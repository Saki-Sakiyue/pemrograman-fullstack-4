'use client';

import React, { useState } from 'react';
import { useSubmitReport } from '@/hooks/queries/report.queries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateId: number;
}

export default function ReportModal({
  isOpen,
  onClose,
  templateId,
}: ReportModalProps) {
  const [reason, setReason] = useState('');
  const { mutate: submitReport, isPending } = useSubmitReport();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) {
      return;
    }

    submitReport(
      { template_id: templateId, reason: reason.trim() },
      {
        onSuccess: () => {
          setReason('');
          onClose();
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Laporkan Template
          </h2>
          <button
            onClick={onClose}
            disabled={isPending}
            className="text-slate-400 hover:text-slate-600 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Description */}
          <p className="text-sm text-slate-600">
            Jelaskan alasan mengapa Anda ingin melaporkan template ini.
          </p>

          {/* Reason Textarea */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Alasan Pelaporan *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isPending}
              placeholder="Contoh: Link tidak valid, konten tidak sesuai, dll"
              rows={4}
              className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-500"
            />
            {reason && (
              <p className="mt-1 text-xs text-slate-500">
                {reason.length} karakter
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t border-slate-200 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isPending || !reason.trim()}
              className="flex-1"
            >
              {isPending ? 'Mengirim...' : 'Kirim Laporan'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
