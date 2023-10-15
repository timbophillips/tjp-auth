import { generateJWT, generateRefreshToken } from './TokenGenerators.js';
export async function GenerateTokens(user, ip) {
    const [jwt, refreshToken] = await Promise.all([
        generateJWT(user, ip),
        generateRefreshToken(user, ip),
    ]);
    console.log(`JWT and refresh tokens generated for ${user.username}`);
    return {
        jwt: jwt,
        refresh_token: refreshToken,
        user: user
    };
}
