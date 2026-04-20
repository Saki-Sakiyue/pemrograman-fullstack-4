const db = require('../config/database'); 

const getActiveTemplates = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
        const offset = (page - 1) * limit;
        const search = (req.query.search || '').trim();

        const whereClause = search
            ? 'WHERE t.deleted_at IS NULL AND t.is_active = ? AND t.title LIKE ?'
            : 'WHERE t.deleted_at IS NULL AND t.is_active = ?';
        const whereParams = search ? [true, `%${search}%`] : [true];

        const sql = `
            SELECT
                t.id,
                t.title,
                t.description,
                t.upload_type,
                t.source_url,
                t.demo_url,
                t.download_count,
                t.popularity_score,
                t.created_at,
                c.name AS category_name,
                u.username AS author
            FROM templates t
            INNER JOIN categories c ON c.id = t.category_id
            INNER JOIN users u ON u.id = t.user_id
            ${whereClause}
            ORDER BY t.created_at DESC
            LIMIT ? OFFSET ?
        `;

        const countSql = `
            SELECT COUNT(*) AS total
            FROM templates t
            ${whereClause}
        `;

        const [rows] = await db.query(sql, [...whereParams, limit, offset]);
        const [countRows] = await db.query(countSql, whereParams);
        const total = countRows[0]?.total || 0;
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            data: rows,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
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

module.exports = {
    getActiveTemplates, 
    createTemplate
};