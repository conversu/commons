import { delay, generateKey, range, round, removeSpecialCharacters } from '../src/functions';

// Mock uuidv4 for reproducible tests
jest.mock('uuid', () => ({
  v4: jest.fn(() => '123e4567-e89b-12d3-a456-426614174000')
}));

describe('FUNCTIONS module', () => {
  describe('delay', () => {
    jest.useFakeTimers();

    it('should delay for the specified seconds', async () => {
      const delayPromise = delay(2);
      jest.advanceTimersByTime(2000);
      await expect(delayPromise).resolves.toBeUndefined();
    });
  });

  describe('generateKey', () => {
    it('should generate a UUID', () => {
      expect(generateKey()).toBe('123e4567-e89b-12d3-a456-426614174000');
    });
  });

  describe('range', () => {
    it('should generate a range of numbers', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return an empty array if the lowEnd is greater than highEnd', () => {
      expect(range(5, 1)).toEqual([]);
    });
  });

  describe('round', () => {
    it('should round to the specified number of decimals', () => {
      expect(round(1.23456, 2)).toBe(1.23);
      expect(round(1.23456, 0)).toBe(1);
      expect(round(-1.23456, 2)).toBe(-1.24);
    });

    it('should handle zero correctly', () => {
      expect(round(0, 2)).toBe(0);
      expect(round(0, 0)).toBe(0);
    });
  });

  describe('removeSpecialCharacters', () => {
    it('should remove special characters from a string', () => {
      expect(removeSpecialCharacters('Thís ís á tèst')).toBe('This is a test');
      expect(removeSpecialCharacters('Ançíënt Rómàn')).toBe('Ancient Roman');
    });

    it('should handle an empty string', () => {
      expect(removeSpecialCharacters('')).toBe('');
    });
  });
});