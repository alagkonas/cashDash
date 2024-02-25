import type { Config } from 'drizzle-kit';

import { DATABASE_URL } from '@env';

export default {
  schema: './db/schemas/index.ts',
  driver: 'mysql2',
  dbCredentials: {
    uri: DATABASE_URL ?? '',
  },
} satisfies Config;
