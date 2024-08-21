import CryptoJS from 'crypto-js';

export function encrypt(secret: string, value: string | null): string | null {
    if (value) {
        return CryptoJS.AES.encrypt(value, secret).toString();
    }

    return null;
}

export function decrypt(secret: string, value: string | null) {
    if (value) {
        return CryptoJS.AES.decrypt(value, secret).toString(CryptoJS.enc.Utf8);
    }
    return null;
}
