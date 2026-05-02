const logger = require("./logger");

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
    code = "SUCCESS",
    messageDev = "Operation successful",
    messageUser = "Permintaan berhasil diproses",
    data = null,
    error,
  },
) => {
  const req = res.req; // Mengambil object request kembali

  const responseData = {
    status,
    code,
    message_dev: process.env.NODE_ENV !== "production" ? messageDev : "",
    message_user: messageUser,
    data,
    request_id: req.id || "",
    timestamp: new Date().toISOString(),
  };

  const logData = {
    ...responseData,
    user: req.user ? { id: req.user.id, username: req.user.username, role: req.user.role } : null,
  };

  //  Log otomatis berdasarkan status code
  if (status >= 400) {
    logger.error({ ...logData, body: req.body, error }, `API Error: ${messageDev}`);
  } else {
    logger.info(logData, `API Success: ${messageDev}`);
  }

  return res.status(status).json(responseData);
};

module.exports = responseHandler;
