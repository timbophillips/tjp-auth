// import { GetUserDB } from '../database/databaseFactory.js';
import { activeDB } from '../server.js';
//ESM
import pkg from 'bcryptjs';
const { compareSync } = pkg;
export async function CheckCredentials(credentials) {
    return activeDB.GetUserDB(credentials.username).then((user) => {
        if (user) {
            if (compareSync(credentials.nudePassword, user.password)) {
                console.log(`supplied password for ${credentials.username} matches encrypted password in database`);
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
