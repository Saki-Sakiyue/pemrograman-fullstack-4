const logger = require('./logger');

/* 
 RESPONSE HANDLER
 Standarisasi response API untuk semua endpoint, sehingga memudahkan dalam pengelolaan dan konsistensi dalam pengembangan aplikasi.
*/

/**
 * @param {Object} res - Express Response Object
 * @param {Object} params - Detail data response
 */
const responseHandler = (
  res,
  {
    status = 200,
    code = 'SUCCESS',
    messageDev = 'Operation successful',
    messageUser = 'Permintaan berhasil diproses',
    data = null,
    error,
  }
) => {
  const req = res.req; // Mengambil object request kembali

  const responseData = {
    status,
    code,
    message_dev: process.env.NODE_ENV !== 'production' ? messageDev : '',
    message_user: messageUser,
    data,
    request_id: req.id || '',
    timestamp: new Date().toISOString(),
  };

  const logData = {
    ...responseData,
    user: req.user
      ? { id: req.user.id, username: req.user.username, role: req.user.role }
      : null,
  };

  let formattedError = null;
  if (error) {
    if (error instanceof Error) {
      formattedError = {
        name: error.name,
        message: error.message,
        code: error.code, // Berguna untuk menangkap error code MySQL (misal: ER_DUP_ENTRY)
        sqlMessage: error.sqlMessage, // Pesan error asli dari MySQL
        sql: error.sql, // Query SQL yang memicu error (opsional, hati-hati jika query mengandung data sensitif)
        stack: error.stack, // Trace lokasi error di file (sangat penting untuk debugging)
      };
    } else {
      // Jika error yang dilempar bukan berupa objek Error standar (misal throw "string")
      formattedError = error;
    }
  }

  //  Log otomatis berdasarkan status code
  if (status >= 400) {
    logger.error(
      { ...logData, body: req.body, error: formattedError },
      `API Error: ${messageDev}`
    );
  } else {
    logger.info(logData, `API Success: ${messageDev}`);
  }

  return res.status(status).json(responseData);
};

module.exports = responseHandler;
