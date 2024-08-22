import * as NORMALIZE from '../src/normalize';


describe('NORMALIZE module', () => {
    
    describe('normalizeTextNumber', () => {
        it('should normalize text number', () => {

            const data = 'Randon4897891-5646.#465412@!#$String';

            expect(NORMALIZE.normalizeTextNumber(data)).toBe('48978915646465412');
        });


        it('should return null if a null value is informed', () => {

            const data = null;

            expect(NORMALIZE.normalizeTextNumber(data)).toBe(null);
        });

        it('should return null if a undefined value is informed', () => {

            const data = undefined;

            expect(NORMALIZE.normalizeTextNumber(data)).toBe(null);
        });

    });

    describe('normalizeDocument', () => {

        it('should normalize cpf document', () => {

            const data = '999.999.999-99';

            expect(NORMALIZE.normalizeDocument(data)).toBe('99999999999');
        });

        it('should normalize cnpj document', () => {

            const data = '99.999.999/0001-00';

            expect(NORMALIZE.normalizeDocument(data)).toBe('99999999000100');
        });

    });

});