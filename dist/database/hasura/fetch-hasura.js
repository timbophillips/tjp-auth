import fetch from "node-fetch";
export async function fetchHasuraGraphQL({ hasuraURI, operationName, query, variables, }) {
    const hasuraURL = new URL(hasuraURI);
    const hasuraAdminSecret = hasuraURL.username || undefined;
    // if an endpoint is provided then use it
    // otherwise use the one in the provided URI string
    const hasuraEndpoint = hasuraURL.origin + hasuraURL.pathname;
    console.log(`hasura endpoint: ${hasuraEndpoint}`);
    // data is returned as undefined if there is an error
    // errors is returned as undefined if there is no error
    const requestInit = {
        method: "POST",
        headers: hasuraAdminSecret
            ? { "x-hasura-admin-secret": hasuraAdminSecret }
            : {},
        body: JSON.stringify({
            query,
            variables,
            operationName,
        }),
    };
    const response = await fetch(hasuraEndpoint, requestInit);
    console.log(`Response status: ${response.status}`);
    if (response.status > 299) {
        throw new Error(response.status.toString());
    }
    return (await response.json());
}
export async function fetchHasuraMetadata({ hasuraURI, json, }) {
    const hasuraURL = new URL(hasuraURI);
    const hasuraAdminSecret = hasuraURL.username || undefined;
    // if an endpoint is provided then use it
    // otherwise use the one in the provided URI string
    const hasuraEndpoint = hasuraURL.origin + "/v1/metadata";
    const jsonString = typeof json === "string" ? json : JSON.stringify(json);
    console.log(`hasura endpoint: ${hasuraEndpoint}`);
    // data is returned as undefined if there is an error
    // errors is returned as undefined if there is no error
    const requestInit = {
        method: "POST",
        headers: hasuraAdminSecret
            ? { "x-hasura-admin-secret": hasuraAdminSecret }
            : { "X-Hasura-Role": "admin", "Content-Type": "application/json" },
        body: jsonString,
    };
    const response = await fetch(hasuraEndpoint, requestInit);
    console.log(`Response status: ${response.status}`);
    const responseText = await response.text();
    console.log(`Response Text ${responseText}`);
    return responseText;
}
export async function fetchHasuraRunSQL({ hasuraURI, sql, }) {
    const hasuraURL = new URL(hasuraURI);
    const hasuraAdminSecret = hasuraURL.username || undefined;
    // if an endpoint is provided then use it
    // otherwise use the one in the provided URI string
    const hasuraEndpoint = hasuraURL.origin + "/v2/query";
    console.log(`hasura endpoint: ${hasuraEndpoint}`);
    // data is returned as undefined if there is an error
    // errors is returned as undefined if there is no error
    const requestInit = {
        method: "POST",
        headers: hasuraAdminSecret
            ? { "x-hasura-admin-secret": hasuraAdminSecret }
            : { "X-Hasura-Role": "admin", "Content-Type": "application/json" },
        body: JSON.stringify({
            type: "run_sql",
            args: {
                source: "authDB",
                sql: sql,
            },
        }),
    };
    const response = await fetch(hasuraEndpoint, requestInit);
    console.log(`Response status: ${response.status}`);
    const responseText = await response.text();
    console.log(`Response Text ${responseText}`);
    return responseText;
}
