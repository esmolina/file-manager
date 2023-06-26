import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const getRelativeDirname = (metaUrl) => dirname(fileURLToPath(metaUrl))