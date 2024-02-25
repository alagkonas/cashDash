import { Client, connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';

import { DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USERNAME } from '@env';

import { schema } from './schemas';

const client = connect({
  host: DATABASE_HOST,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
});

export const db = drizzle(client, { schema: schema });
