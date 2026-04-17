const db = require("../config/database");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query("SELECT id, username, email, role, created_at FROM users WHERE id = ?", [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "User tidak ditemukan." });
    }

    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ success: false, message: "Username dan Email wajib diisi." });
    }

    await db.query("UPDATE users SET username = ?, email = ? WHERE id = ?", [username, email, userId]);

    res.status(200).json({ success: true, message: "Profil berhasil diperbarui!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};

module.exports = { getProfile, updateProfile };
