import fetch from 'node-fetch';
let hasuraAdminSecret = '';
let hasuraGraphQLEndpoint = '';
let hasuraMetadataEndpoint = '';
let hasuraSQLEndpoint;
let hasuraURL;
export async function connectDB(uri) {
    hasuraURL = new URL(uri);
    hasuraAdminSecret = hasuraURL.username;
    hasuraGraphQLEndpoint = hasuraURL.origin + hasuraURL.pathname;
    hasuraMetadataEndpoint = hasuraURL.origin + '/v1/metadata';
    hasuraSQLEndpoint = hasuraURL.origin + '/v2/query';
    return fetch(hasuraURL.origin + '/healthz', {
        method: 'GET',
    })
        .then((result) => result.ok)
        .then((bool) => {
        if (bool) {
            return {
                up: true,
                message: `${hasuraURL.hostname} is responding on port ${hasuraURL.port}`,
            };
        }
        else {
            return {
                up: false,
                message: `No response from ${hasuraURL.host} on port ${hasuraURL.port}`,
            };
        }
    })
        .catch((error) => {
        // console.error(e);
        return { up: false, message: error };
    });
}
export async function hasuraGraphQL(args) {
    // data is returned as undefined if there is an error
    // errors is returned as undefined if there is no error
    const response = await fetch(hasuraGraphQLEndpoint, {
        method: 'POST',
        headers: { 'x-hasura-admin-secret': hasuraAdminSecret },
        body: JSON.stringify({
            query: args.operationNode,
            variables: args.variables,
            operationName: args.operationName,
        }),
    });
    return (await response.json());
}
export async function hasuraMetadata(json) {
    const hasuraAdminSecret = hasuraURL.username || undefined;
    const jsonString = typeof json === 'string' ? json : JSON.stringify(json);
    console.log(`hasura endpoint for metadata fetch: ${hasuraMetadataEndpoint}`);
    const response = await fetch(hasuraMetadataEndpoint, {
        method: 'POST',
        headers: hasuraAdminSecret
            ? { 'x-hasura-admin-secret': hasuraAdminSecret }
            : { 'X-Hasura-Role': 'admin', 'Content-Type': 'application/json' },
        body: jsonString,
    });
    console.log(`Response status for metadata fetch: ${response.status}`);
    const responseJSON = await response.json();
    console.log(`Response JSON from metadata fetch`);
    console.table(responseJSON);
    return (responseJSON);
}
export async function hasuraRunSQL(sql) {
    console.log(`hasura endpoint for SQL fetch: ${hasuraSQLEndpoint}`);
    const response = await fetch(hasuraSQLEndpoint, {
        method: 'POST',
        headers: hasuraAdminSecret
            ? { 'x-hasura-admin-secret': hasuraAdminSecret }
            : { 'X-Hasura-Role': 'admin', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: 'run_sql',
            args: {
                source: 'authDB',
                sql: sql,
            },
        }),
    });
    console.log(`Response status for SQL fetch: : ${response.status}`);
    const responseJSON = await response.json();
    console.log(`Response JSON from SQL fetch`);
    console.table(responseJSON);
    return responseJSON;
}
