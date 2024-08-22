import { roundToDecimals, fileSize, Cpf, Cnpj, Document, Phone, Plate, String } from '../src/format';

describe('FORMAT module', () => {

  // Test for roundToDecimals function
  describe('roundToDecimals', () => {
    it('should round a number to 2 decimal places', () => {
      expect(roundToDecimals(123.456, 2)).toBe(123.46);
    });

    it('should return the same number if decimals is 0', () => {
      expect(roundToDecimals(123.456, 0)).toBe(123);
    });

    it('should throw a TypeError if inputs are not numbers', () => {
      expect(() => roundToDecimals('123.456' as any, 2)).toThrow(TypeError);
      expect(() => roundToDecimals(123.456, '2' as any)).toThrow(TypeError);
    });

    it('should throw a RangeError if decimals is negative', () => {
      expect(() => roundToDecimals(123.456, -2)).toThrow(RangeError);
    });
  });

  // Test for fileSize function
  describe('fileSize', () => {
    it('should return "0 Mb" for null or zero size', () => {
      expect(fileSize(0, 'Mb')).toBe('0 Mb');
      expect(fileSize(null, 'Mb')).toBe('0 Mb');
    });

    it('should correctly format file size in Mb', () => {
      expect(fileSize(1048576, 'Mb', 2)).toBe('1 Mb');
    });

    it('should correctly format file size in Kb', () => {
      expect(fileSize(1024, 'Kb', 2)).toBe('1 Kb');
    });

    it('should correctly format file size in Gb', () => {
      expect(fileSize(1073741824, 'Gb', 2)).toBe('1 Gb');
    });
  });

  // Test for Cpf function
  describe('Cpf', () => {
    it('should format a valid CPF correctly', () => {
      expect(Cpf('12345678909')).toBe('123.456.789-09');
    });

    it('should return value for an invalid CPF', () => {
      expect(Cpf('123')).toBe('123');
    });
  });

  // Test for Cnpj function
  describe('Cnpj', () => {
    it('should format a valid CNPJ correctly', () => {
      expect(Cnpj('12345678000195')).toBe('12.345.678/0001-95');
    });

    it('should return value for an invalid CNPJ', () => {
      expect(Cnpj('123')).toBe('123');
    });
  });

  // Test for Document function
  describe('Document', () => {
    it('should format a valid CPF correctly', () => {
      expect(Document('12345678909')).toBe('123.456.789-09');
    });

    it('should format a valid CNPJ correctly', () => {
      expect(Document('12345678000195')).toBe('12.345.678/0001-95');
    });

    it('should return the input string if it’s not a valid CPF or CNPJ length', () => {
      expect(Document('12345')).toBe('12345');
    });
  });

  // Test for Phone function
  describe('Phone', () => {
    it('should format a valid phone number correctly', () => {
      expect(Phone('11987654321')).toBe('(11) 98765-4321');
    });

    it('should return null for an invalid phone number', () => {
      expect(Phone('')).toBeNull();
    });
  });

  // Test for Plate function
  describe('Plate', () => {
    it('should format a valid vehicle license plate correctly', () => {
      expect(Plate('ABC1234')).toBe('ABC-1234');
    });

    it('should return the input value for invalid license plate length', () => {
      expect(Plate('AB1234')).toBe('AB1234');
    });
  });

  // Test for the String object
  describe('String Object', () => {
    it('should format CPF using String.CPF', () => {
      expect(String.CPF('12345678909')).toBe('123.456.789-09');
    });

    it('should format CNPJ using String.CNPJ', () => {
      expect(String.CNPJ('12345678000195')).toBe('12.345.678/0001-95');
    });

    it('should format phone using String.PHONE', () => {
      expect(String.PHONE('11987654321')).toBe('(11) 98765-4321');
    });

    it('should format document using String.DOCUMENT', () => {
      expect(String.DOCUMENT('12345678909')).toBe('123.456.789-09');
    });
  });

});
