const { MongoClient } = require('mongodb');
const getConfigData = require('./readConfig');

function getConnection(collectionName) {
    const configFilePath = '../config.json';
    const configData = getConfigData(configFilePath);
    
    const client = new MongoClient(configData.connectStr);
    const db = client.db(configData.dbName);
    let collection = '';
    collection = db.collection(collectionName);
    return {client, collection};
};


module.exports = getConnection;