import { ApiPath, ApiEndpointBuilder } from '../src/api';

describe('Api path', () => {
	let builder: ApiEndpointBuilder;

	beforeEach(() => {
		builder = ApiPath.builder('http://example.com');
	});

	it('should initialize with default values', () => {
		const defaultBuilder = new ApiEndpointBuilder();
		expect(defaultBuilder['baseUrl']).toBe('');
		expect(defaultBuilder['pathTemplate']).toBe('');
		expect(defaultBuilder['pathParams']).toEqual({});
		expect(defaultBuilder['queryParams']).toEqual({});
	});

	it('should set the path correctly', () => {
		builder.path('/api/test');
		expect(builder['pathTemplate']).toBe('/api/test');
	});

	it('should set path parameters correctly', () => {
		builder.path('/api/:id').params({ id: 123 });
		expect(builder['pathParams']).toEqual({ id: 123 });
	});

	it('should set query parameters correctly', () => {
		builder.query({ search: 'test', page: 1 });
		expect(builder['queryParams']).toEqual({ search: 'test', page: 1 });
	});

	it('should build URL with path parameters and query parameters', () => {
		const url = builder
			.path('/api/:id')
			.params({ id: 123 })
			.query({ search: 'test', page: 1 })
			.build();
		expect(url).toBe('http://example.com/api/123?search=test&page=1');
	});

	it('should encode path parameters correctly', () => {
		const url = builder
			.path('/api/:name')
			.params({ name: 'John Doe' })
			.build();
		expect(url).toBe('http://example.com/api/John%20Doe');
	});

	it('should encode query parameters correctly', () => {
		const url = builder
			.query({ search: 'hello world', filter: 'a+b/c' })
			.build();
		expect(url).toBe('http://example.com?search=hello%20world&filter=a%2Bb%2Fc');
	});

});