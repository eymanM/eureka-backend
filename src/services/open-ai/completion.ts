import OpenAI from 'openai';
import {ChatCompletionMessageParam} from 'openai/resources/chat/completions';

import {User} from '../../db/db';
import {ErrorOptions} from '../../model/ErrorOptions';
import {logger} from '../../utils/lambda';

export async function generateOpenAICompletion(messages: ChatCompletionMessageParam[], user: User) {
  const openai = new OpenAI({timeout: 14000, maxRetries: 2});
  let message: OpenAI.Chat.Completions.ChatCompletion;
  try {
    const {data} = await openai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL,
      messages: messages,
    }).withResponse();
    logger.info({messages, response: data}, 'LLM msgs and response');
    message = data;
  } catch (err) {
    logger.error({err, messages}, 'generateOpenAICompletion');
    if (err instanceof OpenAI.APIError) {
      throw {name: ErrorOptions.completionOpenAI, err: {err}};
    } else throw err;
  }
  return message.choices[0]?.message.content || '' as string;
}
