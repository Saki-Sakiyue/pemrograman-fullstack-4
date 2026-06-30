const db = require('../config/database');
const logger = require('../utils/logger');
const responseHandler = require('../utils/responseHandler');

class AdminUserController {
  /**
   * GET /api/admin/users
   * List all users with search and pagination
   */
  async index(req, res) {
    try {
      const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
      const offset = (page - 1) * limit;

      const search = (req.query.search || '').trim();
      const roleFilter = req.query.role; // 'admin' or 'user'

      // Build WHERE clause
      let whereClause = 'WHERE deleted_at IS NULL';
      const whereParams = [];

      if (search) {
        whereClause += ' AND (username LIKE ? OR email LIKE ?)';
        whereParams.push(`%${search}%`, `%${search}%`);
      }

      if (roleFilter && ['admin', 'user'].includes(roleFilter)) {
        whereClause += ' AND role = ?';
        whereParams.push(roleFilter);
      }

      const sql = `
        SELECT 
          id, username, email, role, avatar_url, 
          created_at, updated_at
        FROM users
        ${whereClause}
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `;

      const countSql = `
        SELECT COUNT(*) AS total 
        FROM users
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
        messageDev: 'Users fetched successfully',
        messageUser: 'Daftar pengguna berhasil dimuat.',
        data: {
          users: rows,
          pagination: { page, limit, total, totalPages },
        },
      });
    } catch (error) {
      logger.error({ err: error }, 'Admin - List Users Error');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'Failed to fetch users',
        messageUser: 'Terjadi kesalahan saat memuat pengguna.',
        error,
      });
    }
  }

  /**
   * PUT /api/admin/users/:id
   * Update user role
   */
  async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      // Validation
      if (!role || !['admin', 'user'].includes(role)) {
        return responseHandler(res, {
          status: 400,
          code: 'ERR_VALIDATION',
          messageDev: 'Invalid role value',
          messageUser: 'Role harus berisi "admin" atau "user".',
        });
      }

      // Check if user exists
      const checkSql = 'SELECT id, username, role FROM users WHERE id = ? AND deleted_at IS NULL';
      const [users] = await db.query(checkSql, [id]);

      if (users.length === 0) {
        return responseHandler(res, {
          status: 404,
          code: 'ERR_NOT_FOUND',
          messageDev: 'User not found',
          messageUser: 'Pengguna tidak ditemukan.',
        });
      }

      // Prevent self-demotion (admin cannot remove their own admin role)
      if (req.user.id === parseInt(id, 10) && role !== 'admin') {
        return responseHandler(res, {
          status: 403,
          code: 'ERR_FORBIDDEN',
          messageDev: 'Cannot demote self',
          messageUser: 'Anda tidak dapat mengubah role Anda sendiri.',
        });
      }

      // Update role
      const updateSql = 'UPDATE users SET role = ?, updated_at = NOW() WHERE id = ?';
      await db.query(updateSql, [role, id]);

      return responseHandler(res, {
        status: 200,
        messageDev: 'User role updated successfully',
        messageUser: `Role pengguna ${users[0].username} berhasil diubah menjadi ${role}.`,
        data: {
          user_id: parseInt(id, 10),
          username: users[0].username,
          new_role: role,
        },
      });
    } catch (error) {
      logger.error({ err: error }, 'Admin - Update User Role Error');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'Failed to update user role',
        messageUser: 'Terjadi kesalahan saat mengubah role pengguna.',
        error,
      });
    }
  }

  /**
   * DELETE /api/admin/users/:id
   * Soft delete user
   */
  async destroy(req, res) {
    try {
      const { id } = req.params;

      // Check if user exists
      const checkSql = 'SELECT id, username FROM users WHERE id = ? AND deleted_at IS NULL';
      const [users] = await db.query(checkSql, [id]);

      if (users.length === 0) {
        return responseHandler(res, {
          status: 404,
          code: 'ERR_NOT_FOUND',
          messageDev: 'User not found',
          messageUser: 'Pengguna tidak ditemukan.',
        });
      }

      // Prevent self-deletion
      if (req.user.id === parseInt(id, 10)) {
        return responseHandler(res, {
          status: 403,
          code: 'ERR_FORBIDDEN',
          messageDev: 'Cannot delete self',
          messageUser: 'Anda tidak dapat menghapus akun Anda sendiri.',
        });
      }

      // Soft delete
      const deleteSql = 'UPDATE users SET deleted_at = NOW() WHERE id = ?';
      await db.query(deleteSql, [id]);

      return responseHandler(res, {
        status: 200,
        messageDev: 'User deleted successfully',
        messageUser: `Pengguna ${users[0].username} berhasil dihapus.`,
        data: {
          user_id: parseInt(id, 10),
          username: users[0].username,
        },
      });
    } catch (error) {
      logger.error({ err: error }, 'Admin - Delete User Error');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'Failed to delete user',
        messageUser: 'Terjadi kesalahan saat menghapus pengguna.',
        error,
      });
    }
  }
}

const controller = new AdminUserController();
module.exports = controller;
