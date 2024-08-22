
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

    console.log(phone)

    if (phone && phone.includes('-')) {
        const [part1, part2] = phone.split('-');

        return `${part1.slice(0, 4)} ${'*'.repeat(part1.length - 5)}-${part2}`;
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
