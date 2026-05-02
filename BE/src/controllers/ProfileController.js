const db = require("../config/database");
const { validateUpdateProfile } = require("../validators/profileValidator");
const logger = require("../utils/logger");
const responseHandler = require("../utils/responseHandler");
const { hashPassword } = require("../services/AuthService");

class ProfileController {
  async getProfile(req, res) {
    try {
      // Mengambil profile berdasarkan id user yang sudah terautentikasi bukan berdasarkan parameter id di URL untuk keamanan
      const userId = req.user.id;

      const sql = `
        SELECT 
          id, username, email, role, avatar_url, created_at, updated_at
        FROM users
        WHERE id = ? AND deleted_at IS NULL
      `;
      const [rows] = await db.query(sql, [userId]);

      if (rows.length === 0) {
        return responseHandler(res, {
          status: 404,
          code: "ERR_PROFILE_NOT_FOUND",
          messageDev: `Profile with user ID ${userId} not found`,
          messageUser: "Profil tidak ditemukan.",
        });
      }

      const profile = rows[0];
      return responseHandler(res, {
        status: 200,
        messageDev: "Profile fetched successfully",
        messageUser: "Profil berhasil dimuat.",
        data: profile,
      });
    } catch (error) {
      logger.error({ err: error.message, stack: error.stack }, "Error in getProfile");
      return responseHandler(res, {
        status: 500,
        code: "ERR_INTERNAL_SERVER",
        messageDev: "An error occurred while fetching profile",
        messageUser: "Terjadi kesalahan saat memuat profil. Silakan coba lagi.",
      });
    }
  }

  async updateProfile(req, res) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return responseHandler(res, {
          status: 400,
          code: "ERR_NO_DATA",
          messageDev: "No data provided for update",
          messageUser: "Tidak ada data yang diberikan untuk diperbarui.",
        });
      }

      const validation = validateUpdateProfile(req.body);
      if (!validation.valid) {
        return responseHandler(res, {
          status: 400,
          code: "ERR_VALIDATION",
          messageDev: "Validation failed",
          messageUser: validation.message,
        });
      }

      const userId = req.user.id;
      const { username, password, avatar_url } = validation.data;
      const hashedPassword = password ? await hashPassword(password) : null;

      // Hanya update field yang disediakan
      const sql = `
        UPDATE users 
        SET username = COALESCE(?, username), 
            password_hash = COALESCE(?, password_hash), 
            avatar_url = COALESCE(?, avatar_url)
        WHERE id = ? AND deleted_at IS NULL
      `;
      const params = [username, hashedPassword, avatar_url, userId];
      const [result] = await db.query(sql, params);
      if (result.affectedRows === 0) {
        return responseHandler(res, {
          status: 404,
          code: "ERR_PROFILE_NOT_FOUND",
          messageDev: `Profile with user ID ${userId} not found for update`,
          messageUser: "Profil tidak ditemukan untuk diperbarui.",
        });
      }

      return responseHandler(res, {
        status: 200,
        messageDev: "Profile updated successfully",
        messageUser: "Profil berhasil diperbarui.",
        data: {
          id: userId,
          username: username || undefined,
          avatar_url: avatar_url || undefined,
        }
      });
    } catch (error) {
      if (error && error.code === "ER_DUP_ENTRY") {
        return responseHandler(res, {
          status: 400,
          code: "ERR_DUPLICATE_ENTRY",
          messageDev: "Username already exists",
          messageUser: "Username sudah digunakan. Silakan pilih username lain.",
        });
      }
      
      return responseHandler(res, {
        status: 500,
        code: "ERR_INTERNAL_SERVER",
        messageDev: "An error occurred while updating profile",
        messageUser: "Terjadi kesalahan saat memperbarui profil. Silakan coba lagi.",
        error,
      });
    }
  }
}

const object = new ProfileController();
module.exports = object;
