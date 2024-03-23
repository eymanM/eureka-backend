import {LevelWithSilentOrString} from 'pino';
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY: string
      GROQ_API_KEY: string
      POSTGRES_CONNECTION: string
      LOG_LEVEL: LevelWithSilentOrString
      OPEN_AI_MODEL: 'gpt-3.5-turbo' | 'gpt-4-turbo-preview'
      GROG_AI_MODEL: 'mixtral-8x7b-32768' | 'gemma-7b-it'
    }
  }
}

export global {}
