const db = require('../config/database');
const { validateUpdateProfile } = require('../validators/profileValidator');
const logger = require('../utils/logger');
const responseHandler = require('../utils/responseHandler');
const { hashPassword, generateToken } = require('../services/AuthService');
const { deletePublicFile } = require('../utils/fileUtils');

class ProfileController {
  async getProfile(req, res) {
    try {
      // Mengambil profile berdasarkan id user yang sudah terautentikasi bukan berdasarkan parameter id di URL untuk keamanan
      const userId = req.user.id;

      const sql = `
        SELECT 
          id, username, email, role, avatar_url, created_at, updated_at
        FROM users
        WHERE id = ? AND deleted_at IS NULL
      `;
      const [rows] = await db.query(sql, [userId]);

      if (rows.length === 0) {
        return responseHandler(res, {
          status: 404,
          code: 'ERR_PROFILE_NOT_FOUND',
          messageDev: `Profile with user ID ${userId} not found`,
          messageUser: 'Profil tidak ditemukan.',
        });
      }

      const profile = rows[0];
      return responseHandler(res, {
        status: 200,
        messageDev: 'Profile fetched successfully',
        messageUser: 'Profil berhasil dimuat.',
        data: profile,
      });
    } catch (error) {
      logger.error({ err: error.message, stack: error.stack }, 'Error in getProfile');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'An error occurred while fetching profile',
        messageUser: 'Terjadi kesalahan saat memuat profil. Silakan coba lagi.',
      });
    }
  }

  async updateProfile(req, res) {
    try {
      // Jika ada file yang diupload, set avatar_url ke path file tersebut
      if (req.file) {
        req.body.avatar_url = `/uploads/avatars/${req.file.filename}`;
      } else {
        delete req.body.avatar_url; // Pastikan avatar_url tidak ikut terupdate jika tidak ada file baru
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return responseHandler(res, {
          status: 400,
          code: 'ERR_NO_DATA',
          messageDev: 'No data provided for update',
          messageUser: 'Tidak ada data yang diberikan untuk diperbarui.',
        });
      }

      const validation = validateUpdateProfile(req.body);
      if (!validation.valid) {
        // Jika validasi gagal, hapus file yang diupload jika ada untuk mencegah file orphan
        if (req.file) deletePublicFile(req.body.avatar_url);

        return responseHandler(res, {
          status: 400,
          code: 'ERR_VALIDATION',
          messageDev: 'Validation failed',
          messageUser: validation.message,
        });
      }

      const userId = req.user.id;
      const { username, password, avatar_url } = validation.data;
      const hashedPassword = password ? await hashPassword(password) : null;

      // Ambil avatar_url lama untuk dihapus jika ada update avatar
      let oldAvatarUrl = null;
      if (avatar_url) {
        const [rows] = await db.query(
          'SELECT avatar_url FROM users WHERE id = ? AND deleted_at IS NULL',
          [userId]
        );
        if (rows.length > 0) {
          oldAvatarUrl = rows[0].avatar_url;
        }
      }

      // Hanya update field yang disediakan
      const sql = `
        UPDATE users 
        SET username = COALESCE(?, username), 
            password_hash = COALESCE(?, password_hash), 
            avatar_url = COALESCE(?, avatar_url)
        WHERE id = ? AND deleted_at IS NULL
      `;
      const params = [username, hashedPassword, avatar_url, userId];
      const [result] = await db.query(sql, params);
      if (result.affectedRows === 0) {
        if (req.file) deletePublicFile(req.body.avatar_url); // Hapus file baru jika update gagal

        return responseHandler(res, {
          status: 404,
          code: 'ERR_PROFILE_NOT_FOUND',
          messageDev: `Profile with user ID ${userId} not found for update`,
          messageUser: 'Profil tidak ditemukan untuk diperbarui.',
        });
      }

      // Jika update berhasil dan ada avatar baru, hapus file avatar lama
      if (avatar_url && oldAvatarUrl) {
        deletePublicFile(oldAvatarUrl);
      }

      // Re-Issue Token jika username
      let newToken = undefined;
      let updatedUsername = req.user.username;

      if (username) {
        // Ambil data terbaru HANYA jika username berubah untuk memastikan integritas
        const [freshUserRows] = await db.query(
          'SELECT id, username, role FROM users WHERE id = ? AND deleted_at IS NULL',
          [userId]
        );
        if (freshUserRows.length > 0) {
          const freshUser = freshUserRows[0];
          updatedUsername = freshUser.username;

          // Generate token baru dengan username yang sudah diupdate
          newToken = generateToken({
            id: userId,
            username: freshUser.username,
            role: freshUser.role,
          });

          // Override req.user agar Pino Logger mencatat username terbaru
          if (req.user) req.user.username = freshUser.username;
        }
      }

      return responseHandler(res, {
        status: 200,
        messageDev: newToken
          ? 'Profile updated successfully, new token issued'
          : 'Profile updated successfully',
        messageUser: 'Profil berhasil diperbarui.',
        data: {
          id: userId,
          username: updatedUsername, // Selalu kirim username (baru atau lama)
          avatar_url: avatar_url || undefined,
          password: password ? 'updated' : undefined,
          token: newToken, // Akan bernilai token string ATAU undefined
        },
      });
    } catch (error) {
      if (req.file) deletePublicFile(req.body.avatar_url); // Hapus file baru jika terjadi error

      if (error && error.code === 'ER_DUP_ENTRY') {
        return responseHandler(res, {
          status: 400,
          code: 'ERR_DUPLICATE_ENTRY',
          messageDev: 'Username already exists',
          messageUser: 'Username sudah digunakan. Silakan pilih username lain.',
        });
      }

      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'An error occurred while updating profile',
        messageUser: 'Terjadi kesalahan saat memperbarui profil. Silakan coba lagi.',
        error,
      });
    }
  }

  async getBookmarks(req, res) {
    try {
      const userId = req.user.id;
      const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 12, 1), 100);
      const offset = (page - 1) * limit;
      const search = (req.query.search || '').trim();
      const categoryId = req.query.category_id;

      const whereClauses = ['b.user_id = ?', 't.deleted_at IS NULL', 't.is_active = 1'];
      const whereValues = [userId];

      if (search) {
        whereClauses.push('(t.title LIKE ? OR t.description LIKE ?)');
        whereValues.push(`%${search}%`, `%${search}%`);
      }

      if (categoryId) {
        whereClauses.push('t.category_id = ?');
        whereValues.push(Number(categoryId));
      }

      const whereSql = whereClauses.join(' AND ');

      // Query total count
      const [countRows] = await db.query(
        `SELECT COUNT(*) as total 
         FROM bookmarks b
         INNER JOIN templates t ON b.template_id = t.id
         WHERE ${whereSql}`,
        whereValues
      );
      const total = countRows[0].total;

      // Query bookmarked templates
      const sql = `
        SELECT 
          t.id,
          t.title,
          t.description,
          t.source_url,
          t.demo_url,
          t.download_count,
          t.popularity_score,
          t.created_at,
          c.id as category_id,
          c.name as category_name,
          u.id as author_id,
          u.username as author_username,
          b.created_at as bookmarked_at,
          (SELECT ti.image_url FROM template_images ti WHERE ti.template_id = t.id AND ti.is_primary = 1 LIMIT 1) as thumbnail_url
        FROM bookmarks b
        INNER JOIN templates t ON b.template_id = t.id
        INNER JOIN categories c ON t.category_id = c.id
        INNER JOIN users u ON t.user_id = u.id
        WHERE ${whereSql}
        ORDER BY b.created_at DESC
        LIMIT ? OFFSET ?
      `;

      const [templates] = await db.query(sql, [...whereValues, limit, offset]);

      return responseHandler(res, {
        status: 200,
        messageDev: 'Bookmarks fetched successfully',
        messageUser: 'Bookmark berhasil dimuat.',
        data: {
          templates,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error) {
      logger.error({ err: error.message, stack: error.stack }, 'Error in getBookmarks');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'An error occurred while fetching bookmarks',
        messageUser: 'Terjadi kesalahan saat memuat bookmark. Silakan coba lagi.',
      });
    }
  }

  async getMyTemplates(req, res) {
    try {
      const userId = req.user.id;
      const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 12, 1), 100);
      const offset = (page - 1) * limit;
      const search = (req.query.search || '').trim();
      const categoryId = req.query.category_id;

      const whereClauses = ['t.user_id = ?', 't.deleted_at IS NULL'];
      const whereValues = [userId];

      if (search) {
        whereClauses.push('(t.title LIKE ? OR t.description LIKE ?)');
        whereValues.push(`%${search}%`, `%${search}%`);
      }

      if (categoryId) {
        whereClauses.push('t.category_id = ?');
        whereValues.push(Number(categoryId));
      }

      const whereSql = whereClauses.join(' AND ');

      // Query total count
      const [countRows] = await db.query(
        `SELECT COUNT(*) as total FROM templates t WHERE ${whereSql}`,
        whereValues
      );
      const total = countRows[0].total;

      // Query user's templates with stats
      const sql = `
        SELECT 
          t.id,
          t.title,
          t.description,
          t.source_url,
          t.demo_url,
          t.download_count,
          t.popularity_score,
          t.is_active,
          t.created_at,
          t.updated_at,
          c.id as category_id,
          c.name as category_name,
          (SELECT COUNT(*) FROM upvotes WHERE template_id = t.id) as upvote_count,
          (SELECT COUNT(*) FROM bookmarks WHERE template_id = t.id) as bookmark_count,
          (SELECT ti.image_url FROM template_images ti WHERE ti.template_id = t.id AND ti.is_primary = 1 LIMIT 1) as thumbnail_url
        FROM templates t
        INNER JOIN categories c ON t.category_id = c.id
        WHERE ${whereSql}
        ORDER BY t.created_at DESC
        LIMIT ? OFFSET ?
      `;

      const [templates] = await db.query(sql, [...whereValues, limit, offset]);

      return responseHandler(res, {
        status: 200,
        messageDev: 'User templates fetched successfully',
        messageUser: 'Template Anda berhasil dimuat.',
        data: {
          templates,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error) {
      logger.error({ err: error.message, stack: error.stack }, 'Error in getMyTemplates');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'An error occurred while fetching user templates',
        messageUser: 'Terjadi kesalahan saat memuat template Anda. Silakan coba lagi.',
      });
    }
  }
}

const object = new ProfileController();
module.exports = object;
