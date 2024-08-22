export function parse<T extends object>(obj?: any | null): T | null {
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

export function stringify(obj: object | string | null | undefined): string | null {
	if (!obj) {
		return null;
	}

	if (typeof obj === 'string') {
		return obj;
	} else {
		try {
			return JSON.stringify(obj);
		} catch (err) {
			return null;
		}
	}

}

export function update(
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

export function removeKey(obj: object | string | null | undefined, keyToRemove: string) {
	let metadata = parse(obj);
	if (!metadata) {
		return metadata;
	}
	const newObj = {};
	Object.keys(metadata).filter(key => key !== keyToRemove).forEach(key => {
		newObj[key] = metadata[key];
	})
	return newObj;
}

