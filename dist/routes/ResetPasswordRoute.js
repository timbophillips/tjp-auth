import { EncryptPassword } from '../tools/EncryptPassword.js';
import { activeDB } from '../server.js';
// import { UpdatePassword } from '../model/UpdatePassword.js';
// import {UpdatePasswordDB } from '../database/databaseFactory.js'
export async function ResetPasswordRoute(request, response, next) {
    if (!request.user) {
        response.data = [{ error: 'Authorization' }];
        response.message = 'Not authorized to reset (not logged in)';
        return next();
    }
    else {
        // check request data
        const userIdWhoNeedsPasswordChanged = request.body['userid'];
        if (!userIdWhoNeedsPasswordChanged) {
            response.error = 'Invalid JSON';
            response.message = 'JSON must include { userid: <userid> }';
            return next();
        }
        else {
            const newBas64Passowrd = request.body['newPassword'];
            if (!newBas64Passowrd) {
                response.error = 'Invalid JSON';
                response.message = '{ newPpassword: <base64> } must be provided in POSTed JSON';
                return next();
            }
            else {
                // get logged in user (put in request by AuthenticationMiddleware.ts)
                const loggedInUser = request.user;
                // check that logged in user is allowed to do this
                if (loggedInUser.role !== 'admin' && loggedInUser.role !== 'superuser') {
                    response.error = 'Authorization';
                    response.message = 'only an admin or the index user can reset a password';
                    return next();
                }
                else {
                    const decodedPassword = Buffer.from(newBas64Passowrd, 'base64').toString();
                    const encryptedPassword = await EncryptPassword(decodedPassword);
                    // get logged in user (put in request by AuthenticationMiddleware.ts)
                    const result = await activeDB.UpdatePasswordDB(userIdWhoNeedsPasswordChanged, encryptedPassword);
                    // put data in response for middleware
                    response.data = [{ newPassword: '*******' }];
                    response.message = `Password changed for ${result.username}`;
                    // onward with the next bit of middle
                    return next();
                }
            }
        }
    }
}
