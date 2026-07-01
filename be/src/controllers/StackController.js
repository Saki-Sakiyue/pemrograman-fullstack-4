const db = require('../config/database');
const responseHandler = require('../utils/responseHandler');

class StackController {
  async index(req, res) {
    try {
      const [rows] = await db.query('SELECT id, name, icon_url FROM stacks ORDER BY name ASC');

      return responseHandler(res, {
        status: 200,
        messageDev: 'Stacks fetched successfully',
        messageUser: 'Daftar stack berhasil dimuat.',
        data: rows,
      });
    } catch (error) {
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'An error occurred while fetching stacks',
        messageUser: 'Terjadi kesalahan saat memuat stack.',
        error,
      });
    }
  }
}

const object = new StackController();
module.exports = object;
