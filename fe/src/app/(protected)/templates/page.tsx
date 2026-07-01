'use client';

import { CategoryFilter } from '@/components/templates/CategoryFilter';
import TemplateCard from '@/components/templates/TemplateCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDebounce } from '@/hooks/common/useDebounce';
import { useHydration } from '@/hooks/common/useHydration';
import { useTemplatesForRole } from '@/hooks/queries/template.queries';
import {
  useUpdateTemplateStatus,
  useDeleteTemplate,
} from '@/hooks/queries/admin-template.queries';
import { useAuthStore } from '@/store/useAuthStore';
import { Search, Shield } from 'lucide-react';
import { useState } from 'react';

export default function TemplatesPage() {
  const isHydrated = useHydration();
  const currentUser = useAuthStore(state => state.user);
  const isAdmin = isHydrated && currentUser?.role === 'admin';

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    'pending' | 'approved' | 'rejected' | 'all'
  >('all');

  // Confirmation dialogs
  const [actionDialog, setActionDialog] = useState<{
    type: 'approve' | 'reject' | 'delete';
    templateId: number;
    templateTitle: string;
  } | null>(null);

  // Wrapper hook automatically selects correct endpoint based on role
  const { data, isLoading, isError } = useTemplatesForRole({
    page,
    limit: 8,
    search: debouncedSearch,
    category_id: selectedCategory,
    status: isAdmin && statusFilter !== 'all' ? statusFilter : undefined,
  });

  // Admin mutations
  const updateStatusMutation = useUpdateTemplateStatus();
  const deleteTemplateMutation = useDeleteTemplate();

  const templates = data?.templates || [];
  const pagination = data?.pagination;

  // Handle admin actions
  const handleAdminAction = () => {
    if (!actionDialog) return;

    const { type, templateId } = actionDialog;

    if (type === 'delete') {
      deleteTemplateMutation.mutate(templateId, {
        onSuccess: () => setActionDialog(null),
      });
    } else {
      updateStatusMutation.mutate(
        { templateId, status: type === 'approve' ? 'approved' : 'rejected' },
        {
          onSuccess: () => setActionDialog(null),
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Explore Templates
          </h1>
          <p className="text-slate-500">
            Temukan ribuan aset UI dan template kode terbaik.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Cari template (ex: Landing Page, Auth...)"
            className="pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Admin Status Filter */}
        {isAdmin && (
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-red-600" />
            <Select
              value={statusFilter}
              onValueChange={(
                value: 'pending' | 'approved' | 'rejected' | 'all'
              ) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[180px] w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border-2 border-dashed bg-slate-50 py-20 text-center">
          <p className="font-medium text-red-500">
            Gagal mengambil data dari server.
          </p>
        </div>
      ) : templates?.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-slate-400">Template tidak ditemukan.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {templates?.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                isAdmin={isAdmin}
                onApprove={
                  isAdmin
                    ? () =>
                        setActionDialog({
                          type: 'approve',
                          templateId: template.id,
                          templateTitle: template.title,
                        })
                    : undefined
                }
                onReject={
                  isAdmin
                    ? () =>
                        setActionDialog({
                          type: 'reject',
                          templateId: template.id,
                          templateTitle: template.title,
                        })
                    : undefined
                }
                onDelete={
                  isAdmin
                    ? () =>
                        setActionDialog({
                          type: 'delete',
                          templateId: template.id,
                          templateTitle: template.title,
                        })
                    : undefined
                }
              />
            ))}
          </div>

          {/* Controls Pagination */}
          <div className="mt-8 flex justify-center gap-4">
            <Button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              Previous
            </Button>

            <span className="flex items-center">
              Halaman {pagination?.page} dari {pagination?.totalPages}
            </span>

            <Button
              disabled={page === pagination?.totalPages}
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}

      {/* Admin Action Confirmation Dialog */}
      <Dialog open={!!actionDialog} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog?.type === 'approve' && 'Approve Template'}
              {actionDialog?.type === 'reject' && 'Reject Template'}
              {actionDialog?.type === 'delete' && 'Delete Template'}
            </DialogTitle>
            <DialogDescription>
              {actionDialog?.type === 'approve' &&
                `Are you sure you want to approve "${actionDialog.templateTitle}"? This will make it visible to all users.`}
              {actionDialog?.type === 'reject' &&
                `Are you sure you want to reject "${actionDialog.templateTitle}"? The template will not be visible to users.`}
              {actionDialog?.type === 'delete' &&
                `Are you sure you want to delete "${actionDialog.templateTitle}"? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button
              variant={
                actionDialog?.type === 'delete' ? 'destructive' : 'default'
              }
              onClick={handleAdminAction}
              disabled={
                updateStatusMutation.isPending ||
                deleteTemplateMutation.isPending
              }
            >
              {updateStatusMutation.isPending ||
              deleteTemplateMutation.isPending
                ? 'Processing...'
                : actionDialog?.type === 'approve'
                  ? 'Approve'
                  : actionDialog?.type === 'reject'
                    ? 'Reject'
                    : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
