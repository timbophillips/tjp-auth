//ESM
import pkg from 'bcryptjs';
const { hash, genSalt } = pkg;
export async function EncryptPassword(nudePassword) {
    const salt = await genSalt();
    return hash(nudePassword, salt);
}
export async function DecodeAndEncryptPassword(encodedPasssword) {
    // decode base64 password
    const decodedPassword = Buffer.from(encodedPasssword, 'base64').toString('utf8');
    // then encrypt
    const salt = await genSalt();
    const encryptedPassword = await hash(decodedPassword, salt);
    return encryptedPassword;
}
