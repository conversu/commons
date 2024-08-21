export function safetyParse<T extends object>(obj?: any | null): T | null {
	if (!obj) {
		return null;
	}

	if (typeof obj === 'string') {
		try {
			return JSON.parse(obj);
		} catch (err) {
			return null;
		}
	}

	if (typeof obj === 'object') {
		return obj;
	}

	return null;
}

export function safetyStringify(obj: object | string | null): string | null {
	if (!obj) {
		return null;
	}

	if (typeof obj === 'string') {
		return obj;
	}

	if (typeof obj === 'object') {
		try {
			return JSON.stringify(obj);
		} catch (err) {
			return null;
		}
	}

	return null;
}

export function safetyUpdate(
	obj: object | string | null,
	data?: object | null,
): object | string | null {
	let current = obj;

	if (!data) {
		return current;
	}

	if (!obj) {
		current = {};
	}

	if (typeof obj === 'string') {
		try {
			current = JSON.parse(obj);
		} catch (err) {
			return obj;
		}
	}

	current = Object.assign(current as object, data);

	return current;
}

export function safetyRemove(obj: object | string | null, key: string) {
	let metadata = safetyParse(obj);
	if (!metadata) {
		return metadata;
	}
	Object.keys(metadata).filter(key => key !== 'waitingFor').forEach(key => {
		metadata[key] = metadata[key];
	})
	return metadata;
}

