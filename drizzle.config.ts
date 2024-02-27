import type { Config } from 'drizzle-kit';

import { DATABASE_URL } from '@env';

export default {
  schema: './db/schemas',
  driver: 'mysql2',
  dbCredentials: {
    uri:
      'mysql://tfh370m3fp3urwt3kemj:pscale_pw_KmRkOFHHAmhZ9kT95MNBmXWzxNjVK1rQtsFCbxuQpej@aws.connect.psdb.cloud/cash-dash?ssl={"rejectUnauthorized":true}' ??
      '',
  },
} satisfies Config;
