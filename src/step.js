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
    * @return {Promise<Step>} The Step log object that will be used in the resulting json results and combined Steps wrapper.
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

module.exports = { step }