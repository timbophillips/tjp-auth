import { readFile } from 'node:fs/promises';
import { mongoInitAndMongoDB } from './initAndSeedMongoDB.js';
const uri = process.argv[2] || 'mongodb://root:example@localhost:27017';
const jsonDataFile = process.argv[3] || 'examples/example-users.json';
let seedData;
seedData = await readFile(jsonDataFile, { encoding: 'utf8' })
    .then((jsonData) => {
    console.log('json data file used...');
    return JSON.parse(jsonData);
})
    .catch((e) => {
    console.log('json read failed...');
    console.error(e);
    throw new Error('json read failed...');
});
await mongoInitAndMongoDB({ uri, seedData }).catch((e) => {
    console.log('uploading seed data to mongo failed');
    console.error(e);
});
