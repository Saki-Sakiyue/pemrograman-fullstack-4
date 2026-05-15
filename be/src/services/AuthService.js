const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
const BCRYPT_ROUNDS = 10;

const isBcryptHash = value => typeof value === 'string' && value.startsWith('$2');

const hashPassword = async rawPassword => {
  try {
    return await bcrypt.hash(rawPassword, BCRYPT_ROUNDS);
  } catch (error) {
    throw new Error('Gagal hash password');
  }
};

const comparePassword = async (rawPassword, storedHash) => {
  if (!isBcryptHash(storedHash)) {
    return rawPassword === storedHash;
  }
  return bcrypt.compare(rawPassword, storedHash);
};

/**
 * Generate JWT Token dengan payload yang sudah di-lock (Strict Payload)
 * @param {Object} params
 * @param {number|string} params.id - User ID
 * @param {string} params.username - Username
 * @param {string} params.role - Role user ('admin' atau 'user')
 */
const generateToken = ({ id, username, role }) => {
  // Validasi minimal (Mencegah dev lupa mengirim ID atau Role)
  if (!id || !role) {
    throw new Error('Generate Token Error: Payload "id" dan "role" wajib diisi!');
  }

  // Kita BUNGKUS ULANG secara eksplisit.
  // Kalau ada dev yang iseng mengirim { id: 1, avatar_url: '...' }, avatar_url-nya akan terbuang.
  const strictPayload = {
    id,
    username,
    role,
  };

  return jwt.sign(strictPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};
