// import {
//   GetUserWithoutPasswordByIdDB,
// } from '../database/databaseFactory.js';
import { activeDB } from '../server.js';
export async function GetUserRoute(request, response, next) {
    // check request data
    const userid = request.params['id'];
    if (!userid) {
        response.error = 'Invalid HTTP params';
        response.message = 'user id must be provided in params';
        return next();
    }
    else {
        const loggedInUser = request.user;
        if (loggedInUser?.role === 'admin' ||
            loggedInUser?.id.toString() === userid) {
            const retrievedUser = await activeDB.GetUserWithoutPasswordByIdDB(userid).catch((_e) => null);
            if (retrievedUser) {
                response.data = retrievedUser;
                response.message = `user ${retrievedUser.username} found in database`;
            }
            else {
                response.error = 'not found';
                response.message = `user id ${userid} not found in database`;
            }
        }
        else {
            response.error = 'unauthorized';
            response.message = `must be admin or logged in as the same user id to make this request `;
        }
    }
}
