#!/usr/bin/env node
/*
function readStream(s, done) {
    var bufs=[];
    console.log(s);
    s.on('data', function(d) {
        bufs.push(d);
    })
    console.log(s);
    s.on('end', function() {
        done(null, Buffer.concat(bufs));
    });
    console.log(s);
    s.resume();
}

readStream(process.stdin, function(err, tmpl) {
});

return;
*/


const fs   = require('fs');
const path = require('path')
// const hbs  = require(path.resolve(__dirname, '../../handlebars/lib/handlebars'));
const {exec} = require('child_process');
const hbs = require('handlebars');
console.log(hbs);
if (hbs === undefined )  {
    console.log('aaa');
    exec('npm link handlebars', (err, stdout, stderr) => {
        if (err) {
            console.log('Package handlebars not install global');
            console.log('Install handlebars: npm install -g handlebars');
            console.log( err );
            return;
        }
        if (stderr) { console.log(stderr); return;}

        console.log('Package handlebars is OK');
    });
    console.log('bb');
     hbs = require('handlebars');
}

let args = process.argv;
const filepath = process.cwd();
args = args.slice(2);

try {
    console.log( path.resolve(filepath, args[0]) );
    var json = JSON.parse(fs.readFileSync(path.resolve(filepath, args[0])).toString());
} catch (e) { }

console.log( path.resolve(filepath, args[1]) );
fs.readFile( path.resolve(filepath, args[1]), 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    var template = hbs.compile(data.toString());
    var result = template(json);
    fs.writeFile(path.resolve(filepath, args[2]), result, err => {
        if (err) {
          console.error(err);
        }
        console.log('done');
    });
})

