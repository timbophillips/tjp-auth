import { DecodeAuthHeader } from '../tools/DecodeAuthorHeader.js';
import { CheckCredentials } from '../model/CheckCredentials.js';
export function HasuraWebhookRoute(request, response) {
    // decode the HTML header into username and (base65 decoded) password
    DecodeAuthHeader(request)
        .then((decodedCredentials) => CheckCredentials(decodedCredentials))
        .then((result) => {
        response.status(200).json({
            'X-Hasura-Role': result.role || '',
            'X-Hasura-User-Id': result.id.toString(),
        });
    })
        .catch((error) => {
        console.error(error.message);
        response.status(401).json({ error: error.message });
    });
}
