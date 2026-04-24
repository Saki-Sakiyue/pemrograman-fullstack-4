// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pinoHttp = require("pino-http");

// Import internal modules
const db = require("./src/config/database");
const requestId = require("./src/middleware/requestId");
const logger = require("./src/utils/logger");
const router = require("./src/routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

// 1. MIDDLEWARE REQUEST ID
app.use(requestId);

// 2. LOGGER
app.use(
  pinoHttp({
    logger,
    genReqId: req => req.id,
  }),
);

// 3. BODY PARSER & CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. ROUTES
app.use(router);

// Start Server
app.listen(PORT, () => {
  console.log(` Server jalan di port http://localhost:${PORT}`);
});
