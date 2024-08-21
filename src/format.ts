import { normalizeDocument } from "./normalize";

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



export function formatFileSize(size: number | null, unit: 'Mb' | 'Kb' | 'Gb', decimals?: number) {
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

export function formatCnpj(value: string) {

    const normalized = normalizeDocument(value);
    if (!!normalized && normalized.length === 14) {
        return `${normalized.slice(0, 2)}.${normalized.slice(2, 5)}.${normalized.slice(5, 8)}/${normalized.slice(8, 12)}-${normalized.slice(normalized.length - 2, normalized.length)}`;
    }

    return normalized;
}


export function formatCpf(value: string) {

    const normalized = normalizeDocument(value);
    if (!!normalized && normalized.length === 11) {
        return `${normalized.slice(0, 3)}.${normalized.slice(3, 6)}.${normalized.slice(6, 9)}-${normalized.slice(normalized.length - 2, normalized.length)}`;
    }

    return normalized;
}


export function formatDocument(value: string) {

    let result = value.replace(/[.\-/]/g, "");

    if (result.length === 11) {

        return formatCpf(result);
    }

    if (result.length === 14) {

        return formatCnpj(result);
    }

    return result;
}

export function formatPhone(value: string): string | null {

    let normalized = normalizeDocument(value)

    if (!normalized) {

        return null;
    }

    if(normalized.length === 13){

        normalized = normalized.slice(2, normalized.length)
    }

    return `(${normalized.slice(0,1)}) ${normalized.slice(1,6)}-${normalized.slice(6)}`
}

function formatZipCode(value: string): string | null {

    let normalized = normalizeDocument(value)

    if (!normalized) {

        return null;
    }
    return `${normalized.slice(0,5)}-${normalized.slice(5)}`
}


export function formatCep(value: string) {
    if (!!value && value.length === 8) {
        return `${value.slice(0, 5)}-${value.slice(value.length - 3, value.length)}`;
    }

    return value;
}

export function formatPlate(value: string) {
    if (value) {
        return `${value.substring(0, 3)}-${value.substring(3, value.length)}`;
    }
    return value;
}



export const formatUtils = {
    DOCUMENT: formatDocument,
    CPF: formatCpf,
    CNPJ: formatCnpj,
    PHONE: formatPhone,
    ZIP_CODE: formatZipCode
}