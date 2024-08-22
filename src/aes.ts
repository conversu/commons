const CryptoJS = require('crypto-js');

export function encrypt(secret: string, value: string | null| undefined): string | null {

    if(!secret){
        throw new Error('Secret was not provided!');
    }

    if (value) {
        return CryptoJS.AES.encrypt(value, secret).toString();
    }

    return null;
}

export function decrypt(secret: string, value: string | null | undefined) {

    if(!secret){
        throw new Error('Secret was not provided!');
    }

    if (value) {
        const decrypt = CryptoJS.AES.decrypt(value, secret);

        console.log(decrypt)

        if(!decrypt){

            return null;
        }

        if(decrypt.sigBytes < 0){

            throw new Error('Invalid secret.');
        }

        return decrypt?.toString(CryptoJS.enc.Utf8);
    }
    return null;
}
