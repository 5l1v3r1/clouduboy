'use strict';

const diff = require('diff');

let a = 'aa\nbb\ncccc;';
let b = 'aa\nbbb\ncccc;';

let d = diff.diffChars(a,b);



const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');
const microCanvasBuild = require('./build.js');

// Empty testfile - run all tests
let testfile = process.argv[2] || '';

let source = fs.readFileSync( path.join(__dirname, 'testsuite', testfile+'.js' ) ).toString();

let game = microCanvasBuild('arduboy', source, testfile+'.js');

a = fs.readFileSync( path.join(__dirname, 'testsuite', testfile+'.ino' ) ).toString();
b = game.ino;

d = diff.diffTrimmedLines(a.replace(/\r\n/g,'\n').trim(),b.replace(/\r\n/,'\n').trim());

console.log('Compilation finished: ', testfile);
console.log('---');
//console.log(d);

let lc = 0;
d.forEach(c => {
  //console.log( c.added?'+': (c.removed?'-':''), c.count );
  if (c.removed) {
    c.value.replace(/\n$/,'').split(/\n/).forEach((ln,idx) => {
      console.log( ' '.repeat(5-Math.log10(lc))+(lc+idx)+' | '+colors.green(ln) );
    });
  } else if (c.added) {
    c.value.replace(/\n$/,'').split(/\n/).forEach((ln,idx) => {
      console.log( ' '.repeat(5-Math.log10(lc))+(lc+idx)+' | '+colors.red(ln) );
    });
  } else {
    lc += c.count;
  }
});