import { v4 as uuidv4 } from 'uuid';

export const delay = (seconds: number) => new Promise(
    resolve => setTimeout(resolve, seconds * 1000)
  );
  
  
  export function generateKey() {
  
    return uuidv4();
  }
  
  
  export function range(lowEnd: number, highEnd: number): number[] {
    var list: number[] = [];
    for (var i = lowEnd; i <= highEnd; i++) {
      list.push(i);
    }
  
    return list;
  }

  

  export function round(value: number, decimals: number) {
	if (value === 0) {
		return 0;
	}

	if (decimals === 0) {
		return Math.floor(value);
	}

	const factor = Math.pow(10, decimals);

	return Math.floor(value * factor) / factor;
}

export function removeSpecialCharacters(str: string): string {
	// Normalize the string to decompose accented characters
	const normalizedStr = str.normalize('NFD');

	// Remove special characters and keep alphanumeric characters, spaces, and accented characters
	const cleanedStr = normalizedStr.replace(/[\u0300-\u036f]/g, ''); // Remove any other special characters

	return cleanedStr;
}