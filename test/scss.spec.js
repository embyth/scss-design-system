import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { runSass } from 'sass-true';
import { describe, it } from 'vitest';

const sassFile = path.join(path.dirname(fileURLToPath(import.meta.url)), 'test.scss');

runSass({ describe, it }, sassFile);
