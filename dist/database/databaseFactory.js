import { mongodbObject } from './mongodbFactory.js';
import { hasuraObject } from './hasuraFactory.js';
import { inMemoryObject } from './inMemoryFactory.js';
import { localDBObject } from './local/localDB.js';
const dbOptions = {
    hasura: hasuraObject,
    mongodb: mongodbObject,
    inMemory: inMemoryObject,
    localFile: localDBObject,
};
export const db = (type) => dbOptions[type];
export const startDB = async (type, uri, seedData) => {
    const activeDB = dbOptions[type];
    await activeDB.ConnectDB(uri);
    if (seedData) {
        await activeDB.SeedDB(seedData);
    }
    return activeDB;
};
