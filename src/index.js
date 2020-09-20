const WDIOReporter = require("@wdio/reporter").default
const fsExtra = require("fs-extra")
const path = require("path")
const mapHooks = require("./mapHooks")
const mapTests = require("./mapTests")
const initResultSet = require("./initResultSet")
const mergeResults = require("./mergeResults")
const saveFullPageScreenshot = require("./screenshot")
const {step, steps} = require("./step")

class Reporter extends WDIOReporter {

    constructor (options) {
        options = Object.assign(options)
        super(options)

        this.beforeAllHooksArray = []
        this.afterAllHooksArray = []

        this.delegatedTest = undefined
        this.delegatedStepsArray = undefined
                
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
            this.screenshotPath = this.specDir + path.sep + "screenshots"
            fsExtra.ensureDirSync(this.screenshotPath)  
        }
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
            this.beforeAllHooksArray.push(hook)
            hook.associatedTest = "*"  
            break
        case "before each":
            hook.associatedTest = this.delegatedTest.title
            this.delegatedStepsArray = this.delegatedTest.steps
            break
        case "after each":
            hook.associatedTest = this.delegatedTest.title
            this.delegatedStepsArray = this.delegatedTest.steps
            break
        case "after all":
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

    onStepEvent(stepOptions, step) {
        if (stepOptions.createLog || stepOptions.takeScreenshot) {
            if (stepOptions.takeScreenshot) {
                step.screenshotPath = this.screenshotPath + path.sep + Date.now() + ".png"
                if (stepOptions.takeScreenshot.toString().toLowerCase() != "viewport" && browser.capabilities.browserName.toLowerCase() == "chrome") {
                    saveFullPageScreenshot(step.screenshotPath)
                } else {
                    browser.saveScreenshot(step.screenshotPath)
                }
            }
            this.delegatedStepsArray.push(step)
        }
        if (step.error) {
            throw step.error
        }
    }

    onRunnerEnd(runner) {
        const json = this.prepareJson(runner)
        this.write(JSON.stringify(json))
        fsExtra.moveSync(this.fileName, this.specDir + path.sep + "results.json", {overwrite: true})
    }

    prepareJson(runner) {
        let resultSet = initResultSet(runner)

        for (const specId of Object.keys(runner.specs)) {
            resultSet.specs.push(runner.specs[specId])
            for (const suiteKey of Object.keys(this.suites)) {
                let suite = this.suites[suiteKey]

                suite.path = suite.path ? suite.path : this.specDir + path.sep + suite.title             
                suite.suites.forEach((childSuite) => {
                    childSuite.path = suite.path + path.sep + childSuite.title

                    //Add before all hooks to each child suite if hook belongs to suite
                    this.beforeAllHooksArray.filter(hook => suite.title === hook.parent).forEach(hook => {
                        childSuite.hooks.unshift(hook)
                    })

                    //Add after all hooks to each child suite if hook belongs to suite
                    this.afterAllHooksArray.filter(hook => suite.title === hook.parent).forEach(hook => {
                        childSuite.hooks.push(hook)
                    })
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
    steps,
    mergeResults
}