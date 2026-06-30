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

/**
 * Optional Authentication Middleware
 *
 * Verifies JWT token if present, but doesn't require it.
 * - If token exists and valid → sets req.user
 * - If token doesn't exist → continues without req.user
 *
 * Use this for endpoints that work for both authenticated and unauthenticated users,
 * but have different behavior based on authentication (e.g., admin features).
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  // No token provided - continue as unauthenticated user
  if (!authHeader || scheme !== 'Bearer' || !token) {
    return next();
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

module.exports = {
  verifyToken,
  verifyAdmin,
  optionalAuth,
};
