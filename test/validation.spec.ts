import { Cpf, Cnpj, Document, EndpointProtocol, Endpoint, Phone } from '../src/validation';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('VALIDATION module', () => {

    describe('CPF', () => {
        // Test for Cpf function
        it('valid CPF should return true', () => {
            expect(Cpf('398.018.300-93')).toBe(true);  // Replace with a valid CPF for your region
        });

        it('invalid CPF should return false', () => {
            expect(Cpf('123.456.789-00')).toBe(false);
            expect(Cpf('111.111.111-11')).toBe(false);
        });

        it('undefined CPF should return false', () => {
            expect(Cpf(undefined)).toBe(false);
        });
    });

    describe('CNPJ', () => {

        // Test for Cnpj function
        it('valid CNPJ should return true', () => {
            expect(Cnpj('59.386.141/0001-37')).toBe(true);  // Replace with a valid CNPJ for your region
        });

        it('invalid CNPJ should return false', () => {
            expect(Cnpj('11.111.111/0001-00')).toBe(false);
        });

        it('undefined CNPJ should return false', () => {
            expect(Cnpj(undefined)).toBe(false);
        });



    });

    describe('Document', () => {

        it('should format CNPJ correctly', () => {
            expect(Document('12345678000195')).toBe(true);
        });

        it('should return empty string for invalid document length', () => {
            expect(Document('12345')).toBe(false);
        });

        it('valid CNPJ should return true', () => {
            expect(Cnpj('59.386.141/0001-37')).toBe(true);  // Replace with a valid CNPJ for your region
        });

        // Test for Document function
        it('should should return true', () => {
            expect(Document('123.456.789-00')).toBe(false);
        });
    });

    describe('Endpoint protocol', () => {
        // Test for EndpointProtocol function
        it('should return true for HTTPS URLs', () => {
            expect(EndpointProtocol('https://example.com')).toBe(true);
        });

        it('should return false for non-HTTPS URLs', () => {
            expect(EndpointProtocol('http://example.com')).toBe(false);
        });

    });

    describe('endpoint', () => {
        // Test for Endpoint function
        it('should return true for valid endpoint', async () => {
            fetchMock.mockResponseOnce(JSON.stringify({ status: 200 }));

            const result = await Endpoint('https://example.com', 'POST');
            expect(result).toBe(true);
        });

        it('should return false for invalid endpoint (404)', async () => {
            fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });

            const result = await Endpoint('https://example.com', 'POST');
            expect(result).toBe(false);
        });

        it('should return false for invalid URL protocol', async () => {
            const result = await Endpoint('http://example.com', 'POST');
            expect(result).toBe(false);
        });
    })


    describe('Phone', () => {
        // Test for Phone function
        it('should return true for valid phone number', () => {
            expect(Phone('11987654321')).toBe(true);  // Valid São Paulo mobile number
        });

        it('should return false for phone number with invalid area code', () => {
            expect(Phone('00987654321')).toBe(false);
        });

        it('should return false for phone number with invalid length', () => {
            expect(Phone('12345')).toBe(false);
        });
    });

});
