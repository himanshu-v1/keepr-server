const { MongoClient } = require('mongodb');
const getConfigData = require('./readConfig');

function getConnection(collectionName) {
    const configFilePath = '../config.json';
    const configData = getConfigData(configFilePath);
    
    console.log('collection: ', collectionName+'');    //
    const client = new MongoClient(configData.connectStr);
    const db = client.db(configData.dbName);
    let collection = '';
    collection = db.collection(collectionName);
        // const r = db.createCollection(collectionName);
        // collection = db.collection(collectionName);

    console.log('finale: ', { client, collection });            //
    return {client, collection};
};


module.exports = getConnection;