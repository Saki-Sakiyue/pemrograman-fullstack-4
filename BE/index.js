// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/database'); // Manggil file koneksi DB lu

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing JSON
app.use(express.json());
app.use(cors());

// Import Router yang udah kita buat
const templateRouter = require('./src/routes/templateRouter');
const authRouter = require('./src/routes/authRouter');

// Gunakan router tersebut di endpoint /templates
app.use('/templates', templateRouter);
app.use('/api/templates', templateRouter);
app.use('/api/auth', authRouter);

// Start Server
app.listen(PORT, () => {
    console.log(` Server jalan di port http://localhost:${PORT}`);
});