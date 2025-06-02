const { ObjectId } = require("mongodb");
const getConnection = require("../utilities/connection");
const getConfigData = require('../utilities/readConfig');

const configFilePath = '../config.json';
const configData = getConfigData(configFilePath);
let { client, collection } = {};

async function insert(user, data) {
    try {
        ({ client, collection } = getConnection(user));
        delete data._id;
        await client.connect();
        const msg = await collection.insertOne(data);
        return msg.insertedId;
    }
    finally {
        await client.close();
    }
}

async function getAll(user) {
    try {
        ({ client, collection } = getConnection(user));
        await client.connect();
        return await collection.find().toArray();
    }
    finally {
        await client.close();
    }
}

async function getByQuery(user, obj) {
    ({ client, collection } = getConnection(user));
    let query = {};
    if(Object.keys(obj)[0] === 'id') {
        query._id = new ObjectId(obj.id+'');
        return await getOne(query);
    } else {
        query[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
        return await getSome(query);
    }
}

async function getOne(query) {
    try {
        await client.connect();
        return await collection.findOne(query);
    }
    finally {
        await client.close();
    }
}

async function getSome(query) {
    try {
        await client.connect();
        return await collection.find(query).toArray();
    }
    finally {
        await client.close();
    }
}

async function deleteById(user, id) {
    try {
        ({ client, collection } = getConnection(user));
        await client.connect();
        return await collection.deleteOne({ _id: new ObjectId(id + '') });
    }
    finally {
        await client.close();
    }
}

async function updateById(user, id, newData) {
    try {
        ({ client, collection } = getConnection(user));
        delete newData._id;
        await client.connect();
        return await collection.updateOne(
            { _id: new ObjectId(id + '') },
            { 
                $set: newData,
                $currentDate: { lastModified: true },
            },
            { upsert: true }
        );
    }
    finally {
        await client.close();
    }
}

module.exports = { insert, getAll, getByQuery, deleteById, updateById };