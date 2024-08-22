import * as AES from '../src/aes';


describe('AES module', () => {

    describe('Encrypt', () => {
        test('should be null if data is null', () => {

            expect(AES.encrypt('secret', null)).toBeNull();
        });


        test('should be null if data is undefined', () => {

            expect(AES.encrypt('secret', undefined)).toBeNull();
        });


        test('should throws a error if a secret is not provided', () => {

            expect(() => AES.encrypt(null as unknown as string, 'data')).toThrow(Error);
            expect(() => AES.encrypt(null as unknown as string, 'data')).toThrow('Secret was not provided!');
        })
    });

    describe('Dencrypt', () => {

        test('should be decrypt correctly', () => {

            const secret = 'secret';
            const data = 'some_data';

            const encryptedData = AES.encrypt(secret, data)

            expect(AES.decrypt(secret, encryptedData)).toBe(data);
        });

        test('should be decrypt correctly if data is null', () => {

            const secret = 'secret';
            const data = null;

            const encryptedData = AES.encrypt(secret, data)

            expect(AES.decrypt(secret, encryptedData)).toBe(data);
        });

        test('should not recover original value if wrong secret', () => {

            const secret = 'secret';
            const data = 'some_data';

            const encryptedData = AES.encrypt(secret, data)

            expect(() => AES.decrypt('wrong_secret', encryptedData)).toThrow(Error);
            expect(() => AES.decrypt('wrong_secret', encryptedData)).toThrow('Invalid secret.');
        });


        test('should throws a error if a secret is not provided', () => {

            expect(() => AES.decrypt(null as unknown as string, 'data')).toThrow(Error);
            expect(() => AES.decrypt(null as unknown as string, 'data')).toThrow('Secret was not provided!');
        });
    });
});