import { normalizeDocument, normalizeTextNumber } from "./normalize";

/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param {number} num - The number to be rounded.
 * @param {number} decimals - The number of decimal places to round to.
 * @returns {number} - The rounded number.
 */
export function roundToDecimals(num: number, decimals: number) {
    if (typeof num !== 'number' || typeof decimals !== 'number') {
        throw new TypeError('Both arguments should be numbers');
    }
    if (decimals < 0) {
        throw new RangeError('The number of decimal places should be non-negative');
    }
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
}



export function fileSize(size: number | null, unit: 'Mb' | 'Kb' | 'Gb', decimals?: number) {
    if (!size || size === 0) {

        return `0 ${unit}`;
    }

    let factor = 1024;

    let divisor = factor;

    switch (unit) {
        case 'Kb':
            divisor = factor;
            break;
        case 'Mb':
            divisor = factor * factor;
            break
        case 'Gb':
            divisor = factor * factor * factor;
            break;
        default:
            break;
    }

    return `${roundToDecimals(size / divisor, decimals ?? 2)} ${unit}`.replace('.', ',');
}

export function Cnpj(value: string) {

    const normalized = normalizeDocument(value);
    if (!!normalized && normalized.length === 14) {
        return `${normalized.slice(0, 2)}.${normalized.slice(2, 5)}.${normalized.slice(5, 8)}/${normalized.slice(8, 12)}-${normalized.slice(normalized.length - 2, normalized.length)}`;
    }

    return normalized;
}


export function Cpf(value: string) {

    const normalized = normalizeDocument(value);
    if (!!normalized && normalized.length === 11) {
        return `${normalized.slice(0, 3)}.${normalized.slice(3, 6)}.${normalized.slice(6, 9)}-${normalized.slice(normalized.length - 2, normalized.length)}`;
    }

    return normalized;
}


export function Document(value: string) {

    let result = value.replace(/[.\-/]/g, "");

    if (result.length === 11) {

        return Cpf(result);
    }

    if (result.length === 14) {

        return Cnpj(result);
    }

    return result;
}

export function Phone(value: string): string | null {

    let normalized = normalizeDocument(value)

    if (!normalized) {

        return null;
    }

    if(normalized.length === 13){

        normalized = normalized.slice(2, normalized.length)
    }

    return `(${normalized.slice(0,2)}) ${normalized.slice(2,normalized.length - 4)}-${normalized.slice(normalized.length - 4, normalized.length)}`
}

function ZipCode(value: string): string | null {

    let normalized = normalizeTextNumber(value)

    if (!normalized) {

        return null;
    }
    return `${normalized.slice(0,5)}-${normalized.slice(5)}`
}


export function Plate(value: string) {
    if (value && value.length === 7) {
        return `${value.substring(0, 3)}-${value.substring(3, value.length)}`;
    }
    return value;
}



export const String = {
    DOCUMENT: Document,
    CPF: Cpf,
    CNPJ: Cnpj,
    PHONE: Phone,
    ZIP_CODE: ZipCode
}