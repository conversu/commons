import { DocumentPattern, Document, Phone, Cpf, Cnpj, Cep } from '../src/mask';
import { Phone as NormalizePhone } from '../src/format';
import { normalizeDocument } from '../src/normalize';

describe('MASK module', () => {
  describe('DocumentPattern', () => {
    it('should return CPF pattern for document length less than 12', () => {
      expect(DocumentPattern('123.456.789-01')).toBe('999.999.999-999');
    });

    it('should return CNPJ pattern for document length 12 or more', () => {
      expect(DocumentPattern('12.345.678/9012-34')).toBe('99.999.999/9999-99');
    });

    it('should return CPF pattern for non-normalizable documents', () => {
        
      expect(DocumentPattern('invalid')).toBe('999.999.999-999');
    });
  });

  describe('Document', () => {
    it('should return CPF formatted when document length is 11', () => {

      expect(Document('123.456.789-01')).toBe('123.***.***-01');
    });

    it('should return CNPJ formatted when document length is 14', () => {

      expect(Document('12.345.678/0001-99')).toBe('12.***.**8/0001-99');
    });
  });

  describe('Phone', () => {
    it('should format phone number correctly', () => {

      expect(Phone('(12) 93456-7890')).toBe('(12) *****-7890');
    });

    it('should return value if phone number is invalid', () => {

      expect(Phone('invalid')).toBe('invalid');
    });
  });

  describe('Cpf', () => {
    it('should format CPF correctly', () => {
      expect(Cpf('12345678901')).toBe('123.***.***-01');
    });

    it('should return input if length is not 11', () => {
      expect(Cpf('12345')).toBe('12345');
    });
  });

  describe('Cnpj', () => {
    it('should format CNPJ correctly', () => {
      expect(Cnpj('12345678000199')).toBe('12.***.**8/0001-99');
    });

    it('should return input if length is not 14', () => {
      expect(Cnpj('12345')).toBe('12345');
    });
  });

  describe('Cep', () => {
    it('should format CEP correctly', () => {
      expect(Cep('12345678')).toBe('12***-678');
    });

    it('should return input if length is not 8', () => {
      expect(Cep('12345')).toBe('12345');
    });
  });
});