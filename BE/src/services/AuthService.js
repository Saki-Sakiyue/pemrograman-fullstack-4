const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
const BCRYPT_ROUNDS = 10;

const isBcryptHash = (value) => typeof value === 'string' && value.startsWith('$2');

const hashPassword = async (rawPassword) => {
    try {
        return await bcrypt.hash(rawPassword, BCRYPT_ROUNDS);
    } catch (error) {
        throw new Error('Gagal hash password');
    }
};

const comparePassword = async (rawPassword, storedHash) => {
    // Compatibility mode for existing seeded non-bcrypt values.
    if (!isBcryptHash(storedHash)) {
        return rawPassword === storedHash;
    }

    return bcrypt.compare(rawPassword, storedHash);
};

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

module.exports = {
    hashPassword,
    comparePassword,
    generateToken
};
