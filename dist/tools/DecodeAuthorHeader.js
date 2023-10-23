import { decodeBase64 } from './EncodeDecodeBas64.js';
import { CustomLogger } from '../tools/ConsoleLogger.js';
const logger = CustomLogger('Decode auth headers functions');
export async function DecodeAuthHeader(
// accepts an express request
request) {
    // get the auth header
    const authorizationHeaderField = request.get('Authorization'); // returns undefined if it isn't there
    if (!authorizationHeaderField) {
        throw new Error('Authorization header not found');
    }
    // Split by [space] to separate <type> (eg 'Basic') from the
    // base64 encoded <credentials> which should be in username:password format
    // and decode the base64 back to ascii and stick into two strings
    logger(`Authorization header = ${authorizationHeaderField}`);
    const [username, nudePassword] = decodeBase64(authorizationHeaderField.split(' ')[1] || '')
        .toString()
        .split(':');
    // roll up the two strings as a neat little object
    logger(`username ${username} in authorization header`);
    if (!username || !nudePassword) {
        throw new Error('invalide base64 string');
    }
    return { username: username, nudePassword: nudePassword };
}
export async function splitUsernameAndPassword(userPass) {
    const [username, nudePassword] = userPass.split(':');
    if (!username || !nudePassword) {
        throw new Error('invalid base64 string');
    }
    // roll up the two strings as a neat little object
    logger(`${userPass} split into ${username} and ${nudePassword}`);
    return { username, nudePassword };
}
