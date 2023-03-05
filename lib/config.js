const fs = require('fs');
const configPath = './config.json';

const { readJSON, writeJSON } = require('./fileProcess');


function setConfig( key, value ) {
    readJSON( configPath ).then(( json ) => {
        json[key] = value;
        return json;
    }).catch(() => {
        const { name: pkg_name } = require('../package.json')
        console.log( `File '${path.resolve(pkg_name, config_path)}' is not exist` )
        console.log( `Reinstall ${pkg_name} package` )
        process.exit()
    }).then((json) => {
        console.log(json)
        return writeJSON( configPath, json )
    }).catch((err) => {
        console.log( `Cannot write config.json` )
        console.log( err )
        process.exit()
    }).finally( process.exit )
}

module.exports = { setConfig, configPath }

setConfig( 'test', '126.08')