require('dotenv').config();
const log4js = require('log4js');
const express = require('express');
const router = require('./src/routes');
const bodyParser = require('body-parser');
const db = require('./src/utils/DbConnection');
const { PREFIX } = require('./src/config/AppConfig');
const { ErrorHandler } = require('./src/utils/ErrorHandler');
const authMiddleware = require('./src/utils/AuthMiddleware');

const { PORT, API_KEY } = process.env;
const logger = log4js.getLogger('prueba-tyba-ms');

authMiddleware.setApiKey(API_KEY);
const app = express();
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(PREFIX, router);
app.use(ErrorHandler);

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  logger.error(reason.stack);
});

app.listen(PORT, () => {
  logger.info(`Server running on port: ${PORT}`);
  db.migrate.latest();
});

module.exports = app;
