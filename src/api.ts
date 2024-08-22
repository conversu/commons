export class ApiEndpointBuilder {
	private baseUrl: string;
	private pathTemplate: string;
	private pathParams: Record<string, string | number | boolean>;
	private queryParams: Record<string, string | number | boolean | undefined | null>;

	constructor(baseUrl: string = '') {
		this.baseUrl = baseUrl;
		this.pathTemplate = '';
		this.pathParams = {};
		this.queryParams = {};
	}

	path(template: string): ApiEndpointBuilder {
		this.pathTemplate = template;
		return this;
	}

	params(params: Record<string, string | number | boolean>): ApiEndpointBuilder {
		this.pathParams = { ...this.pathParams, ...params };
		return this;
	}

	query(params: Record<string, string | number | boolean | undefined | null>): ApiEndpointBuilder {
		this.queryParams = { ...this.queryParams, ...params };
		return this;
	}

	build(): string {
		// Replace path parameters
		let path = this.pathTemplate;
		for (const [key, value] of Object.entries(this.pathParams)) {
			path = path.replace(`:${key}`, encodeURIComponent(String(value)));
		}

		// Construct query string
		const queryString = Object.entries(this.queryParams)
			.filter(([, value]) => value !== undefined && value !== null)
			.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
			.join('&');

		return `${this.baseUrl}${path}${queryString ? `?${queryString}` : ''}`;
	}
}

export const ApiPath = {
	builder: (baseUrl?: string) => new ApiEndpointBuilder(baseUrl),
};