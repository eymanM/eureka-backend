import pino from 'pino';
import {pinoLambdaDestination, PinoLogFormatter} from 'pino-lambda';

const customLevels = {
  emerg: 70,
  crit: 60,
  error: 50,
  warn: 40,
  info: 30,
  debug: 20,
};

const logger = pino({
  base: undefined,
  level: process.env.LOG_LEVEL || 'error',
  customLevels,
  useOnlyCustomLevels: true,
  formatters: {
    level: (label) => {
      return {level: label};
    },
  },
},
pinoLambdaDestination({formatter: new PinoLogFormatter()}));

export const getFunctionLogger = (fProps = {}) => {
  return logger.child({...fProps});
};
