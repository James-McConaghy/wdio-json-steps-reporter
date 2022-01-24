/**
 * The step (single) wrapper should be used to generate a log and screenshot 
 * for page object actions and assertions that the webdriver will execute. 
 * 
 * If nested step Actions/Assertions are used ensure to pass {createStep: false, takeScreenshot: false} to those steps, otherwise
 * step logic will duplicate with this steps wrapping log

    * @param {StepOptions} stepOptions to toggle logging and screenshot generation as well as overriding pre-defined page actions/assertions.
    * @param {string} description of the code to be executed
    * @param {string} expected outcome of the code to be executed
    * @param {string} actual outcome of the code to be executed
    * @param {Function} tasks to be executed by the webdriver
    * @return {Action | Assertion} The Step log object that will be used in the resulting json results and combined Steps wrapper.
*/
async function step(stepOptions = {createLog: true, takeScreenshot: false}, description, expectation, actual, tasks) {
    const step = {
        description: stepOptions.customDescription || description,
        expectation: stepOptions.customExpectation || expectation,
        actual: "",
        state: "pending"
    }
    try {
        await tasks()
        step.actual = stepOptions.customActual || actual
        step.state = "passed"
    }
    catch (error) {
        step.error = error
        step.state = "failed"
        stepOptions.takeScreenshot = true
    }
    finally {
        if (stepOptions.takeScreenshot) {
            step.screenshotPath = `screenshots/${browser.sessionId}_${Date.now() + ".png"}`
            await browser.saveScreenshot(step.screenshotPath, stepOptions.highlightElement)
        }
        process.emit("step:log", stepOptions, step)
        if (step.error) {
            throw step.error
        }
    }
    return step
}

/**
 * The steps (plural) wrapper, similar to the single step wrapper can be used to generate a single log and screenshot for multiple Actions/Assertions
 * executed by the test. All actions will get executed first before any assertions are verified.
 *
 * Actions and Assertions used should accept the default stepOptions passed in via the callback, otherwise step logic
 * will duplicate with this combined steps wrapping log. 
 * 
    * @param {StepOptions} stepOptions to toggle logging and screenshot generation as well as overriding pre-defined page actions/assertions.
    * @param {Action[]} actions An array of step functions to be executed first.
    * @param {Assertion[]} assertions An array of step functions to be executed after completing the actions.
    * 
    * @example steps({createLog: true, takeScreenshot: true},
                [(stepOptions: StepOptions) => navigateToPage("https://webdriver.io", stepOptions)], 
                [(stepOptions: StepOptions) => verifyPageTitle(stepOptions)]
            )
    * 
    * 
*/
async function steps(stepOptions = {createLog: true, takeScreenshot: false}, actions, assertions) {
    const step = {
        description: [],
        expectation: [],
        actual: [],
        state: "pending"
    }
    try {
        for (const action of actions) {
            let completedAction = await action({createLog: false, takeScreenshot: false})
            step.description.push(completedAction.description)
            step.expectation.push(completedAction.expectation)
            step.actual.push(completedAction.actual)
        }
        for (const assertion of assertions) {
            let completedAssertion = await assertion({createLog: false, takeScreenshot: false})
            step.description.push(completedAssertion.description)
            step.expectation.push(completedAssertion.expectation)
            step.actual.push(completedAssertion.actual)
        }
        step.state = "passed"
    }
    catch (error) {
        step.error = error
        step.state = "failed"
        stepOptions.takeScreenshot = true
    }
    finally {
        step.description = stepOptions.customDescription || step.description.join("\n")
        step.expectation = stepOptions.customExpectation || step.expectation.join("\n")
        step.actual = stepOptions.customActual || step.actual.join("\n")
        if (stepOptions.takeScreenshot) {
            step.screenshotPath = `screenshots/${browser.sessionId}_${Date.now() + ".png"}`
            await browser.saveScreenshot(step.screenshotPath, stepOptions.highlightElement)
        }
        process.emit("step:log", stepOptions, step)
        if (step.error) {
            throw step.error
        }
    }
}

module.exports = {step, steps}