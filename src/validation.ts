import { cpf as cpfValidator, cnpj as cnpjValidator, } from 'cpf-cnpj-validator';


export function Cpf(cpf: string | undefined): boolean {

  if (!!cpf) {

    const cpfNumber = cpf?.replace('.', '').replace('-', '');
    return cpfValidator.isValid(cpfNumber);
  }
  return false;
}

export function Cnpj(cnpj: string | undefined): boolean {

  if (!!cnpj) {

    const cnpjNumber = cnpj.replace('.', '').replace('/', '').replace('-', '');
    return cnpjValidator.isValid(cnpjNumber);
  }
  return false;
}

export function formatDocument(document?: string | null): string {

  if (!document) {

    return '';
  }

  const cleanDocument = document.replace(/\D/g, '');

  if (cleanDocument.length === 11) {
    // Format as CPF: 999.999.999-46
    return cleanDocument.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (cleanDocument.length === 14) {
    // Format as CNPJ: 99.999.999/9999-99
    return cleanDocument.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  } else {
    return '';
  }
}


export function EndpointProtocol(url: string): boolean {
  const parsedUrl = new URL(url);
  if (parsedUrl.protocol !== 'https:') {
    return false; // Reject if protocol is not HTTPS
  }
  return true;
}

export async function Endpoint(url: string, method: 'POST' | 'PUT'): Promise<boolean> {
  if (!url) {
    return true; // Accept empty value without validation
  }

  const parsedUrl = new URL(url);
  if (parsedUrl.protocol !== 'https:') {
    return false; // Reject if protocol is not HTTPS
  }

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: 'value' }),
    });

    return response.status !== 404; // Return true if the endpoint accepts the body with a POST request
  } catch (error) {
    return false; // Return false if an error occurs (endpoint unreachable or doesn't accept the body)
  }
}


export function Phone(phoneNumber: string): boolean {
  // Remove any non-digit characters from the phone number
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

  // Check if the cleaned phone number has 10 or 11 digits
  if (cleanedPhoneNumber.length !== 10 && cleanedPhoneNumber.length !== 11) {
    return false;
  }

  // Check if the phone number starts with a valid area code
  const validAreaCodes = ['11', '12', '13', '14', '15', '16', '17', '18', '19',
    '21', '22', '24', '27', '28', '31', '32', '33', '34',
    '35', '37', '38', '41', '42', '43', '44', '45', '46',
    '47', '48', '49', '51', '53', '54', '55', '61', '62',
    '63', '64', '65', '66', '67', '68', '69', '71', '73',
    '74', '75', '77', '79', '81', '82', '83', '84', '85',
    '86', '87', '88', '89', '91', '92', '93', '94', '95',
    '96', '97', '98', '99'];
  const areaCode = cleanedPhoneNumber.substr(0, 2);
  if (!validAreaCodes.includes(areaCode)) {
    return false;
  }

  // Check if the phone number has a valid mobile operator code for 9-digit numbers
  const validMobileOperatorCodes = ['6', '7', '8', '9'];
  if (cleanedPhoneNumber.length === 11 && !validMobileOperatorCodes.includes(cleanedPhoneNumber[2])) {
    return false;
  }

  // The phone number is considered valid
  return true;
}