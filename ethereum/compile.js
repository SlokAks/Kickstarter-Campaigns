const path = require("path");
const solc = require("solc");
const fs = require("fs-extra"); // Community version of 'fs' module with extra functionality

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);   // Delete the entire build folder

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);    // See if a directory exists, if not then create

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}