const db = require("../config/database");
const logger = require("../utils/logger");
const responseHandler = require("../utils/responseHandler");

class ReportController {
  async post(req, res) {
    try {
      const { template_id, reason } = req.body;

      // Validasi Input Dasar
      if (!template_id || !reason || reason.trim() === "") {
        return responseHandler(res, {
          status: 400,
          code: "ERR_VALIDATION",
          messageDev: "Validation failed: missing template_id or reason",
          messageUser: "Template ID dan alasan pelaporan wajib diisi.",
        });
      }

      // Cek Sesi User (Pengaman tambahan dari authMiddleware)
      if (!req.user || !req.user.id) {
        return responseHandler(res, {
          status: 401,
          code: "ERR_UNAUTHORIZED",
          messageDev: "No user object in request",
          messageUser: "Sesi Anda telah berakhir, silakan login kembali.",
        });
      }

      // Pastikan template yang dilaporkan tersedia dan aktif
      // Mengikuti standar Soft Delete & Visibility
      const checkTemplateSql = `
        SELECT id FROM templates 
        WHERE id = ? AND deleted_at IS NULL AND is_active = true
      `;
      // db.query mengembalikan array, ambil index pertama [rows]
      const [templates] = await db.query(checkTemplateSql, [template_id]);

      if (templates.length === 0) {
        return responseHandler(res, {
          status: 404,
          code: "ERR_NOT_FOUND",
          messageDev: "Template not found or inactive",
          messageUser: "Template tidak ditemukan atau sudah tidak aktif.",
        });
      }

      // Insert data laporan ke database
      const insertSql = `
        INSERT INTO reports (user_id, template_id, reason, status, created_at) 
        VALUES (?, ?, ?, 'pending', NOW())
      `;
      
      const [result] = await db.query(insertSql, [
        req.user.id, 
        template_id, 
        reason.trim()
      ]);

      return responseHandler(res, {
        status: 201,
        messageDev: "Report created successfully",
        messageUser: "Laporan berhasil dikirim. Terima kasih atas kontribusi Anda!",
        data: { 
            report_id: result.insertId, 
            template_id 
        },
      });

    } catch (error) {
      logger.error({ err: error.message, body: req.body }, "Error in ReportController.post");
      return responseHandler(res, {
        status: 500,
        code: "ERR_INTERNAL_SERVER",
        messageDev: "An error occurred while creating report",
        messageUser: "Terjadi kesalahan saat memproses laporan. Silakan coba lagi.",
      });
    }
  }
}

// Export instansiasi class agar sesuai dengan pola controller lainnya
const object = new ReportController();
module.exports = object;