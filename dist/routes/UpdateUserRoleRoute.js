import { activeDB } from '../server.js';
// import {
//   UpdateRoleDB,
// } from '../database/databaseFactory.js';
export async function UpdateUserRoleRoute(request, response, next) {
    if (!request.user) {
        response.data = { error: 'Authorization' };
        response.message = 'Not authorized to reset (not logged in)';
        return next();
    }
    else {
        // check request data
        const userIdWhoNeedsRoleChanged = request.body['userid'];
        if (!userIdWhoNeedsRoleChanged) {
            response.error = 'Invalid JSON';
            response.message = 'JSON must include { userid: <userid> }';
            return next();
        }
        else {
            const newRole = request.body['newrole'];
            if (!newRole) {
                response.error = 'Invalid JSON';
                response.message =
                    '{ newrole: <string> } must be provided in POSTed JSON';
                return next();
            }
            else {
                // get logged in user (put in request by AuthenticationMiddleware.ts)
                const loggedInUser = request.user;
                // check that logged in user is allowed to do this
                if (loggedInUser.role !== 'admin') {
                    response.error = 'Authorization';
                    response.message = `only an admin can alter a user's role`;
                    return next();
                }
                else {
                    const result = await activeDB.UpdateRoleDB(userIdWhoNeedsRoleChanged, newRole);
                    // put data in response for middleware
                    response.data = { newRole };
                    response.message = `Role changed for ${result.username} to ${result.role}`;
                    // onward with the next bit of middle
                    return next();
                }
            }
        }
    }
}
