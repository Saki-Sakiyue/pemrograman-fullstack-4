import { reportService, ReportPayload } from '@/services/report.service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useSubmitReport = () => {
  return useMutation({
    mutationFn: (payload: ReportPayload) =>
      reportService.submitReport(payload),
    onSuccess: () => {
      toast.success('Laporan berhasil dikirim. Terima kasih telah melaporkan!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Gagal mengirim laporan. Silakan coba lagi.';
      toast.error(message);
    },
  });
};
