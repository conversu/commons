import { parse, stringify, update, removeKey } from '../src/json';


describe('SAFETY_JSON module', () => {

    // Test for parse function
    describe('parse', () => {
        it('should parse a valid JSON string into an object', () => {
            const jsonString = '{"name": "John", "age": 30}';
            const result = parse(jsonString);
            expect(result).toEqual({ name: 'John', age: 30 });
        });

        it('should return an object as is if already an object', () => {
            const obj = { name: 'John', age: 30 };
            const result = parse<typeof obj>(obj);
            expect(result).toEqual(obj);
        });

        it('should return null for invalid JSON string', () => {
            const jsonString = '{"name": "John", "age": 30';
            const result = parse(jsonString);
            expect(result).toBeNull();
        });

        it('should return null for undefined or null input', () => {
            expect(parse(null)).toBeNull();
            expect(parse(undefined)).toBeNull();
        });
    });

    // Test for stringify function
    describe('stringify', () => {
        it('should stringify a valid object', () => {
            const obj = { name: 'John', age: 30 };
            const result = stringify(obj);
            expect(result).toBe('{"name":"John","age":30}');
        });

        it('should return the string as is if input is already a string', () => {
            const jsonString = '{"name": "John", "age": 30}';
            const result = stringify(jsonString);
            expect(result).toBe(jsonString);
        });

        it('should return null for undefined or null input', () => {
            expect(stringify(null)).toBeNull();
            expect(stringify(undefined)).toBeNull();
        });

        it('should return null for non-serializable objects', () => {
            const obj = { name: 'John', circularRef: {} };
            obj.circularRef = obj; // Creating a circular reference
            const result = stringify(obj);
            expect(result).toBeNull();
        });
    });

    // Test for update function
    describe('update', () => {
        it('should update an object with new data', () => {
            const obj = { name: 'John' };
            const data = { age: 30 };
            const result = update(obj, data);
            expect(result).toEqual({ name: 'John', age: 30 });
        });

        it('should update a JSON string with new data', () => {
            const jsonString = '{"name": "John"}';
            const data = { age: 30 };
            const result = update(jsonString, data);
            expect(result).toEqual({ name: 'John', age: 30 });
        });

        it('should return the original object if data is undefined', () => {
            const obj = { name: 'John' };
            const result = update(obj, undefined);
            expect(result).toEqual(obj);
        });

        it('should return an empty object if the original object is null and data is provided', () => {
            const data = { age: 30 };
            const result = update(null, data);
            expect(result).toEqual({ age: 30 });
        });

        it('should return original JSON string if it cannot be parsed', () => {
            const invalidJsonString = '{"name": "John"';
            const data = { age: 30 };
            const result = update(invalidJsonString, data);
            expect(result).toBe(invalidJsonString);
        });
    });

    // Test for removeKey function
    describe('removeKey', () => {
        it('should remove the specified key from an object', () => {
            const obj = { name: 'John', age: 30, gender: 'male' };
            const result = removeKey(obj, 'age');
            expect(result).toEqual({ name: 'John', gender: 'male' });
        });

        it('should remove the specified key from a JSON string', () => {
            const jsonString = '{"name": "John", "age": 30, "gender": "male"}';
            const result = removeKey(jsonString, 'age');
            expect(result).toEqual({ name: 'John', gender: 'male' });
        });

        it('should return null if the input is null or undefined', () => {
            expect(removeKey(null, 'age')).toBeNull();
            expect(removeKey(undefined, 'age')).toBeNull();
        });

        it('should return the original object if key does not exist', () => {
            const obj = { name: 'John', gender: 'male' };
            const result = removeKey(obj, 'age');
            expect(result).toEqual(obj);
        });
    });
});