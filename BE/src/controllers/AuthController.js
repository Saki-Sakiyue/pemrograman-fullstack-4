const db = require('../config/database');
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require('../services/AuthService');
const {
  validateLoginPayload,
  validateRegisterPayload,
} = require('../validators/authValidator');
const logger = require('../utils/logger');
const responseHandler = require('../utils/responseHandler');

class AuthController {
  async login(req, res) {
    try {
      const validation = validateLoginPayload(req.body);

      if (!validation.valid) {
        return responseHandler(res, {
          status: 400,
          code: 'ERR_VALIDATION',
          messageDev: 'Login payload validation failed',
          messageUser: validation.message,
        });
      }

      const identifier = req.body.identifier.trim();
      const password = req.body.password;

      const sql = `
            SELECT id, username, email, password_hash, role, avatar_url
            FROM users
            WHERE deleted_at IS NULL AND (email = ? OR username = ?)
            LIMIT 1
        `;

      const [rows] = await db.query(sql, [identifier, identifier]);

      if (rows.length === 0) {
        return responseHandler(res, {
          status: 401,
          code: 'ERR_INVALID_CREDENTIALS',
          messageDev: 'User not found or deleted',
          messageUser: 'Username/email atau password salah.',
        });
      }

      const user = rows[0];
      const isPasswordValid = await comparePassword(
        password,
        user.password_hash
      );

      if (!isPasswordValid) {
        return responseHandler(res, {
          status: 401,
          code: 'ERR_INVALID_CREDENTIALS',
          messageDev: 'Password mismatch',
          messageUser: 'Username/email atau password salah.',
        });
      }

      const token = generateToken({
        id: user.id,
        username: user.username,
        role: user.role,
      });

      // Response sukses dengan format standar [cite: 940, 962]
      return responseHandler(res, {
        status: 200,
        messageDev: 'Login successful',
        messageUser: 'Login berhasil.',
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            avatar_url: user.avatar_url,
          },
        },
      });
    } catch (error) {
      logger.error({ err: error.message, stack: error.stack }, 'Login Error');
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'An error occurred during login',
        messageUser: 'Terjadi kesalahan saat login. Silakan coba lagi.',
      });
    }
  }

  async logout(req, res, next) {
    return responseHandler(res, {
      status: 200,
      messageDev: 'User logged out',
      messageUser: 'Logout berhasil.',
    });
  }

  async register(req, res, next) {
    try {
      const validation = validateRegisterPayload(req.body);

      if (!validation.valid) {
        return responseHandler(res, {
          status: 400,
          code: 'ERR_VALIDATION',
          messageDev: 'Register payload validation failed',
          messageUser: validation.message,
        });
      }

      const { username, email, password } = req.body;
      const trimmedUsername = username.trim();
      const trimmedEmail = email.trim();

      const checkSql = `SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1`;
      const [existingUser] = await db.query(checkSql, [
        trimmedEmail,
        trimmedUsername,
      ]);

      if (existingUser.length > 0) {
        return responseHandler(res, {
          status: 400,
          code: 'ERR_DUPLICATE_ENTRY',
          messageDev: 'Email or username already exists',
          messageUser: 'Email atau Username sudah terdaftar.',
        });
      }

      const passwordHash = await hashPassword(password);

      const insertSql = `
            INSERT INTO users (username, email, password_hash, role)
            VALUES (?, ?, ?, ?)
        `;
      await db.query(insertSql, [
        trimmedUsername,
        trimmedEmail,
        passwordHash,
        'user',
      ]);

      return responseHandler(res, {
        status: 201,
        messageDev: 'User registered successfully',
        messageUser: 'Registrasi berhasil. Silakan login.',
      });
    } catch (error) {
      return responseHandler(res, {
        status: 500,
        code: 'ERR_INTERNAL_SERVER',
        messageDev: 'An error occurred during registration',
        messageUser: 'Terjadi kesalahan saat registrasi. Silakan coba lagi.',
        error,
      });
    }
  }
}
const object = new AuthController();

module.exports = object;
