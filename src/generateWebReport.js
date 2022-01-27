import path from "path"
import fs from "fs"

function generateWebReport(options) {
    
    const resultsDir = options.resultsDir ? path.normalize(options.resultsDir) : path.normalize("results/")
    const reportDir = options.reportDir ? path.normalize(options.reportDir) : path.normalize("report/")
    
    const testDir = path.normalize(options.testDir || "test/")
    const build = options.build ? options.build.toString() : "local"

    buildReport(resultsDir, reportDir, testDir, build)
}

function buildReport(resultsDir, reportDir, testDir, build) {
    const dirReport = reportDir
    const dirReportPublic = path.join(reportDir, "/public/")
    const dirReportPublicResults = path.join(dirReportPublic, resultsDir)
    const dirReportPublicResultsBuild = path.join(dirReportPublicResults, build)

    const dirResults = resultsDir
    const dirResultsBuild = path.join(dirResults, build)

    const srcReactSite = path.join(__dirname, "/react-site/")
    const srcReactServer = path.join(__dirname, "/react-server/")

    // Delete existing report build, ensure folder exists and copy results build in
    fs.removeSync(dirReportPublicResultsBuild, { recursive: true, force: true })
    fs.ensureDirSync(dirReportPublicResultsBuild)
    fs.copySync(dirResultsBuild, dirReportPublicResultsBuild)
    
    // Copy react site and server into report
    fs.copySync(srcReactSite, dirReport)
    fs.copySync(srcReactServer, dirReport)

    // Write JSON into report / build
    const listOfResultsFiles = getListOfCurrentBuildsResultsJSONFilesRecursivly(dirReportPublicResultsBuild)
    const rawJSONResults = extractJSONFromResultsFiles(listOfResultsFiles)
    const mergedJSONResults = compileJSONResults(rawJSONResults, testDir)
    writeJSONFile(dirReportPublicResultsBuild, "merged-results.json", mergedJSONResults)
}

function getListOfCurrentBuildsResultsJSONFilesRecursivly(resultsDir, foundItems, listOfFiles) {

    listOfFiles = listOfFiles || []
    foundItems = foundItems || fs.readdirSync(resultsDir)

    foundItems.forEach(item => {
        let itemPath = path.join(resultsDir, item)
        if (fs.statSync(itemPath).isDirectory() && item !== "screenshots") {
            listOfFiles = getListOfCurrentBuildsResultsJSONFilesRecursivly(itemPath, fs.readdirSync(itemPath), listOfFiles)
        } else if (fs.statSync(itemPath).isFile() && item === "results.json") {
            listOfFiles.push(itemPath)
        }
    })

    return listOfFiles
}

function extractJSONFromResultsFiles(listOfFiles) {
    return listOfFiles.map(file => {
        return JSON.parse(fs.readFileSync(file))
    })
}

function compileJSONResults(rawData, testDir) {

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
    aggregatedReport.testDir = testDir

    return aggregatedReport
}

function writeJSONFile(directory, filename, json) {
    const filePath = path.join(directory, filename)
    fs.writeFileSync(filePath, JSON.stringify(json))
}

export default { generateWebReport }