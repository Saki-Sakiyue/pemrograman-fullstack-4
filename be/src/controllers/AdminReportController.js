const db = require('../config/database');
const logger = require('../utils/logger');
const responseHandler = require('../utils/responseHandler');

class AdminReportController {
  /**
   * GET /api/admin/reports
   * List all reports with filtering by status
   */
  async index(req, res) {
    try {
      const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
      const offset = (page - 1) * limit;

      const statusFilter = req.query.status; // 'pending', 'resolved', 'rejected'

      // Build WHERE clause
      let whereClause = 'WHERE r.deleted_at IS NULL';
      const whereParams = [];

      if (statusFilter && ['pending', 'resolved', 'rejected'].includes(statusFilter)) {
        whereClause += ' AND r.status = ?';
        whereParams.push(statusFilter);
      }

      const sql = `
        SELECT 
          r.id, r.reason, r.status, r.created_at,
          t.id AS template_id, t.title AS template_title,
          u.id AS reporter_id, u.username AS reporter_username,
          (SELECT image_url FROM template_images WHERE template_id = t.id AND is_primary LIMIT 1) AS template_thumbnail
        FROM reports r
        INNER JOIN templates t ON t.id = r.template_id
        INNER JOIN users u ON u.id = r.user_id
        ${whereClause}
        ORDER BY r.created_at DESC
        LIMIT ? OFFSET ?
      `;

      const countSql = `
        SELECT COUNT(*) AS total 
        FROM reports r
        ${whereClause}
      `;

      const [[rows], [countRows]] = await Promise.all([
        db.query(sql, [...whereParams, limit, offset]),
        db.query(countSql, whereParams),
      ]);

      const total = countRows[0]?.total || 0;
      const totalPages = Math.ceil(total / limit);

      return responseHandler(res, {
        status: 200,
        messageDev: 'Reports fetched successfully',
        messageUser: 'Daftar laporan berhasil dimuat.',
        data: {
          reports: rows,
          pagination: { page, limit, total, totalPages },
        },
      });
    } catch (error) {
      logger.error({ err: error }, 'Admin - List Reports Error');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'Failed to fetch reports',
        messageUser: 'Terjadi kesalahan saat memuat laporan.',
        error,
      });
    }
  }

  /**
   * PATCH /api/admin/reports/:id
   * Resolve or dismiss a report
   */
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validation
      if (!status || !['resolved', 'rejected'].includes(status)) {
        return responseHandler(res, {
          status: 400,
          code: 'ERR_VALIDATION',
          messageDev: 'Invalid status value',
          messageUser: 'Status harus berisi "resolved" atau "rejected".',
        });
      }

      // Check if report exists
      const checkSql = `
        SELECT r.id, r.status, r.reason, t.title AS template_title
        FROM reports r
        INNER JOIN templates t ON t.id = r.template_id
        WHERE r.id = ? AND r.deleted_at IS NULL
      `;
      const [reports] = await db.query(checkSql, [id]);

      if (reports.length === 0) {
        return responseHandler(res, {
          status: 404,
          code: 'ERR_NOT_FOUND',
          messageDev: 'Report not found',
          messageUser: 'Laporan tidak ditemukan.',
        });
      }

      // Update status
      const updateSql = 'UPDATE reports SET status = ? WHERE id = ?';
      await db.query(updateSql, [status, id]);

      const actionText = status === 'resolved' ? 'diselesaikan' : 'ditolak';

      return responseHandler(res, {
        status: 200,
        messageDev: 'Report status updated successfully',
        messageUser: `Laporan untuk template "${reports[0].template_title}" berhasil ${actionText}.`,
        data: {
          report_id: parseInt(id, 10),
          old_status: reports[0].status,
          new_status: status,
          template_title: reports[0].template_title,
        },
      });
    } catch (error) {
      logger.error({ err: error }, 'Admin - Update Report Status Error');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'Failed to update report status',
        messageUser: 'Terjadi kesalahan saat mengubah status laporan.',
        error,
      });
    }
  }
}

const controller = new AdminReportController();
module.exports = controller;
