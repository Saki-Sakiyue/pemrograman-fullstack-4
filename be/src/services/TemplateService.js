const db = require('../config/database');

class TemplateService {
  async updatePopularityScore(templateId) {
    const sql = `
    UPDATE templates
    SET popularity_score = (
      COALESCE((SELECT COUNT(*) FROM upvotes WHERE template_id = ?), 0) * 3 +
      COALESCE((SELECT COUNT(*) FROM bookmarks WHERE template_id = ?), 0) * 2 +
      COALESCE(download_count, 0) * 1
    )
    WHERE id = ?
  `;
    // Eksekusi atomic update untuk skor
    await db.execute(sql, [templateId, templateId, templateId]);
  }
}
const object = new TemplateService();
module.exports = object;
