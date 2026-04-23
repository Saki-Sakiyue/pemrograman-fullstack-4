const db = require('../config/database'); 
const { validateCreateTemplate } = require('../validators/templateValidator');

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
        const validation = validateCreateTemplate(req.body);

        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized. Anda harus login terlebih dahulu.'
            });
        }

        // Check if category exists
        const { category_id } = req.body;
        const categorySql = `SELECT id FROM categories WHERE id = ? LIMIT 1`;
        const [categoryRows] = await db.query(categorySql, [category_id]);

        if (categoryRows.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Kategori tidak ditemukan.'
            });
        }

        const { title, description, upload_type, source_url, demo_url } = req.body;
        const userId = req.user.id;

        const insertSql = `
            INSERT INTO templates (
                title, 
                description, 
                upload_type, 
                source_url, 
                demo_url,
                category_id, 
                user_id, 
                is_active, 
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `;

        await db.query(insertSql, [
            title.trim(),
            description.trim(),
            upload_type,
            source_url || null,
            demo_url || null,
            category_id,
            userId,
            true
        ]);

        return res.status(201).json({
            success: true,
            message: 'Template berhasil ditambahkan.'
        });
    } catch (error) {
        console.error('Create Template Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Terjadi kesalahan pada server saat membuat template.' 
        });
    }
};

// 2. Jangan lupa update nama yang di-export
module.exports = {
    getActiveTemplates, 
    createTemplate
};