import {APIGatewayProxyEvent} from 'aws-lambda';

import {formatJSONResponse} from './api-gateway';
import {getFunctionLogger} from './logger';
import {ErrorOptions} from '../model/ErrorOptions';


export const errorResponse = (statusCode, errorOption, message) => formatJSONResponse(statusCode, {name: errorOption, message});

export const handleCriticalError = (userId: string, err: any, event: APIGatewayProxyEvent) => {
  const logger = getFunctionLogger();
  logger.error({id: event.requestContext?.requestId || 'unknown', userId, err}, 'CRITICAL ERROR');
  if (err?.name in ErrorOptions) {
    return formatJSONResponse(500, err);
  } else return formatJSONResponse(500, err);
};
