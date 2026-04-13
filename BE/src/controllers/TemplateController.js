const db = require('../config/database'); 

// 1. Ubah nama fungsinya dari TemplateController jadi getActiveTemplates
const getActiveTemplates = async (req, res) => {
    try {
        const sql = `
            SELECT id, title, description, created_at 
            FROM templates 
            WHERE deleted_at IS NULL AND is_active = ?
        `;
        
        const [rows] = await db.query(sql, [true]);

        res.status(200).json({
            success: true,
            data: rows
        });
        
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Terjadi kesalahan pada server.' 
        });
    }
};

const createTemplate = async (req, res) => {
    try {
        res.status(201).json({
            success: true,
            message: 'Template berhasil ditambahkan (ini cuma test)'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// 2. Jangan lupa update nama yang di-export
module.exports = {
    getActiveTemplates, 
    createTemplate
};