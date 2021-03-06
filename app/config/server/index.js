const http = require('http');
const express = require('express');

const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = require('../environment');
const { generateRoutes } = require('./routes');
const logger = require('../../utils/logger');

function start() {
  const app = express();
  const bodyParserJson = bodyParser.json({
    limit: '5mb',
  });
  const bodyParserUrl = bodyParser.urlencoded({
    limit: '5mb',
    extended: true,
    parameterLimit: 50000,
  });

  // routes
  app.use(compression());
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParserJson);
  app.use(bodyParserUrl);
  generateRoutes(app);

  const server = http.createServer(app);

  server.listen(PORT);

  logger.log({
    level: 'info',
    message: `Your server is listening on port ${PORT} (http://localhost:${PORT})`,
  });
}

module.exports = {
  start,
};
