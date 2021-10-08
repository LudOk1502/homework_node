const fs = require('fs');
const path = require('path');
const util = require('util');

const filePath = path.join(__dirname, '../', 'dataBase', 'users.json');
let readFilePromise = util.promisify(fs.readFile);
let writeFilePromise = util.promisify(fs.writeFile);

async function readFile() {
    let buffer = await readFilePromise(filePath);
    return JSON.parse(buffer);
}

async function writeFile(write) {
    await writeFilePromise(filePath, JSON.stringify(write));
}

module.exports = {
    readFile,
    writeFile
};