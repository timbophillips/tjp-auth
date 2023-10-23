import { hash, genSalt, compare } from 'bcryptjs';
import { AlertLevel, CustomLogger } from './tools/ConsoleLogger.js';
const logger = CustomLogger('Encryption Function');
const rawPassword = process.argv[2];
let encryptedPassword;
let doTheyMatch;
async function encryptPassword(newPassword) {
    const salt = await genSalt();
    return await hash(newPassword, salt);
}
encryptPassword(rawPassword)
    .then((epw) => {
    encryptedPassword = epw;
    return compare(rawPassword, encryptedPassword);
})
    .then((b) => {
    doTheyMatch = b;
    logger(`${rawPassword} was encrypted to ${encryptedPassword} and the compare function returned ${doTheyMatch}`, AlertLevel.info);
});
