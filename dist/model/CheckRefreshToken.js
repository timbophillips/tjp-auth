// import {
//   GetUserWithoutPasswordByIdDB,
//   GetRefreshTokenDB,
//   DeleteTokenDB,
// } from '../database/databaseFactory.js';
import { activeDB } from '../server.js';
export async function CheckRefreshToken(token) {
    const tokenFromDB = await activeDB.GetRefreshTokenDB(token);
    console.log(`${token} matches token from DB with user_id=${tokenFromDB.user}`);
    // if the token has expired then throw an error
    if (new Date(tokenFromDB.expires) < new Date(Date.now())) {
        console.log('token expired');
        return null;
    }
    else {
        console.log(`token is still valid on time criteria`);
        await activeDB.DeleteTokenDB(token);
        console.log(`token removed from DB (can only be used once)`);
        const user = await activeDB.GetUserWithoutPasswordByIdDB(tokenFromDB.user);
        return user;
    }
}
