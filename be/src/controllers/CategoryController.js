const db = require('../config/database');
const responseHandler = require('../utils/responseHandler');

class CategoryController {
  async index(req, res) {
    try {
      const [rows] = await db.query('SELECT id, name, slug FROM categories ORDER BY name ASC');

      return responseHandler(res, {
        status: 200,
        messageDev: 'Categories fetched successfully',
        messageUser: 'Daftar kategori berhasil dimuat.',
        data: rows,
      });
    } catch (error) {
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'An error occurred while fetching categories',
        messageUser: 'Terjadi kesalahan saat memuat kategori.',
        error,
      });
    }
  }
}

const object = new CategoryController();
module.exports = object;
