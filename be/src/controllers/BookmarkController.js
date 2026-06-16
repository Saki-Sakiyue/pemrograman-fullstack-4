const db = require('../config/database');
const responseHandler = require('../utils/responseHandler');

class BookmarkController {
  async index(req, res) {
    try {
      const userId = req.user.id;

      const sql = `
        SELECT 
          t.id, t.title, t.description, t.upload_type,
          t.source_url, t.demo_url, t.download_count,
          t.popularity_score, t.created_at,
          c.name AS category_name,
          u.username AS author,
          (SELECT image_url FROM template_images WHERE template_id = t.id AND is_primary LIMIT 1) AS thumbnail_url
        FROM bookmarks b
        INNER JOIN templates t ON t.id = b.template_id
        INNER JOIN categories c ON c.id = t.category_id
        INNER JOIN users u ON u.id = t.user_id
        WHERE b.user_id = ? AND t.deleted_at IS NULL AND t.is_active = TRUE
        ORDER BY t.created_at DESC
      `;

      const [rows] = await db.query(sql, [userId]);

      return responseHandler(res, {
        status: 200,
        messageDev: 'Bookmarks fetched successfully',
        messageUser: 'Daftar bookmark berhasil dimuat.',
        data: rows,
      });
    } catch (error) {
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'An error occurred while fetching bookmarks',
        messageUser: 'Terjadi kesalahan saat memuat bookmark.',
        error,
      });
    }
  }
}

const object = new BookmarkController();
module.exports = object;