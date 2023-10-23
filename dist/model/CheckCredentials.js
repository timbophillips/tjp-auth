import { activeDB } from '../server.js';
import { CustomLogger } from '../tools/ConsoleLogger.js';
const logger = CustomLogger('Credential functions');
//ESM
import pkg from 'bcryptjs';
const { compareSync } = pkg;
export async function CheckCredentials(credentials) {
    return activeDB.GetUserDB(credentials.username).then((user) => {
        if (user) {
            if (compareSync(credentials.nudePassword, user.password)) {
                logger(`supplied password for ${credentials.username} matches encrypted password in database`);
                // ES6 sorcery to remove password
                const { password: _, ...userWithoutPassword } = user;
                return userWithoutPassword;
            }
            else {
                throw new Error('password');
            }
        }
        else {
            throw new Error('usern not found in database');
        }
    });
}
