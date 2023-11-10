const { readFileSync, writeFileSync } = require('fs')

const packageData = readFileSync('../package.json', { encoding: 'utf-8' })
const jsonFile = JSON.parse(packageData)

jsonFile.devDependencies = {}

writeFileSync('package.json', JSON.stringify(jsonFile, null, 2))
