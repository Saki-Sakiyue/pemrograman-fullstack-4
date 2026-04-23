// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/database'); // Manggil file koneksi DB lu
const { errorHandler } = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

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

// Error handling middleware (harus di paling akhir)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(` Server jalan di port http://localhost:${PORT}`);
});