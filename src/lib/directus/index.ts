import { createDirectus, rest, staticToken } from '@directus/sdk';
import { Schema } from './types';

export const directus = createDirectus<Schema>(process.env.DIRECTUS_URL!)
  .with(staticToken(process.env.DIRECTUS_ADMIN_TOKEN!))
  .with(rest());
