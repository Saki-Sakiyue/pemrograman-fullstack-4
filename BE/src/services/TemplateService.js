class TemplateService {
  async updatePopularityScore(templateId) {
    const sql = `
    UPDATE templates t
    SET popularity_score = (
      (SELECT COUNT(*) FROM upvotes WHERE template_id = ?) * 3 +
      (SELECT COUNT(*) FROM bookmarks WHERE template_id = ?) * 2 +
      (t.download_count) * 1
    )
    WHERE t.id = ?
  `;
    // Eksekusi atomic update untuk skor
    await db.execute(sql, [templateId, templateId, templateId]);
  }
}
const object = new TemplateService();
module.exports = object;
