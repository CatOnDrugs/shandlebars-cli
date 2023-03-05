const { readJSON, writeJSON, isExist } = require('./fileProcess')
const path = require('path')
const { configPath: config_path } = require('./config')

async function initModule()  {
    return new Promise((resolve) => {
        resolve()
    }).then(() => {
        return isExist('./node_modules/handlebars')
    }).catch(() => {
        console.log( `Handlebars module is not exist` )
        console.log( `Try create link to Handlebars` )
        const {exec} = require('child_process');
        return new Promise(( resolve, reject ) => {
            exec('npm link handlebars', (err, stdout, stderr) => {
                if (err) { reject(err) }
                else { resolve(stdout) }
            })
        })
    }).then(( data ) => {
        if(data!=undefined) { console.log('Create link to Package handlebars'); }
    }).catch(() => {
        console.log( `Create link to Package handlebars: failed` );
        console.log( `Package handlebars not install global. Try:` );
        console.log( `Install handlebars:` );
        console.log( `npm install -g handlebars` );
        console.log( `shandlebars --init-module` );
    }).finally( process.exit )
}

async function init() {
    const {exec} = require('child_process');
    await new Promise(( resolve, reject ) => {
        exec('npm root -g', (err, stdout, stderr) => {
            console.log( `Try get npm root global ` )
            if (err) { reject(err) }
            else { resolve(stdout) }
        })
    }).catch(() => {
        console.log( `Command 'npm root -g' is not work` )
        console.log( `Find path to npm node_moudles` )
        console.log( `And try command:\nshandlebars --config.globalpath <path>` )
        process.exit()
    }).then(( data ) => {
        if ( data.endsWith("\n") ) { return(data.slice(0, data.length - 1)) }
        else { return(data) }
    }).then(( data ) => {
        return readJSON( config_path ).then(( json ) => {
            json.globalPath = data
            return json
        })
    }).catch(() => {
        const { name: pkg_name } = require('../package.json')
        console.log( `File '${path.resolve(pkg_name, config_path)}' is not exist` )
        console.log( `Reinstall ${pkg_name} package` )
        process.exit()
    }).then(( json_data ) => {
        console.log( `Success!\nnpm root global: ${json_data.globalPath}` )
        return writeJSON( config_path, json_data )
    }).catch((err) => {
        console.error( `Cannot write to file: ${config_path}` )
        console.log( err )
    }).finally( process.exit )
}

module.exports = { init, initModule };
