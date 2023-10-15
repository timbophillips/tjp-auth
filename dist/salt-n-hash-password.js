import { hash, genSalt, compare } from 'bcryptjs';
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
    console.log(`${rawPassword} was encrypted to ${encryptedPassword} and the compare function returned ${doTheyMatch}`);
});
