const fs = require('fs');
const hbs = importHandlebars();

function addHandlebarsPackage() {
    const {exec} = require('child_process');

    exec('npm link handlebars', (err, stdout, stderr) => {
    if (err) {
        console.log( `Create link to Package handlebars: failed` );
        console.log( `Package handlebars not install global. Try:` );
        console.log( `Install handlebars:` );
        console.log( `npm install -g handlebars` );
        process.exit();
    }
    if (stderr) { console.log(stderr); return;}

    console.log('Create link to Package handlebars');
});
}

function importHandlebars() {
    console.log('aa')
    fs.exists('../node_module/handlebars', (exists) => {
        console.log(exists);
        if (!exists) { addHandlebarsPackage() }
    });
    console.log('bb')

    try {
        return require('handlebars');
    } catch(e) {
        console.log( `Cannot import handlebars. Try:` );
        console.log( `npm install -g handlebars` );
        // process.exit();
    }
}

function check() {
}