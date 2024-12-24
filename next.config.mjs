import { readFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Compile TypeScript configuration on the fly
require('ts-node').register();
const config = require('./next.config.ts').default;

export default config;
