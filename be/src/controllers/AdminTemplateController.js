const db = require('../config/database');
const logger = require('../utils/logger');
const responseHandler = require('../utils/responseHandler');

class AdminTemplateController {
  /**
   * PATCH /api/admin/templates/:id/status
   * Update template status (approve/reject) or soft delete
   */
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, action } = req.body;

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

      // Handle delete action (soft delete)
      if (action === 'delete') {
        const deleteSql = 'UPDATE templates SET deleted_at = NOW() WHERE id = ?';
        await db.query(deleteSql, [id]);

        return responseHandler(res, {
          status: 200,
          messageDev: 'Template deleted successfully',
          messageUser: `Template "${templates[0].title}" berhasil dihapus.`,
          data: {
            template_id: parseInt(id, 10),
            action: 'deleted',
          },
        });
      }

      // Handle status update (approve/reject)
      if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
        return responseHandler(res, {
          status: 400,
          code: 'ERR_VALIDATION',
          messageDev: 'Invalid status value',
          messageUser: 'Status harus berisi "pending", "approved", atau "rejected".',
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
}

const controller = new AdminTemplateController();
module.exports = controller;
