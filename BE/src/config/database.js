// config/database.js
const mysql = require('mysql2/promise'); // Kita pakai versi promise agar bisa async/await
require('dotenv').config();

// Membuat Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0,
    namedPlaceholders: true 
});

// Test koneksi saat aplikasi pertama kali jalan
pool.getConnection()
    .then(connection => {
        console.log('Database MySQL berhasil terkoneksi (Pool created)!');
        connection.release(); // Selalu release koneksi kembali ke pool
    })
    .catch(err => {
        console.error('Gagal koneksi ke database:', err.message);
    });

module.exports = pool;