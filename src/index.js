const WDIOReporter = require("@wdio/reporter").default
const fsExtra = require("fs-extra")
const path = require("path")
const mapHooks = require("./mapHooks")
const mapTests = require("./mapTests")
const initResultSet = require("./initResultSet")
const {generateWebReport} = require("./generateWebReport")
const {step} = require("./step")
const {saveScreenshot, highlight, removeHighlight, removeHighlights} = require("./customCommands")

class Reporter extends WDIOReporter {

    constructor(options) {
        options = Object.assign(options)
        super(options)

        this.beforeAllHooksArray = []
        this.afterAllHooksArray = []

        this.delegatedSuite = []
        this.delegatedTest = undefined
        this.delegatedStepsArray = undefined

        this.build = options.build ? options.build.toString() : "local"
        this.outputDir = options.outputDir ? path.join(options.outputDir, this.build) : path.join("results/", build)
        
        this.testDir = path.normalize(options.testDir || "test/")
        this.fileName = options.logFile

        process.on("step:log", async (stepOptions, step) => {
            await this.onStepEvent(stepOptions, step)
        })
    }

    onRunnerStart(runner) {
        // Create the results folder tree for the current test being executed in the specified output directory
        // The folder strucutre will follow the same structure as the test files location
        if (this.options.logFile) {
            const specName = runner.specs[0]  
            const browserName = runner.capabilities.browserName
            const testResultPath = specName.substring(specName.indexOf(this.testDir) + this.testDir.length, specName.lastIndexOf("."))
            this.resultPath = path.join(this.outputDir, browserName, testResultPath)
            this.screenshotPath = path.join(this.resultPath, "screenshots")
            fsExtra.ensureDirSync(this.screenshotPath)
            fsExtra.ensureDirSync("screenshots/")
        }
    }

    onSuiteStart(suite) {
        suite.associatedSuite = []
        suite.associatedSuite = [...suite.associatedSuite, ...this.delegatedSuite]
        this.delegatedSuite.push(suite.uid)
    }

    onHookStart(hook) {
        hook.steps = []   
        this.delegatedStepsArray = hook.steps
        switch (hook.title.split("\"")[1]) {
        case "before all":
            break
        case "before each":
            break
        case "after each":
            break
        case "after all":
            break
        default:
            break
        }
    }

    onHookEnd(hook) {
        switch (hook.title.split("\"")[1]) {
        case "before all":
            hook.type = "before all"
            this.beforeAllHooksArray.push(hook)
            hook.associatedTest = "*"
            break
        case "before each":
            hook.type = "before each"
            hook.associatedTest = this.delegatedTest.title
            this.delegatedStepsArray = this.delegatedTest.steps
            break
        case "after each":
            hook.type = "after each"
            hook.associatedTest = this.delegatedTest.title
            this.delegatedStepsArray = this.delegatedTest.steps
            break
        case "after all":
            hook.type = "after all"
            hook.associatedTest = "*"
            this.afterAllHooksArray.push(hook)
            break
        default:
            break
        }
    }

    onTestStart(test) {
        test.steps = []
        this.delegatedTest = test
        this.delegatedStepsArray = this.delegatedTest.steps
    }

    async onStepEvent(stepOptions, step) {
        if (stepOptions.createLog || stepOptions.takeScreenshot) {
            if (stepOptions.takeScreenshot) {
                const newScreenshotName = path.join(this.screenshotPath, step.screenshotPath.split("_").pop())
                fsExtra.moveSync(step.screenshotPath, newScreenshotName, {overwrite: true})
                step.screenshotPath = newScreenshotName
            }
            this.delegatedStepsArray.push(step)
        }
    }

    onSuiteEnd(suite) {
        this.delegatedSuite.pop()
    }

    onRunnerEnd(runner) {
        let json = this.prepareJson(runner)
        json = this.organiseJson(json)
        this.write(JSON.stringify(json))
        fsExtra.moveSync(this.fileName, path.join(this.resultPath, "results.json"), {overwrite: true})
    }

    prepareJson(runner) {
        let resultSet = initResultSet(runner, this.testDir)

        for (const specId of Object.keys(runner.specs)) {
            resultSet.specs.push(runner.specs[specId])
            for (const suiteKey of Object.keys(this.suites)) {
                let suite = this.suites[suiteKey]

                suite.path = suite.path ? suite.path : this.resultPath + path.sep + suite.title             

                let testSuite = {}
                testSuite.uid = suite.uid
                testSuite.name = suite.title
                testSuite.duration = suite._duration
                testSuite.start = suite.start
                testSuite.end = suite.end
                testSuite.sessionId = runner.sessionId
                testSuite.associatedSuite = suite.associatedSuite
                testSuite.suites = []
                testSuite.tests = mapTests(suite.tests)
                testSuite.hooks = mapHooks(suite.hooks)
                testSuite.file = runner.specs[0].substring(runner.specs[0].lastIndexOf(path.sep) + 1, runner.specs[0].length)
                testSuite.testPath = runner.specs[0]
                testSuite.resultPath = this.resultPath

                resultSet.state.failed += testSuite.hooks.filter(hook => hook.error).length
                resultSet.state.passed += testSuite.tests.filter(test => test.state === "passed").length
                resultSet.state.failed += testSuite.tests.filter(test => test.state === "failed").length
                resultSet.state.skipped += testSuite.tests.filter(test => test.state === "skipped").length
                
                resultSet.suites.push(testSuite)
            }

            resultSet.state.state = []
            if (resultSet.state.failed > 0) {
                resultSet.state.state.push("failed")
            } else {
                if (resultSet.state.skipped > 0) {
                    resultSet.state.state.push("skipped")
                } 
                if (resultSet.state.passed > 0) {
                    resultSet.state.state.push("passed")
                }
            }
        }

        return resultSet
    }

    organiseJson(json) {

        const orderedByAssociatedSuiteDepth = json.suites.sort((a, b) => {
            return a.associatedSuite.length - b.associatedSuite.length
        })

        for (let i = orderedByAssociatedSuiteDepth.length - 1; i >= 0; i--) {
            let suite = orderedByAssociatedSuiteDepth[i]
            let associatedSuiteUID = suite.associatedSuite[suite.associatedSuite.length - 1]
            if (associatedSuiteUID) {
                let removedSuite = orderedByAssociatedSuiteDepth.splice(i, 1)
                let associatedSuite = orderedByAssociatedSuiteDepth.find(suite => {
                    return suite.uid == associatedSuiteUID
                })
                associatedSuite.suites = [...removedSuite, ...associatedSuite.suites]
            }
            
        }

        return json
    }
    
}

module.exports = { 
    reporter: Reporter,
    step: step,
    generateWebReport: generateWebReport,
    saveScreenshot: saveScreenshot,
    highlight: highlight,
    removeHighlight: removeHighlight,
    removeHighlights: removeHighlights
}