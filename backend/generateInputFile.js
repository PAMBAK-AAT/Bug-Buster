

const fs = require('fs');
const path = require('path');

const {v4: uuid} = require('uuid');

const inputPath = path.join(__dirname, 'input');

if(!fs.existsSync(inputPath)){
    fs.mkdirSync(inputPath);
}

const generateInputFile = (input) => {
    const jobId = uuid();
    const filename = `${jobId}.txt`;
    const filePath = path.join(inputPath, filename);
    fs.writeFileSync(filePath, input);
    return filePath;
}

module.exports = {generateInputFile};