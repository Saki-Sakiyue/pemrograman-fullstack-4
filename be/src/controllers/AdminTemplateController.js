const db = require('../config/database');
const logger = require('../utils/logger');
const responseHandler = require('../utils/responseHandler');

class AdminTemplateController {
  /**
   * GET /api/admin/templates
   * List all templates with admin filtering (pending, approved, rejected)
   */
  async index(req, res) {
    try {
      const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
      const offset = (page - 1) * limit;

      const search = (req.query.search || '').trim();
      const categoryId = req.query.category_id;
      const statusFilter = req.query.status; // 'pending', 'approved', 'rejected'

      // Build WHERE clause
      let whereClause = 'WHERE t.deleted_at IS NULL';
      const whereParams = [];

      // Admin can filter by status
      if (statusFilter && ['pending', 'approved', 'rejected'].includes(statusFilter)) {
        whereClause += ' AND t.status = ?';
        whereParams.push(statusFilter);
      }

      if (search) {
        whereClause += ' AND (t.title LIKE ? OR t.description LIKE ?)';
        whereParams.push(`%${search}%`, `%${search}%`);
      }

      if (categoryId) {
        whereClause += ' AND t.category_id = ?';
        whereParams.push(categoryId);
      }

      const sql = `
        SELECT 
          t.id, t.title, t.description, t.upload_type, 
          t.source_url, t.demo_url, t.download_count, 
          t.popularity_score, t.created_at,
          c.name AS category_name, 
          u.username AS author,
          t.status, t.is_active,
          (SELECT image_url FROM template_images WHERE template_id = t.id AND is_primary LIMIT 1) AS thumbnail_url
        FROM templates t
        INNER JOIN categories c ON c.id = t.category_id
        INNER JOIN users u ON u.id = t.user_id
        ${whereClause}
        ORDER BY t.created_at DESC
        LIMIT ? OFFSET ?
      `;

      const countSql = `
        SELECT COUNT(*) AS total FROM templates t
        INNER JOIN categories c ON c.id = t.category_id
        INNER JOIN users u ON u.id = t.user_id
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
        messageDev: 'Admin - Templates fetched successfully',
        messageUser: 'Daftar template berhasil dimuat.',
        data: {
          templates: rows,
          pagination: { page, limit, total, totalPages },
        },
      });
    } catch (error) {
      logger.error({ err: error }, 'Admin - List Templates Error');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'Failed to fetch templates',
        messageUser: 'Terjadi kesalahan saat memuat template.',
        error,
      });
    }
  }

  /**
   * PATCH /api/admin/templates/:id/status
   * Update template status (approve/reject only)
   */
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validation - only approve/reject
      if (!status || !['approved', 'rejected'].includes(status)) {
        return responseHandler(res, {
          status: 400,
          code: 'ERR_VALIDATION',
          messageDev: 'Invalid status value',
          messageUser: 'Status harus berisi "approved" atau "rejected".',
        });
      }

      // Check if template exists
      const checkSql = 'SELECT id, title, status FROM templates WHERE id = ? AND deleted_at IS NULL';
      const [templates] = await db.query(checkSql, [id]);

      if (templates.length === 0) {
        return responseHandler(res, {
          status: 404,
          code: 'ERR_NOT_FOUND',
          messageDev: 'Template not found',
          messageUser: 'Template tidak ditemukan.',
        });
      }

      // Update status and is_active
      const isActive = status === 'approved' ? 1 : 0;
      const updateSql = `
        UPDATE templates 
        SET status = ?, is_active = ?, updated_at = NOW() 
        WHERE id = ?
      `;
      await db.query(updateSql, [status, isActive, id]);

      return responseHandler(res, {
        status: 200,
        messageDev: 'Template status updated successfully',
        messageUser: `Template "${templates[0].title}" berhasil di-${status === 'approved' ? 'setujui' : 'tolak'}.`,
        data: {
          template_id: parseInt(id, 10),
          title: templates[0].title,
          old_status: templates[0].status,
          new_status: status,
          is_active: isActive === 1,
        },
      });
    } catch (error) {
      logger.error({ err: error }, 'Admin - Update Template Status Error');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'Failed to update template status',
        messageUser: 'Terjadi kesalahan saat mengubah status template.',
        error,
      });
    }
  }

  /**
   * DELETE /api/admin/templates/:id
   * Soft delete template
   */
  async softDelete(req, res) {
    try {
      const { id } = req.params;

      // Check if template exists
      const checkSql = 'SELECT id, title FROM templates WHERE id = ? AND deleted_at IS NULL';
      const [templates] = await db.query(checkSql, [id]);

      if (templates.length === 0) {
        return responseHandler(res, {
          status: 404,
          code: 'ERR_NOT_FOUND',
          messageDev: 'Template not found',
          messageUser: 'Template tidak ditemukan.',
        });
      }

      // Soft delete
      const deleteSql = 'UPDATE templates SET deleted_at = NOW() WHERE id = ?';
      await db.query(deleteSql, [id]);

      return responseHandler(res, {
        status: 200,
        messageDev: 'Template deleted successfully',
        messageUser: `Template "${templates[0].title}" berhasil dihapus.`,
        data: {
          template_id: parseInt(id, 10),
          title: templates[0].title,
        },
      });
    } catch (error) {
      logger.error({ err: error }, 'Admin - Delete Template Error');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'Failed to delete template',
        messageUser: 'Terjadi kesalahan saat menghapus template.',
        error,
      });
    }
  }
}

const controller = new AdminTemplateController();
module.exports = controller;
