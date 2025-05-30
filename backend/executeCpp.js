


// code.cpp -> on running -> a.exe(Windows) , ./a.exe -> print output
// code.cpp -> a.out(Mac, Linux) , ./a.out -> print output


const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath, inputFilePath) => {

    return new Promise((resolve, reject) => {

        const jobId = path.basename(filePath).split(".")[0];
        const outputFilePath = path.join(outputPath, `${jobId}.exe`);
        // const inputFilePath = path.join(outputPath, `${jobId}.txt`);

        const command = `g++ "${filePath}" -o "${outputFilePath}" && "${outputFilePath}" < ${inputFilePath}`;

        // console.log("Running command:", command); // ✅ Log command

        exec(command, { shell: true }, (error, stdout, stderr) => {
            if (error) {
                console.error("Compilation Error:", error.message);
                return reject({ error: error.message });
            }
            if (stderr) {
                return reject({ error: error.message, stderr });
            }

            resolve(stdout);
        });
    });
};

module.exports = { executeCpp };
