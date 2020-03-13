import { getLogger } from 'log4js';
import { createClient } from 'redis';
import config from '@mmstudio/config';

const logger = getLogger();
const REDIS = config.redis;

export default function an16(key: string, value: unknown) {
	const client = open();
	return new Promise<boolean>((resolve) => {
		const v = JSON.stringify(value);
		// EX seconds PX milliseconds NX XX	https://redis.io/commands/set
		client.set(key, v, 'EX', REDIS.expiration, (error, res) => {
			if (error) {
				logger.error(error);
				client.end(false);
				resolve(false);
			} else {
				client.end(true);
				resolve(res === 'OK');
			}
			client.quit();
		});
	});
}

function open() {
	const client = createClient(REDIS.url);
	client.on('error', (e) => {
		logger.error(e);
		logger.error('Redis Error thrown, process will exit with code -1');
		process.exit(-1);
	});
	// process.on('beforeExit', () => {
	// 	client.quit();
	// });
	return client;
}
