const db = require("../config/database");
const { validateCreateTemplate } = require("../validators/templateValidator");
const logger = require("../utils/logger");
const responseHandler = require("../utils/responseHandler");

class TemplateController {
  async index(req, res) {
    try {
      const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
      const offset = (page - 1) * limit;
      const search = (req.query.search || "").trim();

      // Mengikuti standar Soft Delete & Visibility Agreement
      const whereClause = search
        ? "WHERE t.deleted_at IS NULL AND t.is_active = ? AND t.title LIKE ?"
        : "WHERE t.deleted_at IS NULL AND t.is_active = ?";
      const whereParams = search ? [true, `%${search}%`] : [true];

      const sql = `
            SELECT 
                t.id, t.title, t.description, t.upload_type, 
                t.source_url, t.demo_url, t.download_count, 
                t.popularity_score, t.created_at,
                c.name AS category_name, 
                u.username AS author
            FROM templates t
            INNER JOIN categories c ON c.id = t.category_id
            INNER JOIN users u ON u.id = t.user_id
            ${whereClause}
            ORDER BY t.created_at DESC
            LIMIT ? OFFSET ?
        `;

      const countSql = `SELECT COUNT(*) AS total FROM templates t ${whereClause}`;

      const [rows] = await db.query(sql, [...whereParams, limit, offset]);
      const [countRows] = await db.query(countSql, whereParams);

      const total = countRows[0]?.total || 0;
      const totalPages = Math.ceil(total / limit);

      // Gunakan responseHandler agar format JSON konsisten
      return responseHandler(res, {
        status: 200,
        messageDev: "Templates fetched successfully",
        messageUser: "Daftar template berhasil dimuat.",
        data: {
          templates: rows,
          pagination: { page, limit, total, totalPages },
        },
      });
    } catch (error) {
      logger.error({ err: error.message, stack: error.stack }, "Error in getActiveTemplates");
      return responseHandler(res, {
        status: 500,
        code: "ERR_INTERNAL_SERVER",
        messageDev: "An error occurred while fetching templates",
        messageUser: "Terjadi kesalahan saat memuat template. Silakan coba lagi.",
      });
    }
  }

  async post(req, res) {
    try {
      const validation = validateCreateTemplate(req.body);

      if (!validation.valid) {
        return responseHandler(res, {
          status: 400,
          code: "ERR_VALIDATION",
          messageDev: "Validation failed",
          messageUser: validation.message,
        });
      }

      // Auth check (biasanya sudah ditangani middleware auth, tapi ini pengaman tambahan)
      if (!req.user || !req.user.id) {
        return responseHandler(res, {
          status: 401,
          code: "ERR_UNAUTHORIZED",
          messageDev: "No user object in request",
          messageUser: "Sesi Anda telah berakhir, silakan login kembali.",
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
          code: "ERR_CATEGORY_NOT_FOUND",
          messageDev: "Provided category_id does not exist",
          messageUser: "Kategori yang dipilih tidak valid.",
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
        messageDev: "Template created successfully",
        messageUser: "Template baru berhasil ditambahkan ke komunitas!",
        data: { title },
      });
    } catch (error) {
      logger.error({ err: error.message, body: req.body }, "Error in createTemplate");
      return responseHandler(res, {
        status: 500,
        code: "ERR_INTERNAL_SERVER",
        messageDev: "An error occurred while creating template",
        messageUser: "Terjadi kesalahan saat membuat template. Silakan coba lagi.",
      });
    }
  }
}

const object = new TemplateController();
module.exports = object;
