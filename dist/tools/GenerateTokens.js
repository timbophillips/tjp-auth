import { generateJWT, generateRefreshToken } from './TokenGenerators.js';
import { CustomLogger } from '../tools/ConsoleLogger.js';
const logger = CustomLogger('Token generator function');
export async function GenerateTokens(user, ip) {
    const [jwt, refreshToken] = await Promise.all([
        generateJWT(user, ip),
        generateRefreshToken(user, ip),
    ]);
    logger(`JWT and refresh tokens generated for ${user.username}`);
    return {
        jwt: jwt,
        refresh_token: refreshToken,
        user: user
    };
}
