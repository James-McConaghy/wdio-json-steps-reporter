const fs = require("fs-extra")
const path = require("path")

module.exports = function mergeAndBuildReport(...args) {
    const dir = args[0]
    const customFileName = args[1] || Date.now()
    const rawData = getDataFromFiles(dir)
    const mergedResults = mergeData(rawData)
    writeFile(dir, mergedResults, customFileName)
    buildReport(dir)
}

function getDataFromFiles(dir) {
    let fileNames = []
    fs.readdirSync(dir).filter(directory => fs.statSync(dir+path.sep+directory).isDirectory()).forEach(directory => {
        fileNames.push(dir+path.sep+directory+path.sep+"results.json")
    })

    let data = []
    fileNames.forEach(fileName => {
        data.push(JSON.parse(fs.readFileSync(fileName)))
    })

    return data
}

function mergeData(rawData) {
    let mergedResults
    rawData.forEach(data => {
        if (mergedResults === undefined) {
            // use the first result so that we have the right shape
            mergedResults = {}
            Object.assign(mergedResults, data)
            mergedResults.capabilities = [mergedResults.capabilities] // make this an array so we can capture all caps
        } else {
            mergedResults.suites.push(...data.suites)
            mergedResults.specs.push(...data.specs)
            mergedResults.state.passed += data.state.passed
            mergedResults.state.failed += data.state.failed
            mergedResults.state.skipped += data.state.skipped
            mergedResults.capabilities.push(data.capabilities)
        }
    })

    mergedResults.suites.forEach((suite) => {
        mergedResults.end = (suite.end > mergedResults.end ? suite.end : mergedResults.end)
    })

    return mergedResults
}

function writeFile(dir, mergedResults, customFileName) {
    const fileName = customFileName || "wdio-merged.json"
    const filePath = path.join(dir, fileName)
    fs.writeFileSync(filePath, JSON.stringify(mergedResults))
}


function buildReport(dir) {
    const buildDir = "./report/"
    const targetDir = dir.replace("./", buildDir)
    const srcDirJS = __dirname + "/site/js/"
    const srcDirCSS = __dirname + "/site/css/"
    const srcDirHTML = __dirname + "/site/html/"
    

    fs.rmdirSync(buildDir, { recursive: true });
    fs.ensureDirSync(buildDir)
    fs.ensureDirSync(targetDir) 
    fs.copySync(dir, targetDir)
    fs.copyFileSync(srcDirHTML+"index.html", buildDir+"index.html")
    mergeToBuild(srcDirJS, buildDir+"script.js")
    mergeToBuild(srcDirCSS, buildDir+"stylesheet.css")
}

function mergeToBuild(srcDir, buildFile) {
    let files = fs.readdirSync(srcDir)
    files.forEach(file => {
        let content = fs.readFileSync(srcDir + file)
        fs.appendFileSync(buildFile, content + "\n\n")
    })
}  