const path = require('path')
const { globalPath } = require('../config.json')
const hbs = require( path.resolve(globalPath, './handlebars/dist/handlebars.min.js') )
const { readFile, readJSON, writeFile } = require('./fileProcess')

async function generateStatic( handlebars, json, outputPath ) {
    var template = hbs.compile(handlebars);
    var data = template(json);
    await writeFile( outputPath, data );
}


