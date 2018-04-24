const yaml = require('js-yaml');
const fs = require('fs');

let config = {};

try {
    const pathConfig = ('../config');
    const config = yaml.safeLoad(fs.readFileSync(`${pathConfig}/config.yml`, 'utf8'));

} catch(error) {
    console.log(error);
}


const indentedJson = JSON.stringify(config, null, 4);

console.log(indentedJson);