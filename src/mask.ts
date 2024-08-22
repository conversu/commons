
import { Phone as NormalizePhone } from "./format";
import { normalizeDocument } from "./normalize";


export function DocumentPattern(value: string) {

    let mask = '999.999.999-999';
    const normalized = normalizeDocument(value);

    if (!normalized) {

        return mask;
    }

    if (normalized.length >= 12) {

        mask = '99.999.999/9999-99'
    }

    return mask
}


export function Document(value: string) {

    const normalized = normalizeDocument(value);

    if (normalized.length === 11) {
        return Cpf(normalized);
    }

    return Cnpj(normalized);
}


export function Phone(value: string) {

    let phone = NormalizePhone(value);

    if (phone) {
        phone = phone.includes('-')
            ? phone
            : `${phone.slice(0, phone.length - 4)}-${phone.slice(phone.length - 4, phone.length)}`;
        const [part1, part2] = phone.split('-');
        let result = part1.slice(0, 12);
        result += '**-**';
        result += part2.slice(2, 4);

        return result;
    }

    return value;
}

export function Cpf(value: string) {
    if (!!value && value.length === 11) {
        return `${value.slice(0, 3)}.***.***-${value.slice(value.length - 2, value.length)}`;
    }

    return value;
}

export function Cnpj(value: string) {
    if (!!value && value.length === 14) {
        return `${value.slice(0, 2)}.***.**${value.slice(7, 8)}/${value.slice(8, 12)}-${value.slice(value.length - 2, value.length)}`;
    }

    return value;
}

export function Cep(value: string) {
    if (!!value && value.length === 8) {
        return `${value.slice(0, 2)}***-${value.slice(value.length - 3, value.length)}`;
    }

    return value;
}
