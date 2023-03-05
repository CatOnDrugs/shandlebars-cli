const fs = require('fs');

function isExist( filepath ) {
    return new Promise(( resolve, reject ) => {
        fs.access(filepath, fs.constants.F_OK, (err) => {
            if (err === null) { resolve() }
            else { reject() }
        })
    })
}

function readFile( filepath, encoding='utf-8' ) { 
    return new Promise((resolve, reject) => {
        fs.readFile( filepath, encoding, (err, data) => {
            if (err) { reject(err) }
            else { resolve(data) }
        })
    })
}

function readJSON( filepath, encoding='utf-8' ) { 
    return readFile( filepath, encoding ).then((data) => {
        return JSON.parse(data.toString());
    })
}

function writeFile( filepath, data ) { 
    return new Promise((resolve, reject) => {
        // console.log( filepath ) 
        fs.writeFile( filepath, data, err => {
            if (err) { reject(err) }
            else { resolve( data ) }
        })
    })
}

function writeJSON( filepath, data ) { 
    return new Promise((resolve, reject) => {
        // console.log( filepath )
        const jsonData = JSON.stringify(data)
        fs.writeFile( filepath, jsonData, err => {
            if (err) { reject(err) }
            else { resolve( jsonData ) }
        })
    })
}

//


function getDirList( path ) {
    return new Promise(( resolve ) => {
        fs.readdir(path, (err, data) => {
            if(err) { reject(err) }
            else { resolve(data) }
        })
    })
}

function getFileList( path ) {
    return new Promise(( resolve ) => {
        fs.readdir(path, { withFileTypes: true }, (err, data) => {
            if(err) { reject(err) }
            else { resolve(data) }
        })
    }).then(( dirList ) => {
        const res = []
        dirList.forEach( dir => {
            if ( dir.isFile() ) { res.push( dir.name ) }
        });
        return res;
    })
}

function getFolderList( path ) {
    return new Promise(( resolve ) => {
        fs.readdir(path, { withFileTypes: true }, (err, data) => {
            if(err) { reject(err) }
            else { resolve(data) }
        })
    }).then(( dirList ) => {
        const res = []
        dirList.forEach( dir => {
            if ( dir.isDirectory() ) { res.push( dir.name ) }
        });
        return res;
    })
}

module.exports = {
    readFile,
    readJSON,
    writeFile,
    writeJSON,
    isExist,
    getDirList,
    getFileList,
    getFolderList
}