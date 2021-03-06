const fs = require("fs-extra")
const path = require("path")

module.exports = function generateWebReport(options) {
    const resultsDir = options.resultsDir || "results"
    const customFileName = options.customFilename || "merged-results.json"
    const listOfResultsFiles = getListOfResultsFilesRecursivly(resultsDir)
    const rawData = extractJSONFromResultsFiles(listOfResultsFiles)
    const mergedResults = mergeData(rawData)
    writeFile(resultsDir, mergedResults, customFileName)
    buildReport(resultsDir)
}

function getListOfResultsFilesRecursivly(resultsDir, foundItems, listOfFiles) {

    listOfFiles = listOfFiles || []
    foundItems = foundItems || fs.readdirSync(resultsDir)

    foundItems.forEach(item => {
        let itemPath = path.join(resultsDir, item)
        if (fs.statSync(itemPath).isDirectory() && item !== "screenshots") {
            listOfFiles = getListOfResultsFilesRecursivly(itemPath, fs.readdirSync(itemPath), listOfFiles)
        } else if (fs.statSync(itemPath).isFile() && item === "results.json") {
            listOfFiles.push(itemPath)
        }
    })

    return listOfFiles
}

function extractJSONFromResultsFiles(listOfFiles) {
    const extractedJSON = listOfFiles.map(file => {
        return JSON.parse(fs.readFileSync(file))
    })
    return extractedJSON
}

function mergeData(rawData) {

    const aggregatedReport = {
        passed: 0,
        failed: 0,
        skipped: 0,
        start: 0,
        end: 0
    }
    rawData.forEach(data => {
        aggregatedReport.passed = aggregatedReport.passed ? aggregatedReport.passed + data.state.passed : data.state.passed
        aggregatedReport.failed = aggregatedReport.failed ? aggregatedReport.failed + data.state.failed : data.state.failed
        aggregatedReport.skipped = aggregatedReport.skipped ? aggregatedReport.skipped + data.state.skipped : data.state.skipped
        aggregatedReport.start = aggregatedReport.start ? (data.start < aggregatedReport.start ? data.start : aggregatedReport.start) : data.start
        aggregatedReport.end = aggregatedReport.end ? (data.end > aggregatedReport.end ? data.end : aggregatedReport.end) : data.end
    })

    aggregatedReport.results = rawData



    //let mergedResults
    //rawData.forEach(data => {
    //     if (mergedResults === undefined) {
    //         // use the first result so that we have the right shape
    //         mergedResults = {}
    //         Object.assign(mergedResults, data)
    //         mergedResults.capabilities = [mergedResults.capabilities] // make this an array so we can capture all caps
    //     } else {
    //         mergedResults.suites.push(...data.suites)
    //         mergedResults.specs.push(...data.specs)
    //         mergedResults.state.passed += data.state.passed
    //         mergedResults.state.failed += data.state.failed
    //         mergedResults.state.skipped += data.state.skipped
    //         mergedResults.capabilities.push(data.capabilities)
    //     }
    // })

    // mergedResults.suites.forEach((suite) => {
    //     mergedResults.end = (suite.end > mergedResults.end ? suite.end : mergedResults.end)
    // })

    return aggregatedReport
}

function writeFile(dir, mergedResults, fileName) {
    const filePath = path.join(dir, fileName)
    fs.writeFileSync(filePath, JSON.stringify(mergedResults))
}


function buildReport(resultsDir) {
    const buildDir = "./report/"
    const targetDir = resultsDir.replace("./", buildDir)
    const srcDirJS = __dirname + "/site/js/"
    const srcDirCSS = __dirname + "/site/css/"
    const srcDirHTML = __dirname + "/site/html/"
    

    fs.rmdirSync(buildDir, { recursive: true });
    fs.ensureDirSync(buildDir)
    fs.ensureDirSync(targetDir) 
    fs.copySync(resultsDir, targetDir)
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