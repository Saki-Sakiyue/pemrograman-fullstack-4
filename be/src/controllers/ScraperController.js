const db = require('../config/database');
const logger = require('../utils/logger');
const responseHandler = require('../utils/responseHandler');
const ScraperService = require('../services/ScraperService');

const { chunkArray } = require('../utils/chunker');

class ScraperController {
  async scrapeTemplate(req, res) {
    const connection = await db.getConnection();
    const userId = req.user.id;
    const defaultCategoryId = 2;

    const startTime = Date.now();
    try {
      const scrapeResults = await Promise.all([
        ScraperService.scrapeHtml5Up(),
        ScraperService.scrapeHtmlRev(),
      ]);

      // Response Creator
      let insertedTemplatesCount = 0;
      let skippedTemplatesCount = 0;
      let insertedImagesCount = 0;

      // TODO: Simpan hasil scrape ke database jika diperlukan, atau langsung return ke client
      // Jika ingin simpan, pastikan untuk handle duplikasi berdasarkan source_url dan demo_url
      // Gunakan transaction untuk memastikan integritas data jika menyimpan banyak record sekaligus
      await connection.beginTransaction();

      // Membuat chunk untuk batch insert, misalnya 100 per batch
      const chunks = chunkArray(scrapeResults.flat(), 100);
      for (const chunk of chunks) {
        const chunkIdentifiers = chunk.map(t => t.source_identifier);

        // Cek duplikasi berdasarkan source_identifier untuk batch ini
        const [existingRows] = await connection.query(
          `SELECT source_identifier
          FROM templates
          WHERE source_identifier IN (?)`,
          [chunkIdentifiers]
        );
        const existingSet = new Set(existingRows.map(row => row.source_identifier));

        // Filter chunk untuk hanya menyimpan yang belum ada di database
        const newTemplates = chunk.filter(t => !existingSet.has(t.source_identifier));
        skippedTemplatesCount += chunk.length - newTemplates.length; // Hitung yang diskip karena duplikasi
        if (newTemplates.length === 0) continue;
        insertedTemplatesCount += newTemplates.length;

        // Bulk insert hanya untuk template baru
        const templateValues = newTemplates.map(item => [
          userId,
          item.category_id || defaultCategoryId,
          item.title,
          item.description,
          item.upload_type,
          item.source_url,
          item.demo_url,
          item.download_url,
          item.download_count,
          item.popularity_score,
          item.source_identifier,
        ]);
        await connection.query(
          `INSERT INTO templates 
          (user_id, category_id, title, description, upload_type, source_url, demo_url, download_url, download_count, popularity_score, source_identifier)
          VALUES ?`,
          [templateValues]
        );

        // == Batch insert images
        // Mengambil id template menggunakan identifier
        const newIdentifiers = newTemplates.map(t => t.source_identifier);
        const [rows] = await connection.query(
          `SELECT id, source_identifier
          FROM templates
          WHERE source_identifier IN (?)`,
          [newIdentifiers]
        );

        // Membuat map untuk lookup id berdasarkan source_identifier
        const templateMap = new Map(rows.map(row => [row.source_identifier, row.id]));

        // Menyiapkan data untuk batch insert images
        const imageValues = [];
        newTemplates.forEach(template => {
          const templateId = templateMap.get(template.source_identifier);

          if (!templateId || !template.image_urls?.length) return;

          template.image_urls.forEach((imgUrl, index) => {
            imageValues.push([templateId, imgUrl, index === 0 ? 1 : 0]);
          });
        });
        if (imageValues.length === 0) continue; // Skip jika tidak ada image untuk diinsert
        insertedImagesCount += imageValues.length;

        // Batch insert images
        await connection.query(
          `INSERT INTO template_images (
            template_id,
            image_url,
            is_primary
          ) VALUES ?`,
          [imageValues]
        );

        const stackValues = [];
        const tagValues = [];

        newTemplates.forEach(template => {
          const templateId = templateMap.get(template.source_identifier);
          if (!templateId) return;

          const stackIds = Array.isArray(template.template_stacks) ? template.template_stacks : [];
          const tagIds = Array.isArray(template.template_tags) ? template.template_tags : [];

          stackIds.forEach(stackId => stackValues.push([templateId, stackId]));
          tagIds.forEach(tagId => tagValues.push([templateId, tagId]));
        });

        if (stackValues.length > 0) {
          await connection.query(
            `INSERT IGNORE INTO template_stacks (template_id, stack_id)
            VALUES ?`,
            [stackValues]
          );
        }

        if (tagValues.length > 0) {
          await connection.query(
            `INSERT IGNORE INTO template_tags (template_id, tag_id)
            VALUES ?`,
            [tagValues]
          );
        }
      }

      await connection.commit();
      const durationMs = Date.now() - startTime;

      return responseHandler(res, {
        status: 200,
        messageDev: 'Scraper fetched successfully',
        messageUser: 'Scraper berhasil dijalankan.',
        data: {
          source: [
            'HTML5 UP',
            'HTML REV'
          ],

          summary: {
            total_scraped: scrapeResults.length,
            inserted_templates: insertedTemplatesCount,
            skipped_templates: skippedTemplatesCount,
            inserted_images: insertedImagesCount,
            processed_chunks: chunks.length,
            duration_ms: durationMs,
          },
        },
      });
    } catch (error) {
      await connection.rollback();
      logger.error({ err: error.message, stack: error.stack }, 'Error in getScraper');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'An error occurred while fetching scraper',
        messageUser: 'Terjadi kesalahan saat menjalankan scraper. Silakan coba lagi.',
      });
    } finally {
      connection.release();
    }
  }
}

const object = new ScraperController();
module.exports = object;
