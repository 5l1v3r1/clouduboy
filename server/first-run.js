'use strict';

const fs = require('fs')
const path = require('path')
const tar = require('tar')
const jsonfile = require('jsonfile')

const configFile = path.join(__dirname, '../config.json')
const exampleFile = path.join(__dirname, '../examples.tar.gz')

const templatesDir = path.join(__dirname, '../templates')


// Config file already exists, no need to reconfigure
if (fs.existsSync(configFile)) throw new Error('[!] config.json already exists!');


// config.json defaults
let CFG = {
  SERVER_HOST: 'localhost',
  SERVER_PORT: 8080,

  // Disable short links
  SHORT_LINK_HOST: null,

  // Disable beta limitations
  BETA_KEYS: null,
}


// standard built-in device targets
// TODO: query from build server)
Object.assign(CFG, {
  'TARGETS': [
    {
      id: 'arduboy',
      name: 'Arduboy'
    },
    {
      id: 'tiny_arcade',
      name: 'Tiny Arcade'
    }
  ]
});

// https://github.com/Arduboy/Arduboy/archive/1.1.1.tar.gz
// TODO: deprecate/rethink this, or query build server
Object.assign(CFG, {
  'ARDUBOY_LIBS': [ 'Arduboy-1.1.1' ]
})


// if for some reason the templates directory doesn't exist, create it
if (!fs.existsSync(templatesDir)) {
  fs.mkdirSync(templatesDir)
}

// if there are no templates, extract and include built-in examples
// by default there are two files (.gitignore, README.md) in there
if (fs.readdirSync(templatesDir).length < 3) {
  // TODO: maybe fetch these from a server? or just include them in the repo
  tar.x({
    sync: true, gzip: true,
    cwd: templatesDir, strip: 1,
    file: exampleFile
  })
}

// enumerate templates
let r = fs.readdirSync(templatesDir)
// TODO: figure out metadata and sorting
let examples = r.filter(dir => dir[0] !== '.' && dir !== 'README.md').map(d => {
  return ({
    id: 'examples/'+d,
    src: `${d}/${d}.js`,
    title: d.split('-').map(w => w[0].toUpperCase()+w.substring(1)).join(' '),
    group: 'examples'
  })
})

// there is just one group by default
Object.assign(CFG, {
  'SOURCE_GROUPS': [ { id: 'examples', title: 'Examples' } ],
  'SOURCE_LIST': examples,
})

jsonfile.writeFileSync(configFile, CFG, { spaces: 2 })
// DEBUG: console.log(require('fs').readFileSync(configFile).toString())
console.log('config.json created in application root')

module.exports = CFG;
