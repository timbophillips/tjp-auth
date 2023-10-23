// Get environment values
// In development mode these will come from
// .env if the script to start is
//  node -r dotenv/config server.js
//  rather than node server.js
import { env } from './tools/env.js';
import { AlertLevel, CustomLogger } from './tools/ConsoleLogger.js';
const logger = CustomLogger('Server');
export const envVariables = env({
    USERS_DB_TYPE: 'mongodb',
    USERS_DB_URI: 'inMemory',
    HASURA_GRAPHQL_JWT_SECRET: '{"type":"HS256","key": "m8JuVXnvejQg5fMfOotzuehqrpQp0jB/2Ga3cww4ZmCeAMRj0ROEstE31qP/+IJW"}',
    JWT_TOKEN_EXPIRES_MINS: '20',
    REFRESH_TOKEN_EXPIRES_DAYS: '1',
    PORT: '3000',
    SEED_USERS_JSON_FILE: '',
});
import { HasuraWebhookRoute } from './routes/HasuraWebhookRoute.js';
import { GetRecentlySeenUsersRoute } from './routes/GetRecentlySeenUsersRoute.js';
import { GetUserRoute } from './routes/GetUserRoute.js';
import { UpdateUserRoleRoute } from './routes/UpdateUserRoleRoute.js';
import { AddUserRoute } from './routes/AddUserRoute.js';
import { CheckUserExistsRoute } from './routes/CheckUserExistsRoute.js';
import { GetAllUsersRoute } from './routes/GetAllUsersRoute.js';
import { LogOutRoute } from './routes/LogOutRoute.js';
import { newDeleteUserRoute } from './routes/DeleteUserRoute.js';
import { ChangeGroupRoute } from './routes/ChangeGroupRoute.js';
import { ResetPasswordRoute } from './routes/ResetPasswordRoute.js';
import { readFile } from 'fs/promises';
import express, { json } from 'express';
import cors from 'cors';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { db } from './database/databaseFactory.js';
import { AuthenticateMiddleware } from './middleware/AuthenticateMiddleware.js';
import { LastSeenAndTokensMiddleware } from './middleware/LastSeenAndTokensMiddleware.js';
import { GuestLoginMiddleware } from './middleware/GuestLoginMiddleware.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(json());
const staticFolder = path.join(__dirname + '/static/');
logger(`Serving static files from: ${staticFolder}`, AlertLevel.info);
app.use('/', express.static(staticFolder));
// generic message
app.post('/heartbeat', (_req, res) => {
    res.json({ data: 'up' });
});
// Both POST /login and POST /refreh acutally execute the same code...
// There are two ways of authenticating:
// include username: password in auth header(usually using GET / login)
// as per [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization]
// or
// the client (web browser) includes the refresh token in the json body of the
// POST request
//
// if credentials or refresh token are vaid then the response will include
// a JWT in the body JSON which can be used to log in to the Hasura database
// [ see https://hasura.io/docs/latest/auth/authentication/jwt/ ]
//
// ... and a refresh token as a secure HTTP - only cookie
// [https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies]
// because it is secure and http-only, modern browsers will automatically include this
// with subsequent requests to this server (therefore "staying logged in")
app.post(['/login', '/refresh'], AuthenticateMiddleware, LastSeenAndTokensMiddleware);
// guest user authentication
app.post('/guestlogin/:username', GuestLoginMiddleware, LastSeenAndTokensMiddleware);
// this route will try and work out
// who was "logged on " on the client
// based on the refreshToken in the cookie
app.post('/logout', AuthenticateMiddleware, LogOutRoute, LastSeenAndTokensMiddleware);
// password changing.. test with
// http --auth Dad:password POST :3000/changepassword userid=7 newPassword=password2
app.post('/resetpassword', AuthenticateMiddleware, ResetPasswordRoute, LastSeenAndTokensMiddleware);
// change role .. test with
// http --auth admin:admin POST :3000/changerole userid=3 newrole=superuser
// http --auth admin:admin POST :3000/changerole userid=3 newrole=user
app.post('/changerole', AuthenticateMiddleware, UpdateUserRoleRoute, LastSeenAndTokensMiddleware);
app.post('/changegroup', AuthenticateMiddleware, ChangeGroupRoute, LastSeenAndTokensMiddleware);
app.post('/deleteuser', AuthenticateMiddleware, newDeleteUserRoute, LastSeenAndTokensMiddleware);
app.post('/adduser', AuthenticateMiddleware, AddUserRoute, LastSeenAndTokensMiddleware);
//check user exists
// app.post('/checkuserexists/:username', CheckUserExists);
app.post('/checkuserexists/:username', AuthenticateMiddleware, CheckUserExistsRoute, LastSeenAndTokensMiddleware);
// looks for refresh token or credentials
// to decide if user is admin
// then responds with users array
app.post('/users', AuthenticateMiddleware, GetAllUsersRoute, LastSeenAndTokensMiddleware);
app.post('/get-user/:id', AuthenticateMiddleware, GetUserRoute, LastSeenAndTokensMiddleware);
app.post('/recentusers', AuthenticateMiddleware, GetRecentlySeenUsersRoute, LastSeenAndTokensMiddleware);
// Hasura webhook server
// test by using httpie
// http -v :3000/webhook --auth jessica:2114
// or test with Hasura Graphiql console
// ... adding a Request Header
// --> key = Authorization
// --> Value = Basic amVzc2ljYToyMTE0
// (which is base64 for jessica:2114)
// and then remove the hasura-collaborator-token Header
// (which is effectively using the admin secret key)
app.post('/webhook', HasuraWebhookRoute);
// catch all other routes (partly to workaround the issue of the static site containing its own router)
app.use('*', express.static(path.join(__dirname + '/static')));
// // connect to users database
const dbChoice = envVariables.USERS_DB_TYPE;
export const activeDB = db(dbChoice);
logger(`Connecting to database: ${envVariables.USERS_DB_URI}`);
await activeDB.ConnectDB(envVariables.USERS_DB_URI).then((result) => {
    if (!result.up) {
        logger(`NodeJS server exiting (backed database failure at ${envVariables.USERS_DB_URI}`, AlertLevel.problem);
        process.exit(0);
    }
    else {
        logger(`NodeJS server starting`, AlertLevel.info);
    }
});
if (envVariables.SEED_USERS_JSON_FILE) {
    logger(`Parsng and uploading seed data from ${envVariables.SEED_USERS_JSON_FILE}....`);
    const seedData = JSON.parse(await readFile(envVariables.SEED_USERS_JSON_FILE, { encoding: 'utf8' }));
    console.table(await activeDB.SeedDB(seedData));
}
// start Express server
app.listen(Number(envVariables.PORT), () => {
    logger(`JWT Authorisation Server listening on port ${Number(envVariables.PORT)}`);
});
