import { activeDB } from '../server.js';
// import { CheckUserExistsDB } from '../database/databaseFactory.js';
export async function CheckUserExistsRoute(request, response, next) {
    // check that params were sent
    const username = request.params['username'];
    if (!username) {
        response.error = 'Invalid Params';
        response.message = 'username must be included as parameter';
        return next();
    }
    else {
        // if we made it here then check the username
        const exists = await activeDB.CheckUserExistsDB(username);
        // put data in response for middleware
        response.data = [{ username, exists }];
        response.message = `check the data field to see if ${username} exists`;
        // onward with the next bit of middleware
        return next();
    }
}
