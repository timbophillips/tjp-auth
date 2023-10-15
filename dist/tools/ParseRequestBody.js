export async function GetRequestBodyData({ request, essentials, optionals, }) {
    const returnMap = new Map();
    essentials.forEach((key) => {
        console.log(`the key is ${key}`);
        const value = request.body[key];
        console.log(`the value is ${value}`);
        returnMap.set(key, value);
    });
    optionals.forEach((key) => {
        console.log(`the key is ${key}`);
        const value = request.body[key];
        console.log(`the value is ${value}`);
        returnMap.set(key, value);
    });
    return returnMap;
}
