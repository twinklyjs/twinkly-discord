import { api, discovery, realtime } from '@twinklyjs/twinkly';
import * as config from './config.js';

api.init(config.twinklyIP);

export { api, realtime, discovery };
