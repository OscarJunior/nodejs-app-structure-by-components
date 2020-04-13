/**
 *
 * https://github.com/goldbergyoni/nodebestpractices#-27-use-a-mature-logger-to-increase-error-visibility
 */
const { createLogger, format, transports } = require('winston');
const { NODE_ENV } = require('./environment');

function init() {
  const logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: { service: 'nodejs-good-practices' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ],
  });

  //
  // If we're not in production then **ALSO** log to the `console`
  // with the colorized simple format.
  //
  if (NODE_ENV === 'dev') {
    logger.add(
      new transports.Console({
        format: format.json(),
      })
    );
  }

  /**
   * https://github.com/goldbergyoni/nodebestpractices#-35-name-your-functionshttps://github.com/goldbergyoni/nodebestpractices#-35-name-your-functions
   */
  return function getLogger() {
    return logger;
  };
}

module.exports = init()();
