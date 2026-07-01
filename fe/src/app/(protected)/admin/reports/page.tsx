'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useHydration } from '@/hooks/common/useHydration';
import {
  useAdminReports,
  useUpdateReportStatus,
} from '@/hooks/queries/admin-report.queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/admin/StatusBadge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import type { AdminReport } from '@/services/admin-report.service';

export default function AdminReportsPage() {
  const router = useRouter();
  const isHydrated = useHydration();
  const currentUser = useAuthStore(state => state.user);

  // Filters & pagination
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<
    'pending' | 'resolved' | 'rejected' | 'all'
  >('all');

  // Modals
  const [selectedReport, setSelectedReport] = useState<AdminReport | null>(
    null
  );
  const [actionReport, setActionReport] = useState<{
    report: AdminReport;
    action: 'resolved' | 'rejected';
  } | null>(null);

  // API calls
  const { data, isLoading, error } = useAdminReports({
    page,
    limit: 10,
    status: statusFilter === 'all' ? undefined : statusFilter,
  });

  const updateStatusMutation = useUpdateReportStatus();

  // Protect admin-only page
  useEffect(() => {
    if (isHydrated && (!currentUser || currentUser.role !== 'admin')) {
      router.push('/dashboard');
    }
  }, [isHydrated, currentUser, router]);

  // Show loading while checking auth
  if (!isHydrated || !currentUser || currentUser.role !== 'admin') {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  const handleUpdateStatus = () => {
    if (!actionReport) return;
    updateStatusMutation.mutate(
      { reportId: actionReport.report.id, status: actionReport.action },
      {
        onSuccess: () => {
          setActionReport(null);
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Report Management</h1>
        <p className="mt-2 text-gray-500">
          Review and handle user-submitted reports
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex items-center justify-between">
            <Select
              value={statusFilter}
              onValueChange={(
                value: 'pending' | 'resolved' | 'rejected' | 'all'
              ) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="py-8 text-center text-red-600">
              Failed to load reports. Please try again.
            </div>
          ) : !data?.reports || data.reports.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No reports found.
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.reports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="max-w-[200px] truncate font-medium">
                          {report.template_title}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {report.template_id}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {report.reporter_username}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {report.reporter_id}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[300px] truncate text-gray-600">
                          {report.reason}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={report.status} />
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {new Date(report.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {report.status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setActionReport({
                                    report,
                                    action: 'resolved',
                                  })
                                }
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setActionReport({
                                    report,
                                    action: 'rejected',
                                  })
                                }
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {data.pagination.totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {data.reports.length} of {data.pagination.total}{' '}
                    reports
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => p + 1)}
                      disabled={page === data.pagination.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* View Report Details Modal */}
      <Dialog
        open={!!selectedReport}
        onOpenChange={() => setSelectedReport(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Template
                </label>
                <p className="text-base font-medium">
                  {selectedReport.template_title}
                </p>
                <p className="text-sm text-gray-500">
                  Template ID: {selectedReport.template_id}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Reported By
                </label>
                <p className="text-base font-medium">
                  {selectedReport.reporter_username}
                </p>
                <p className="text-sm text-gray-500">
                  User ID: {selectedReport.reporter_id}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Reason
                </label>
                <p className="text-base">{selectedReport.reason}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Status
                </label>
                <div className="mt-1">
                  <StatusBadge status={selectedReport.status} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Reported On
                </label>
                <p className="text-base">
                  {new Date(selectedReport.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedReport(null)}>
              Close
            </Button>
            {selectedReport?.status === 'pending' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setActionReport({
                      report: selectedReport,
                      action: 'resolved',
                    });
                    setSelectedReport(null);
                  }}
                  className="text-green-600 hover:text-green-700"
                >
                  Resolve
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setActionReport({
                      report: selectedReport,
                      action: 'rejected',
                    });
                    setSelectedReport(null);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  Reject
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Action Modal */}
      <Dialog open={!!actionReport} onOpenChange={() => setActionReport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionReport?.action === 'resolved'
                ? 'Resolve Report'
                : 'Reject Report'}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to{' '}
              {actionReport?.action === 'resolved' ? 'resolve' : 'reject'} this
              report for "{actionReport?.report.template_title}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionReport(null)}>
              Cancel
            </Button>
            <Button
              variant={
                actionReport?.action === 'resolved' ? 'default' : 'destructive'
              }
              onClick={handleUpdateStatus}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending
                ? 'Processing...'
                : actionReport?.action === 'resolved'
                  ? 'Resolve'
                  : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
