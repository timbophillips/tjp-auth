// import {
//   GetUserWithoutPasswordByIdDB,
// } from '../database/databaseFactory.js';
import { activeDB } from '../server.js';
// import { DeleteUserDB } from '../database/databaseFactory.js';
export async function newDeleteUserRoute(request, response, next) {
    // check that someone is logged in
    if (!request.user) {
        response.error = 'Authorization';
        response.message = 'Not authorized to delete user (not logged in)';
        return next();
    }
    else {
        // check request data
        const IdOfUserToDelete = request.body['userid'];
        if (!IdOfUserToDelete) {
            response.error = 'Invalid JSON';
            response.message =
                'ID (of the user to delete (userid) was not provided in POSTed JSON';
            return next();
        }
        // get logged in user (put in request by AuthenticationMiddleware.ts)
        const loggedInUser = request.user;
        // check that logged in user is allowed to do this
        if (loggedInUser.role !== 'admin') {
            response.error = 'Authorization';
            response.message = `only an admin can delete a user`;
            return next();
        }
        // check for self delete attempt
        if (loggedInUser.id === IdOfUserToDelete) {
            response.error = 'Authorization';
            response.message = `cannot delete yourself`;
            return next();
        }
        const userToDelete = await activeDB.GetUserWithoutPasswordByIdDB(IdOfUserToDelete);
        if (!userToDelete) {
            response.error = 'Invalid JSON';
            response.message =
                'ID (of the user to delete (userid) does not match an existing user';
            return next();
        }
        // if we have made it this far then delete the user
        console.log(`we have made it this far and (loggedInUser.id === IdOfUserToDelete) = ${(loggedInUser.id === IdOfUserToDelete)} `);
        const deletedUserBoolean = await activeDB.DeleteUserDB(IdOfUserToDelete);
        // put data in response for middleware
        response.data = {
            userDeleted: deletedUserBoolean,
            DeleteUserID: IdOfUserToDelete,
        };
        response.message = `${userToDelete?.username} ${deletedUserBoolean ? 'has' : 'has not'} been deleted`;
        // onward with the next bit of middleware
        return next();
    }
}
