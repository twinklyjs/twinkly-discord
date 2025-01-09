import { api } from '@twinklyjs/twinkly';
import * as config from './config.js';

api.init(config.twinklyIP);

export { api };
