export function normalizeDocument(value?: string | null): string | null {

    if (!value) {
  
      return null;
    }
  
    let result = value;
    return result.replace(' ', '').replace(/\D/g, '');
  }
  
  
