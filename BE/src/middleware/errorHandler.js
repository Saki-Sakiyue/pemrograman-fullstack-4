// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Database errors
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
            success: false,
            message: 'Data sudah terdaftar.'
        });
    }

    // Default error response
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Terjadi kesalahan pada server.';

    return res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { error: err })
    });
};

module.exports = {
    errorHandler
};
