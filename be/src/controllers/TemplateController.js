const db = require('../config/database');
const { validateCreateTemplate } = require('../validators/templateValidator');
const logger = require('../utils/logger');
const responseHandler = require('../utils/responseHandler');
const TemplateService = require('../services/TemplateService');

class TemplateController {
  async index(req, res) {
    try {
      const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
      const offset = (page - 1) * limit;

      const search = (req.query.search || '').trim();
      const categoryId = req.query.category_id;

      // Dynamic Where Clause
      let whereClause = 'WHERE t.deleted_at IS NULL AND t.is_active = ?';
      const whereParams = [true];

      if (search) {
        whereClause += ' AND t.title LIKE ? OR t.description LIKE ?';
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

      // Gunakan responseHandler agar format JSON konsisten
      return responseHandler(res, {
        status: 200,
        messageDev: 'Templates fetched successfully',
        messageUser: 'Daftar template berhasil dimuat.',
        data: {
          templates: rows,
          pagination: { page, limit, total, totalPages },
        },
      });
    } catch (error) {
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'An error occurred while fetching templates',
        messageUser: 'Terjadi kesalahan saat memuat template. Silakan coba lagi.',
        error,
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      // 1. Ambil Data Utama
      const sql = `
          SELECT 
              t.*, 
              c.name AS category_name, c.slug AS category_slug,
              u.username AS author, u.avatar_url
          FROM templates t
          INNER JOIN categories c ON c.id = t.category_id
          INNER JOIN users u ON u.id = t.user_id
          WHERE t.id = ? AND t.deleted_at IS NULL AND t.is_active = TRUE
      `;
      const [templateRows] = await db.execute(sql, [id]);

      if (templateRows.length === 0) {
        return responseHandler(res, {
          status: 404,
          code: 'ERR_NOT_FOUND',
          messageDev: 'Template not found or inactive',
          messageUser: 'Template yang kamu cari tidak ditemukan atau sudah ditarik.',
        });
      }

      const template = templateRows[0];

      // 2. Ambil Relasi Stacks (Teknologi)
      const [stacksRows, imagesRows] = await Promise.all([
        db.query(
          `
        SELECT s.name, s.icon_url FROM stacks s
        JOIN template_stacks ts ON s.id = ts.stack_id
        WHERE ts.template_id = ?`,
          [id]
        ),
        db.query(
          `
        SELECT image_url, is_primary FROM template_images 
        WHERE template_id = ?`,
          [id]
        ),
      ]);

      template.stacks = stacksRows[0];
      template.images = imagesRows[0];

      return responseHandler(res, {
        status: 200,
        messageDev: 'Template detail fetched successfully',
        messageUser: 'Detail template berhasil dimuat.',
        data: template,
      });
    } catch (error) {
      logger.error({ err: error.message, stack: error.stack }, 'Error fetching template detail');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'Error fetching template detail',
        messageUser: 'Gagal memuat detail template.',
        error,
      });
    }
  }

  async create(req, res) {
    try {
      const validation = validateCreateTemplate(req.body);

      if (!validation.valid) {
        return responseHandler(res, {
          status: 400,
          code: 'ERR_VALIDATION',
          messageDev: 'Validation failed',
          messageUser: validation.message,
        });
      }

      // Auth check (biasanya sudah ditangani middleware auth, tapi ini pengaman tambahan)
      if (!req.user || !req.user.id) {
        return responseHandler(res, {
          status: 401,
          code: 'ERR_UNAUTHORIZED',
          messageDev: 'No user object in request',
          messageUser: 'Sesi Anda telah berakhir, silakan login kembali.',
        });
      }

      const { category_id, title, description, upload_type, source_url, demo_url } = req.body;

      // Check if category exists
      const [categoryRows] = await db.query(`SELECT id FROM categories WHERE id = ? LIMIT 1`, [
        category_id,
      ]);
      if (categoryRows.length === 0) {
        return responseHandler(res, {
          status: 400,
          code: 'ERR_CATEGORY_NOT_FOUND',
          messageDev: 'Provided category_id does not exist',
          messageUser: 'Kategori yang dipilih tidak valid.',
        });
      }

      const insertSql = `
            INSERT INTO templates (
                title, description, upload_type, source_url, demo_url,
                category_id, user_id, is_active, created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `;

      await db.query(insertSql, [
        title.trim(),
        description.trim(),
        upload_type,
        source_url || null,
        demo_url || null,
        category_id,
        req.user.id,
        true,
      ]);

      return responseHandler(res, {
        status: 201,
        messageDev: 'Template created successfully',
        messageUser: 'Template baru berhasil ditambahkan ke komunitas!',
        data: { title },
      });
    } catch (error) {
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'An error occurred while creating template',
        messageUser: 'Terjadi kesalahan saat membuat template. Silakan coba lagi.',
        error,
      });
    }
  }

  async download(req, res) {
    try {
      const { id: templateId } = req.params;

      // Cek eksistensi template
      const [template] = await db.execute(
        'SELECT id FROM templates WHERE id = ? AND deleted_at IS NULL AND is_active = TRUE',
        [templateId]
      );
      if (template.length === 0) {
        return responseHandler(res, {
          status: 404,
          code: 'ERR_NOT_FOUND',
          messageDev: 'Template not found',
          messageUser: 'Template tidak ditemukan.',
        });
      }

      // 1. Eksekusi penambahan jumlah download
      await db.execute('UPDATE templates SET download_count = download_count + 1 WHERE id = ?', [
        templateId,
      ]);

      // 2. RE-CALCULATE SCORE
      await TemplateService.updatePopularityScore(templateId);

      // TODO: Logika mengirim file ke client

      return responseHandler(res, {
        status: 200,
        messageDev: 'Download count incremented and score updated',
        messageUser: 'Berhasil mencatat unduhan.',
      });
    } catch (error) {
      return responseHandler(res, {
        status: 500,
        code: 'ERR_DOWNLOAD',
        messageDev: 'Download update failed',
        messageUser: 'Gagal mencatat unduhan.',
        error,
      });
    }
  }

  async update(req, res) {
    const templateId = req.params.id;
    // Mengambil data yang dikirim dari Postman/Frontend
    const { title, description, category_id, demo_url, source_url } = req.body;

    try {
      // 1. Validasi Dasar: Pastikan kolom wajib terisi
      if (!title || !category_id) {
        return responseHandler(res, {
          status: 400,
          code: 'ERR_VALIDATION',
          messageDev: 'Missing required fields: title or category_id',
          messageUser: 'Title dan Category ID wajib diisi.',
        });
      }

      const query = `
        UPDATE templates 
        SET title = ?, description = ?, category_id = ?, demo_url = ?, source_url = ?
        WHERE id = ? 
          AND deleted_at IS NULL 
          AND is_active = TRUE
      `;

      // Urutan value ini HARUS SAMA dengan urutan tanda tanya (?) di query atas
      const values = [title, description, category_id, demo_url, source_url, templateId];

      // 3. Eksekusi Database
      const [result] = await db.execute(query, values);

      // 4. Cek apakah ada data yang berhasil di-update

      if (result.affectedRows === 0) {
        return responseHandler(res, {
          status: 404,
          code: 'ERR_NOT_FOUND',
          messageDev: 'Update failed: template not found or inactive',
          messageUser: 'Update gagal: Template tidak ditemukan, tidak aktif, atau sudah dihapus.',
        });
      }

      // 5. Kembalikan Respons Sukses
      return responseHandler(res, {
        status: 200,
        messageDev: 'Template updated successfully',
        messageUser: 'Data template berhasil diperbarui!',
      });
    } catch (error) {
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'Error updating template',
        messageUser: 'Terjadi kesalahan internal pada server saat melakukan update.',
        error,
      });
    }
  }

  async upvote(req, res) {
    try {
      const { id: templateId } = req.params;
      const userId = req.user.id;

      // Cek eksistensi template (Soft Delete Check)
      const [template] = await db.execute(
        'SELECT id FROM templates WHERE id = ? AND deleted_at IS NULL AND is_active = TRUE',
        [templateId]
      );
      if (template.length === 0) {
        return responseHandler(res, {
          status: 404,
          code: 'ERR_NOT_FOUND',
          messageDev: 'Template not found',
          messageUser: 'Template tidak ditemukan.',
        });
      }

      // Cek apakah sudah upvote (Toggle Logic)
      const [existing] = await db.execute(
        'SELECT id FROM upvotes WHERE user_id = ? AND template_id = ?',
        [userId, templateId]
      );

      let action = '';
      if (existing.length > 0) {
        await db.execute('DELETE FROM upvotes WHERE id = ?', [existing[0].id]);
        action = 'removed';
      } else {
        await db.execute('INSERT INTO upvotes (user_id, template_id) VALUES (?, ?)', [
          userId,
          templateId,
        ]);
        action = 'added';
      }

      // RE-CALCULATE SCORE
      await TemplateService.updatePopularityScore(templateId);

      return responseHandler(res, {
        status: 200,
        messageDev: `Upvote ${action} and score updated`,
        messageUser: action === 'added' ? 'Upvote berhasil ditambahkan.' : 'Upvote dibatalkan.',
      });
    } catch (error) {
      return responseHandler(res, {
        status: 500,
        code: 'ERR_UPVOTE',
        messageDev: 'Upvote failed',
        messageUser: 'Gagal memproses upvote.',
        error,
      });
    }
  }

  async bookmark(req, res) {
    try {
      const { id: templateId } = req.params;
      const userId = req.user.id;

      // Cek eksistensi template
      const [template] = await db.execute(
        'SELECT id FROM templates WHERE id = ? AND deleted_at IS NULL AND is_active = TRUE',
        [templateId]
      );
      if (template.length === 0) {
        return responseHandler(res, {
          status: 404,
          code: 'ERR_NOT_FOUND',
          messageDev: 'Template not found',
          messageUser: 'Template tidak ditemukan.',
        });
      }

      // Cek apakah sudah bookmark (Toggle Logic)
      const [existing] = await db.execute(
        'SELECT id FROM bookmarks WHERE user_id = ? AND template_id = ?',
        [userId, templateId]
      );

      let action = '';
      if (existing.length > 0) {
        await db.execute('DELETE FROM bookmarks WHERE user_id = ? AND template_id = ?', [
          userId,
          templateId,
        ]); // Pakai user_id & template_id karena dbml mu mungkin ga pake kolom 'id' PK di pivot bookmarks
        action = 'removed';
      } else {
        await db.execute('INSERT INTO bookmarks (user_id, template_id) VALUES (?, ?)', [
          userId,
          templateId,
        ]);
        action = 'added';
      }

      // RE-CALCULATE SCORE
      await TemplateService.updatePopularityScore(templateId);

      return responseHandler(res, {
        status: 200,
        messageDev: `Bookmark ${action} and score updated`,
        messageUser: action === 'added' ? 'Disimpan ke bookmark.' : 'Dihapus dari bookmark.',
      });
    } catch (error) {
      return responseHandler(res, {
        status: 500,
        code: 'ERR_BOOKMARK',
        messageDev: 'Bookmark failed',
        messageUser: 'Gagal memproses bookmark.',
        error,
      });
    }
  }

  async destroy(req, res) {
    try {
      const { id: templateId } = req.params;
      const userId = req.user.id;
      const userRole = req.user.role;

      // 1. Cari template & Cek Kepemilikan (Anti-IDOR)
      // User biasa hanya boleh menghapus template miliknya sendiri. Admin bebas.
      const [template] = await db.execute(
        'SELECT id, user_id FROM templates WHERE id = ? AND deleted_at IS NULL',
        [templateId]
      );

      if (template.length === 0) {
        return responseHandler(res, {
          status: 404,
          code: 'ERR_NOT_FOUND',
          messageDev: 'Template not found or already deleted',
          messageUser: 'Template tidak ditemukan.',
        });
      }

      // Authorization Check: Pastikan yang hapus adalah Owner atau Admin
      if (template[0].user_id !== userId && userRole !== 'admin') {
        return responseHandler(res, {
          status: 403,
          code: 'ERR_FORBIDDEN',
          messageDev: "User attempted to delete someone else's template",
          messageUser: 'Anda tidak memiliki akses untuk menghapus template ini.',
        });
      }

      // 2. Eksekusi Soft Delete
      await db.execute('UPDATE templates SET deleted_at = NOW(), is_active = FALSE WHERE id = ?', [
        templateId,
      ]);

      return responseHandler(res, {
        status: 200,
        messageDev: `Template ${templateId} soft deleted successfully`,
        messageUser: 'Template berhasil dihapus.',
      });
    } catch (error) {
      return responseHandler(res, {
        status: 500,
        code: 'ERR_DELETE_FAILED',
        messageDev: 'Internal error during soft delete',
        messageUser: 'Gagal menghapus template.',
        error,
      });
    }
  }
}

const object = new TemplateController();
module.exports = object;
