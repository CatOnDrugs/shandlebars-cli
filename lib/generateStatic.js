const fs = require('fs');
const path = require('path');

async function generateStatic( hbsData, jsonData, static_path ) {
    var template = hbs.compile(hbsData);
    var data = template(jsonData);
    await writeFile( static_path, data );
}
