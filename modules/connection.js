const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

const configFilePath = path.join(__dirname, '../config.json');
let configData = {};

try {
    const data = fs.readFileSync(configFilePath);
    configData = JSON.parse(data.toString());
} catch (err) {
    console.error('Error reading config file.', err);
}

const client = new MongoClient(configData.connectStr);
const db = client.db(configData.dbName);
const collection = db.collection(configData.collName);

module.exports = {
    client,
    collection
};