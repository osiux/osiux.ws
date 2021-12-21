// From https://github.com/remark-embedder/cache/blob/main/src/index.ts
import path from 'path';
import cacheManager from 'cache-manager';
import type { Cache as CMCache } from 'cache-manager';
import fsStore from 'cache-manager-fs-hash';
import fs from 'fs-extra';

const TTL = Number.MAX_SAFE_INTEGER;

class Cache {
	cache: CMCache;
	directory: string;

	constructor(
		directory = path.join(
			process.cwd(),
			'node_modules/.cache/@osiux.ws/images',
		),
	) {
		this.directory = directory;
		this.ensureCacheDirExists();
		this.cache = cacheManager.caching({
			store: fsStore,
			ttl: TTL,
			options: {
				ttl: TTL,
				path: this.directory,
				subdirs: true,
			},
		});
	}

	ensureCacheDirExists() {
		fs.ensureDirSync(this.directory);
	}

	get<T = string>(key: string): Promise<T | undefined> {
		return new Promise((resolve) => {
			this.cache.get(
				key,
				(
					error: NodeJS.ErrnoException | undefined,
					result: T | undefined,
				) => {
					if (error?.code === 'ENOENT') {
						this.ensureCacheDirExists();
					}

					resolve(error ? undefined : result);
				},
			);
		});
	}

	set(key: string, value: any): Promise<any | undefined> {
		return new Promise((resolve) => {
			this.cache.set(
				key,
				value,
				{ ttl: TTL },
				(err: NodeJS.ErrnoException | undefined) => {
					if (err?.code === 'ENOENT') {
						this.ensureCacheDirExists();
						resolve(this.set(key, value));
					} else {
						// istanbul ignore next because I'm not sure how to reproduce this situation
						resolve(err ? undefined : value);
					}
				},
			);
		});
	}
}

export default Cache;
