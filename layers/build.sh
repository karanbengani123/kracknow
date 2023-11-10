# Create a new package.json file omitting devDependencies
node ./make-package-json-file.js

# Install node modules 
npm i

# Create a zip file deps.zip with node_modules and package.json file
#zip -r deps.zip node_modules package.json