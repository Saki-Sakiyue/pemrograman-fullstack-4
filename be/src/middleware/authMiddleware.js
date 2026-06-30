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
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_jwt_secret_change_me');
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

const verifyAdmin = (req, res, next) => {
  if (!req.user) {
    return responseHandler(res, {
      status: 401,
      code: 'ERR_UNAUTHORIZED',
      messageDev: 'User not authenticated',
      messageUser: 'Unauthorized',
    });
  }

  if (req.user.role !== 'admin') {
    return responseHandler(res, {
      status: 403,
      code: 'ERR_FORBIDDEN',
      messageDev: 'User does not have admin role',
      messageUser: 'Akses ditolak. Hanya admin yang dapat mengakses resource ini.',
    });
  }

  next();
};

module.exports = {
  verifyToken,
  verifyAdmin,
};
