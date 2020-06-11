const WDIOReporter = require("@wdio/reporter").default
const fsExtra = require("fs-extra")
const path = require("path")
const mapHooks = require("./mapHooks")
const mapTests = require("./mapTests")
const initResultSet = require("./initResultSet")
const step = require("./step")
const mergeResults = require("./mergeResults")

class Reporter extends WDIOReporter {

    constructor (options) {
        options = Object.assign(options)
        super(options)

        this.steps = []
        this.outputDir = path.normalize(options.outputDir)
        this.specDir = path.normalize(options.outputDir)
        this.fileName = options.logFile

        process.on("step:log", (stepOptions, step) => {
            this.onStepEvent(stepOptions, step)
        })
    }

    onRunnerStart(runner) {
        if (this.options.logFile) {
            const specName = runner.specs[0]            
            const folderName = specName.substring(specName.lastIndexOf(path.sep) + 1, specName.lastIndexOf("."))
            this.specDir = this.outputDir + path.sep + folderName
            fsExtra.ensureDirSync(this.outputDir)
            fsExtra.ensureDirSync(this.specDir)
        }
    }

    onSuiteStart(suite) {
        this.suiteDir = this.specDir + path.sep + suite.title
    }

    onTestStart() {
        this.steps = []
        this.screenshotPath = this.suiteDir + path.sep + "screenshots"
        fsExtra.ensureDirSync(this.screenshotPath)
    }

    onStepEvent(stepOptions, step) {
        if (stepOptions.createLog) {
            step.order = this.steps.length
            if(stepOptions.takeScreenshot) {
                step.screenshotPath = this.screenshotPath + path.sep + step.order + ".png"
                browser.saveScreenshot(step.screenshotPath)
            }
            this.steps.push(step)
        }
    }

    onTestEnd(test) {
        test.steps = this.steps
    }

    onRunnerEnd (runner) {
        const json = this.prepareJson(runner)
        this.write(JSON.stringify(json))
        fsExtra.moveSync(this.fileName, this.specDir + path.sep + "results.json", {overwrite: true})
    }

    prepareJson (runner) {
        let resultSet = initResultSet(runner)

        for (const specId of Object.keys(runner.specs)) {
            resultSet.specs.push(runner.specs[specId])
            for (const suiteKey of Object.keys(this.suites)) {
                let suite = this.suites[suiteKey]
                suite.path = suite.path ? suite.path : this.specDir + path.sep + suite.title
                suite.suites.forEach((childSuite) => {
                    childSuite.path = suite.path + path.sep + childSuite.title
                })
                if (suite.tests.length > 0) {
                    let testSuite = {}
                    testSuite.name = suite.title
                    testSuite.duration = suite._duration
                    testSuite.start = suite.start
                    testSuite.end = suite.end
                    testSuite.sessionId = runner.sessionId
                    testSuite.tests = mapTests(suite.tests)
                    testSuite.hooks = mapHooks(suite.hooks)
                    testSuite.file = runner.specs[0].substring(runner.specs[0].lastIndexOf(path.sep) + 1, runner.specs[0].length)
                    testSuite.path = suite.path ? suite.path : this.specDir + path.sep + suite.title

                    resultSet.state.failed += testSuite.hooks.filter(hook => hook.error).length
                    resultSet.state.passed += testSuite.tests.filter(test => test.state === "passed").length
                    resultSet.state.failed += testSuite.tests.filter(test => test.state === "failed").length
                    resultSet.state.skipped += testSuite.tests.filter(test => test.state === "skipped").length
                    resultSet.suites.push(testSuite)
                }
            }
        }

        return resultSet
    }
    
}

module.exports = { 
    reporter: Reporter,
    step,
    mergeResults
}