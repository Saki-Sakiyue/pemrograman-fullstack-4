const db = require('../config/database');
const responseHandler = require('../utils/responseHandler');

class TagController {
  async index(req, res) {
    try {
      const [rows] = await db.query('SELECT id, name, slug FROM tags ORDER BY name ASC');

      return responseHandler(res, {
        status: 200,
        messageDev: 'Tags fetched successfully',
        messageUser: 'Daftar tag berhasil dimuat.',
        data: rows,
      });
    } catch (error) {
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'An error occurred while fetching tags',
        messageUser: 'Terjadi kesalahan saat memuat tag.',
        error,
      });
    }
  }
}

const object = new TagController();
module.exports = object;
