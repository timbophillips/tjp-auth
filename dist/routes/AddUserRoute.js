// import { CheckUserExistsDB, AddUserDB } from '../database/databaseFactory.js';
import { EncryptPassword } from '../tools/EncryptPassword.js';
import { activeDB } from '../server.js';
export async function AddUserRoute(request, response, next) {
    if (!request.user) {
        response.data = [{ error: 'Authorization' }];
        response.message = 'Not authorized to add user (not logged in)';
        return next();
    }
    else {
        // check request data
        const newUsername = request.body['username'];
        if (!newUsername) {
            response.error = 'Invalid JSON';
            return next();
        }
        const newBas64Passowrd = request.body['password'];
        if (!newBas64Passowrd) {
            response.error = 'Invalid JSON';
            response.message = 'password must be provided in POSTed JSON';
            return next();
        }
        // check if proposed new username exists
        if (await activeDB.CheckUserExistsDB(newUsername)) {
            response.error = 'Username exists already';
            response.message = 'username already in use';
            return next();
        }
        // decode base64 password then encrypt
        const newPassword = Buffer.from(newBas64Passowrd, 'base64').toString('utf8');
        const encryptedNewPassword = await EncryptPassword(newPassword);
        // get role and group from request or defaults
        const groupForNewUser = request.body['group'] || '';
        const newRole = request.body['role'] || 'user';
        // get logged in user (put in request by AuthenticationMiddleware.ts)
        const loggedInUser = request.user;
        // check that logged in user is allowed to do this
        if (loggedInUser.role !== 'admin' && loggedInUser.role !== 'superuser') {
            response.error = 'Authorization';
            response.message = 'only an admin or superuser can add a new user';
            return next();
        }
        if (loggedInUser.role === 'superuser' && newRole !== 'user') {
            response.error = 'Authorization';
            response.message = 'superusers can only add new users with role=user';
            return next();
        }
        // if we have got this far then add the user
        const newUser = await activeDB.AddUserDB({
            username: newUsername,
            password: encryptedNewPassword,
            role: newRole,
            group: groupForNewUser,
        });
        // put data in response for middleware
        //response.data = { newuser: newUser };
        response.data = [newUser];
        response.message = `new user ${newUsername} added`;
        // onward with the next bit of middle
        return next();
    }
}
