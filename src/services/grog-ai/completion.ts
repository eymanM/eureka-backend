import Grog from 'groq-sdk';
import {ChatCompletionMessageParam} from 'openai/resources/chat/completions';

import {ResourceUsage, User} from '../../db/db';
import {formatAIText} from '../../utils/textFormatter';

const grog = new Grog({timeout: 8000, maxRetries: 2});

export async function generateGrogCompletion(messages: ChatCompletionMessageParam[], user: User, debugInfo: object) {
  debugInfo['model'] = process.env.GROG_AI_MODEL;
  debugInfo['AImessages'] = messages;
  const completion = await grog.chat.completions.create({
    model: process.env.GROG_AI_MODEL,
    messages: messages as {content: string, role: string}[],
    temperature: 0.6,
    max_tokens: 8000,
    stream: false,
  });
  await ResourceUsage.create({userId: user.id, resourceType: 'LLM_input_tokens', usage: completion.usage.prompt_tokens, metadata: {messages}});
  await ResourceUsage.create({userId: user.id, resourceType: 'LLM_output_tokens', usage: completion.usage.completion_tokens, metadata: {usage: completion.usage}});
  const message = completion.choices[0]?.message?.content || '';
  const formattedCompletion = formatAIText(message);
  debugInfo['completion'] = message;
  debugInfo['formattedCompletion'] = formattedCompletion;
  debugInfo['LLMUsage'] = completion.usage;
  return formattedCompletion;
}
