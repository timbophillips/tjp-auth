import fetch from 'node-fetch';
import { CustomLogger } from '../../tools/ConsoleLogger.js';
const logger = CustomLogger('Hasura Database');
export class HasuraDB {
    hasuraAdminSecret = '';
    hasuraGraphQLEndpoint = '';
    hasuraMetadataEndpoint = '';
    hasuraSQLEndpoint;
    hasuraURL;
    constructor(uri) {
        this.hasuraURL = new URL(uri);
        this.hasuraAdminSecret = this.hasuraURL.username;
        this.hasuraGraphQLEndpoint = this.hasuraURL.origin + this.hasuraURL.pathname;
        this.hasuraMetadataEndpoint = this.hasuraURL.origin + '/v1/metadata';
        this.hasuraSQLEndpoint = this.hasuraURL.origin + '/v2/query';
    }
    async checkConnection() {
        return fetch(this.hasuraURL.origin + '/healthz', {
            method: 'GET',
        })
            .then((result) => result.ok)
            .then((bool) => {
            if (bool) {
                return {
                    up: true,
                    message: `${this.hasuraURL.hostname} is responding on port ${this.hasuraURL.port}`,
                };
            }
            else {
                return {
                    up: false,
                    message: `No response from ${this.hasuraURL.host} on port ${this.hasuraURL.port}`,
                };
            }
        })
            .catch((error) => {
            // console.error(e);
            return { up: false, message: error };
        });
    }
    static async build(uri) {
        const hasuraDB = new HasuraDB(uri);
        // await hasuraDB.checkConnection();
        return hasuraDB;
    }
    async hasuraGraphQL(args) {
        // data is returned as undefined if there is an error
        // errors is returned as undefined if there is no error
        const response = await fetch(this.hasuraGraphQLEndpoint, {
            method: 'POST',
            headers: { 'x-hasura-admin-secret': this.hasuraAdminSecret },
            body: JSON.stringify({
                query: args.operationNode,
                variables: args.variables,
                operationName: args.operationName,
            }),
        });
        return (await response.json());
    }
    async hasuraMetadata(json) {
        const hasuraAdminSecret = this.hasuraURL.username || undefined;
        const jsonString = typeof json === 'string' ? json : JSON.stringify(json);
        logger(`hasura endpoint for metadata fetch: ${this.hasuraMetadataEndpoint}`);
        const response = await fetch(this.hasuraMetadataEndpoint, {
            method: 'POST',
            headers: hasuraAdminSecret
                ? { 'x-hasura-admin-secret': hasuraAdminSecret }
                : { 'X-Hasura-Role': 'admin', 'Content-Type': 'application/json' },
            body: jsonString,
        });
        logger(`Response status for metadata fetch: ${response.status}`);
        const responseJSON = await response.json();
        logger(`Response JSON from metadata fetch`);
        console.table(responseJSON);
        return (responseJSON);
    }
    async hasuraRunSQL(sql) {
        logger(`hasura endpoint for SQL fetch: ${this.hasuraSQLEndpoint}`);
        const response = await fetch(this.hasuraSQLEndpoint, {
            method: 'POST',
            headers: this.hasuraAdminSecret
                ? { 'x-hasura-admin-secret': this.hasuraAdminSecret }
                : { 'X-Hasura-Role': 'admin', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'run_sql',
                args: {
                    source: 'authDB',
                    sql: sql,
                },
            }),
        });
        logger(`Response status for SQL fetch: : ${response.status}`);
        const responseJSON = await response.json();
        logger(`Response JSON from SQL fetch`);
        console.table(responseJSON);
        return responseJSON;
    }
}
