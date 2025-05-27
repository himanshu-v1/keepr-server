const { client, collection } = require("./connection");

async function insert(data) {
    try {
        await client.connect();
        const msg = await collection.insertOne(data);
        console.log("db:", msg);
    }
    finally {
        await client.close();
    }
}

async function getAll() {
    try {
        await client.connect();
        return await collection.find().toArray();
    }
    finally {
        await client.close();
    }
}

async function getByQuery(obj) {
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
    console.log('1 query:', query);
    try {
        await client.connect();
        return await collection.findOne(query);
    }
    finally {
        await client.close();
    }
}

async function getSome(query) {
    console.log('2 query:', query);
    try {
        await client.connect();
        return await collection.find(query).toArray();
    }
    finally {
        await client.close();
    }
}

async function deleteById(id) {
    try {
        await client.connect();
        return await collection.deleteOne({ _id: new ObjectId(id + '') });
    }
    finally {
        await client.close();
    }
}

async function updateById(id, newData) {
    try {
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