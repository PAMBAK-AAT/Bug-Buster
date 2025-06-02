


const fs = require("fs"); // It helps to access all the files that are present in my backend folder.
const path = require("path"); // It helps to provide path of any file

const { v4: uuid } = require("uuid"); // It helps to generate unique id for each file

const dirCodes = path.join(__dirname, "codes"); // It only create a path with /backend/codes

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, { recursive: true }); // It creates a directory with name codes in backend folder
}

const generateFile = (language, code) => {
    const jobId = uuid(); // It generates a unique id for each file, c7d8e58a-94bb-4e3e-bef2-4b5f97c1f725
    const filename = `${jobId}.${language}`; // It creates a file name with unique id and language, c7d8e58a-94bb-4e3e-bef2-4b5f97c1f725.cpp
    const filePath = path.join(dirCodes, filename); // It creates a path with /backend/codes/c7d8e58a-94bb-4e3e-bef2-4b5f97c1f725.cpp
    fs.writeFileSync(filePath, code); // It add the code on the filePath
    return filePath;
};

module.exports = { generateFile};

