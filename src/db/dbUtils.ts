import {syncDB} from './db';
import {logger} from '../utils/lambda';

export async function syncDatabase() {
  await syncDB();
  logger.info('Database and tables are in sync');
}
