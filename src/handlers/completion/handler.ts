
import {Op as SequelizeOperators} from 'sequelize';

import {Subscription, User} from '../../db/db';
import {ErrorOptions} from '../../model/ErrorOptions';
import {generateGrogCompletion} from '../../services/grog-ai/completion';
import {promptTemplates} from '../../services/grog-ai/promptTemplates';
import {formatJSONResponse} from '../../utils/api-gateway';
import {errorResponse, handleCriticalError} from '../../utils/error';
import {middyfy} from '../../utils/lambda';
import {getFunctionLogger} from '../../utils/logger';

const logger = getFunctionLogger();

const createCompletion = async (event: any) => {
  const debugInfo = {};
  const body = JSON.parse(event.body) as { input: string, userId: string };
  const input = body.input.slice(0, 1500).trim();
  const userId = body.userId;
  logger.info({userId, id: event.requestContext?.requestId || 'unknown', body}, 'START');

  if (!userId) return errorResponse(400, ErrorOptions.bodyWrongFormat, 'Missing sessionId in body');
  if (!input) return errorResponse(400, ErrorOptions.bodyWrongFormat, 'Missing or empty input in body');

  const user = await User.findByPk(userId);
  if (!user) return errorResponse(500, ErrorOptions.userNotFound, 'user not found');

  const subscription = await Subscription.findOne({where: {userId: user.id, expiresAt: {[SequelizeOperators.gte]: new Date()}}});
  if (!subscription) return errorResponse(402, ErrorOptions.subscriptionExpired, 'Subscription expired');

  try {
    const generatedAIText = await generateGrogCompletion([
      {content: promptTemplates.systemPrompt(), role: 'system'},
      {content: promptTemplates.userExampleResponse1(), role: 'user'},
      {content: promptTemplates.assistantExampleResponse1(), role: 'assistant'},
      {content: input, role: 'user'}
    ], user, debugInfo);

    logger.info({id: event.requestContext.requestId, userId, debugInfo}, 'END');
    return formatJSONResponse(200, {
      message: generatedAIText,
      debugInfo: debugInfo,
    });
  } catch (err) {
    return handleCriticalError(userId, err, event);
  }
};

export const CreateCompletion = middyfy(createCompletion);
