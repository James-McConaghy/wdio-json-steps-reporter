const fs = require("fs-extra")
const path = require("path")

module.exports = function generateWebReport(options) {
    const build = options.build ? options.build.toString() : "local"
    const resultsDir = options.resultsDir ? path.normalize(options.resultsDir) : path.normalize("results/")
    const reportDir = options.reportDir ? path.normalize(options.reportDir) : path.normalize("report/")
    const testDir = path.normalize(options.testDir || "test/")

    buildReport(reportDir, resultsDir, build, testDir)
}

function buildReport(reportDir, resultsDir, build, testDir) {
    const reportPath = path.join(reportDir, resultsDir)
    const buildPath = path.join(reportPath, build)
    const srcDirJS = path.join(__dirname, "/site/js/")
    const srcDirCSS = path.join(__dirname, "/site/css/")
    const srcDirHTML = path.join(__dirname, "/site/html/")

    // Delete existing report under build and ensure folder exists after
    fs.removeSync(buildPath, { recursive: true, force: true })
    fs.ensureDirSync(buildPath) 

    // Copy results into report build directory
    fs.copySync(resultsDir, reportPath)

    // Copy / aggregate and move HTML, CSS, JS into report directory
    fs.copyFileSync(path.join(srcDirHTML, "index.html"), path.join(reportDir, "index.html"))
    aggregateFilesIntoFolder(srcDirJS, path.join(reportDir, "script.js"))
    aggregateFilesIntoFolder(srcDirCSS, path.join(reportDir, "stylesheet.css"))

    // Write JSON into report / build
    const listOfResultsFiles = getListOfResultsFilesRecursivly(buildPath)
    const rawJSONResults = extractJSONFromResultsFiles(listOfResultsFiles)
    const mergedJSONResults = mergeJSONResults(rawJSONResults)
    writeJSONFile(buildPath, "merged-results.json", mergedJSONResults)
    writeJSONFile(reportDir, "buildInfo.json", generateBuildInfo(buildPath, testDir))
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

function mergeJSONResults(rawData) {

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

    return aggregatedReport
}

function writeJSONFile(directory, filename, json) {
    const filePath = path.join(directory, filename)
    fs.writeFileSync(filePath, JSON.stringify(json))
}

function aggregateFilesIntoFolder(srcDir, buildFile) {
    fs.existsSync(buildFile) ? fs.unlinkSync(buildFile) : null
    let files = fs.readdirSync(srcDir)
    files.forEach(file => {
        let content = fs.readFileSync(srcDir + file)
        fs.appendFileSync(buildFile, content + "\n\n")
    })
}

function generateBuildInfo(resultsDir, testDir) {
    
    if (resultsDir.endsWith(path.sep)) { resultsDir = resultsDir.slice(0, -1)}

    let build = resultsDir.split(path.sep).pop()
    if (build.match(/^[0-9]+$/) != null) {
        build = parseInt(build)
    }

    return json = {
        "build": build,
        "testDir": path.normalize(path.sep + testDir + path.sep)
    }
}
