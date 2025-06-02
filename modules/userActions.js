const { ObjectId } = require("mongodb");
const getConnection = require("../utilities/connection");
const getConfigData = require('../utilities/readConfig');

const configFilePath = '../config.json';
const configData = getConfigData(configFilePath);
const { client, collection } = getConnection(configData.userCollectionName);

async function authenticateUser(username, password, isMet) {
    try {
        let res = {
            message: 'errors',
        };
        const user = await findUser(username);
        if(user) {
            if(await authenticate(user, password)) {
                res.message = 'authenticated';
                res.acknowledged = true;
                res.insertedId = user._id;
            }
        } else {
            if(isMet) {
                const newUser = await createUser({
                    uname: username,
                    prd: password
                });
                res.message = newUser.acknowledged ? 'created' : 'error';
                res.acknowledged = newUser.acknowledged;
                res.insertedId = newUser.insertedId;
            } else {
                res = 'cred error';
            }
        }
        return res;
    }
    catch (err) {
        throw err;
    }
}

async function findUser(username) {
    await client.connect();
    const user = await collection.findOne({ uname: username });
    if (user) {
        return user;
    }
    else {
        return false;
    }
}

async function authenticate(user, password) {
    if (user && user.prd === password) {
        return true;
    }
    else {
        return false;
    }
}

async function createUser(userObj) {
    try {
        await client.connect();
        const result = await collection.insertOne(userObj);
        return result;
    }
    catch(err){
        throw err;
    } finally{
        await client.close();
    }
}

module.exports = { authenticateUser };