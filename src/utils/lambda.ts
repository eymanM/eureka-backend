import middy from '@middy/core';
import eventNormalizerMiddleware from '@middy/event-normalizer';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';

import {formatJSONResponse} from './api-gateway';
import {getFunctionLogger} from './logger';

export const logger = getFunctionLogger();

export const middyfy = (handler) => {
  const wrapped = async (e: any) => {
    try {
      return await handler(e);
    } catch (err) {
      logger.error({err}, 'Fatal error');
      return formatJSONResponse(500, {
        stack: err.stack, message: err.message, timestamp: new Date(Date.now()).toUTCString()
      });
    }
  };

  return middy(wrapped)
    .use(eventNormalizerMiddleware())
    .use(httpErrorHandler({logger: true, fallbackMessage: 'Timeout'}))
    .use(cors({
      disableBeforePreflightResponse: false,
      credentials: true,
      methods: 'GET,POST',
      headers: '*',
    }));
};

