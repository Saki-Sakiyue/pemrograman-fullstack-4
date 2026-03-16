const express = require('express');
const templateRouter = require('./routes/templateRouter');

const server = express();
server.use(express.json());
server.use(express.urlencoded());

server.use('/api', templateRouter);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = server;