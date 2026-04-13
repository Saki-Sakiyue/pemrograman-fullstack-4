const db = require('../config/database');
const { comparePassword, generateToken } = require('../services/AuthService');
const { validateLoginPayload } = require('../validators/authValidator');

const login = async (req, res) => {
    try {
        const validation = validateLoginPayload(req.body);

        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: validation.message
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
            return res.status(401).json({
                success: false,
                message: 'Username/email atau password salah.'
            });
        }

        const user = rows[0];
        const isPasswordValid = await comparePassword(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Username/email atau password salah.'
            });
        }

        const token = generateToken({
            id: user.id,
            username: user.username,
            role: user.role
        });

        return res.status(200).json({
            success: true,
            message: 'Login berhasil.',
            data: {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    avatar_url: user.avatar_url
                }
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.'
        });
    }
};

const logout = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Logout berhasil.'
    });
};

module.exports = {
    login,
    logout
};
