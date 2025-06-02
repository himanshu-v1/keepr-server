const fs = require('fs');
const path = require('path');

function getConfigData(configFilePath) {
    // const configFilePath = path.join(__dirname, '../config.json');
    const _path = path.join(__dirname, configFilePath);
    let configData = {};

    try {
        const data = fs.readFileSync(_path);
        configData = JSON.parse(data.toString());
    } catch (err) {
        console.error('Error reading config file.', err);
    } finally {
        return configData;
    }
}

module.exports = getConfigData;