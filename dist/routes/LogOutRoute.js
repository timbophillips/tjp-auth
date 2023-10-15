import { activeDB } from '../server.js';
// import { DeleteAllTokensOfUserDB } from '../database/databaseFactory.js';
export async function LogOutRoute(request, response, next) {
    // check that someone is logged in
    if (!request.user) {
        response.error = 'Logout';
        response.message =
            'Logout requested but no user logged in from this browser';
        return next();
    }
    else {
        // get logged in user (put in request by AuthenticationMiddleware.ts)
        const loggedInUser = request.user;
        // remove the user from request.user
        // (so that middleware knows)
        request.user = null;
        // delete their tokens
        await activeDB.DeleteAllTokensOfUserDB(loggedInUser.id);
        // put data in response for middleware
        response.data = {};
        response.message = `${loggedInUser.username} has been logged out`;
        // onward with the next bit of middleware
        return next();
    }
}
