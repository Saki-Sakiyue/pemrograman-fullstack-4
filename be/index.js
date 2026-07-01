// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
// const pinoHttp = require('pino-http'); // Uncomment jika ingin mengaktifkan HTTP request logging

// Import internal modules
const db = require('./src/config/database');
const requestId = require('./src/middleware/requestId');
const logger = require('./src/utils/logger');
const router = require('./src/routes/api');
const swaggerSpec = require('./src/config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. MIDDLEWARE REQUEST ID
app.use(requestId);

// 2. LOGGER
// app.use(
//   pinoHttp({
//     logger,
//     genReqId: req => req.id,
//   }),
// );

// 3. BODY PARSER & CORS
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// 4. API DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 5. ROUTES
app.use(router);

// Start Server
app.listen(PORT, () => {
  console.log(` Server jalan di port http://localhost:${PORT}`);
});
