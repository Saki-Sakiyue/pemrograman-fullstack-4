const jwt = require('jsonwebtoken');
const responseHandler = require('../utils/responseHandler');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return responseHandler(res, {
      status: 401,
      code: 'ERR_UNAUTHORIZED',
      messageDev: 'Missing or invalid authorization header',
      messageUser: 'Unauthorized',
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'dev_jwt_secret_change_me'
    );
    req.user = decoded;
    next();
  } catch (error) {
    return responseHandler(res, {
      status: 401,
      code: 'ERR_INVALID_TOKEN',
      messageDev: 'JWT verification failed',
      messageUser: 'Token tidak valid atau sudah expired.',
      error,
    });
  }
};

module.exports = {
  verifyToken,
};
