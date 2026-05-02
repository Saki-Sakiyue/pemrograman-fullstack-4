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
  
  async download (req, res) {
    const templateId = req.params.id;

    try {
      // Query Raw SQL dengan aturan soft delete dan visibilitas
      const query = `
        UPDATE templates 
        SET download_count = download_count + 1 
        WHERE id = ? 
          AND deleted_at IS NULL 
          AND is_active = TRUE
      `;
      
      // Eksekusi query (contoh menggunakan mysql2 promise)
      const [result] = await db.execute(query, [templateId]);

      // Validasi: Jika tidak ada baris yang terpengaruh (ID salah/dihapus/tidak aktif)
      if (result.affectedRows === 0) {
        return res.status(404).json({ 
          success: false,
          message: "Template tidak ditemukan, tidak aktif, atau sudah dihapus." 
        });
      }

      // Berhasil ditambah
      return res.status(200).json({ 
        success: true,
        message: "Download counter berhasil ditambahkan." 
      });

    } catch (error) {
      console.error("Error updating download count:", error);
      return res.status(500).json({ 
        success: false,
        message: "Terjadi kesalahan pada server saat menghitung download." 
      });
    }
  }
  async update (req, res) {
    const templateId = req.params.id;
    // Mengambil data yang dikirim dari Postman/Frontend
    const { title, description, category_id, demo_url, source_url } = req.body;

    try {
      // 1. Validasi Dasar: Pastikan kolom wajib terisi
      if (!title || !category_id) {
        return res.status(400).json({
          success: false,
          message: "Title dan Category ID wajib diisi."
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
        return res.status(404).json({
          success: false,
          message: "Update gagal: Template tidak ditemukan, tidak aktif, atau sudah dihapus."
        });
      }

      // 5. Kembalikan Respons Sukses
      return res.status(200).json({
        success: true,
        message: "Data template berhasil diperbarui!"
      });

    } catch (error) {
      console.error("Error updating template:", error);
      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan internal pada server saat melakukan update."
      });
    }
  }
}

const object = new TemplateController();
module.exports = object;
