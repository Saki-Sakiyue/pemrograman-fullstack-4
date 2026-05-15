const crypto = require('crypto');

const requestId = (req, res, next) => {
  // Gunakan ID dari header jika ada (dari FE), jika tidak buat baru
  const reqId = req.headers['x-request-id'] || crypto.randomUUID();
  req.id = reqId;
  res.setHeader('x-request-id', reqId); // Kirim kembali ke header response
  next();
};

module.exports = requestId;
