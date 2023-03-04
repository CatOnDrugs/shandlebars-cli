const fs = require('fs');
const hbsPromise = importHandlebars(); // Do this: const hbs = require('handlebars');

hbsPromise.then(() => {
    generateStatic(
        'C:/Users/Cucumber/Documents/MyProjects/2023.03-(Node)HandlebarsTerminal/lib/.text.handlebars',
        'C:/Users/Cucumber/Documents/MyProjects/2023.03-(Node)HandlebarsTerminal/lib/.text.json',
        'C:/Users/Cucumber/Documents/MyProjects/2023.03-(Node)HandlebarsTerminal/lib/.text.txt'
    )
})

function callbackGlobalHBS() {
    global["hbs"] = require('handlebars');
}

function importHandlebars() {
    return new Promise(( resolve, reject ) => {
        fs.exists('./node_modules/handlebars', (exists) => {
            if (!exists) { reject(exists) }
            else { resolve() }
        })
    }).catch(() => {
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
        process.exit();
    }).finally(callbackGlobalHBS)
}

async function generateStatic( hbsFilepath, jsonFilepath, staticFilepath ) {
    hbsData = await readFile( hbsFilepath );
    jsonData = await readJSON( jsonFilepath );
    var template = hbs.compile(hbsData);
    var data = template(jsonData);
    await writeFile( staticFilepath, data );
}

function readFile( filepath, encoding='utf-8' ) { 
    return new Promise((resolve, reject) => {
        console.log( filepath ) 
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
        console.log( filepath ) 
        fs.writeFile( filepath, data, err => {
            if (err) { reject(err) }
            else { resolve() }
        })
    })
}
