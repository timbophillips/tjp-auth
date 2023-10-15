// ESM
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { randomBytes } from 'crypto';
import { envVariables } from '../server.js';
export async function generateJWT(user, ip) {
    // environment variables
    const jwtTokenExpiresMins = envVariables.JWT_TOKEN_EXPIRES_MINS;
    const hasuraGraphqlJWTSecret = JSON.parse(envVariables.HASURA_GRAPHQL_JWT_SECRET);
    // this bit of JS trickery
    // subs in a empty array if user.roles doesn't exist - using || []
    // adds the user.role in to the array user.roles - using concat
    // and then deletes duplicates - using [... new Set()]
    const roles = [...new Set((user.roles || []).concat(user.role))];
    // create and return the token
    return sign({
        'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': roles,
            'x-hasura-default-role': user.role,
            'x-hasura-role': user.role,
            'x-hasura-user-id': user.id.toString(),
            'x-hasua-user-username': user.username,
            'x-hasura-group': user.group?.toString() || '0',
        },
        createdByIp: ip,
        sub: user.id.toString(),
        id: user.id.toString(),
    }, hasuraGraphqlJWTSecret.key, {
        algorithm: hasuraGraphqlJWTSecret.type,
        expiresIn: `${jwtTokenExpiresMins}m`,
    });
}
export async function generateRefreshToken(user, ip) {
    // environment variables
    const refreshTokenExpiresDays = parseInt(envVariables.REFRESH_TOKEN_EXPIRES_DAYS);
    // create a refresh token that expires in x days
    const token = {
        user: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + refreshTokenExpiresDays * 24 * 60 * 60 * 1000),
        ip: ip,
    };
    return token; // await AddTokenDB(token);
}
function randomTokenString() {
    return randomBytes(40).toString('hex');
}
