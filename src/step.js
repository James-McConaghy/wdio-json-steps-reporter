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
function step(stepOptions = {createLog: true, takeScreenshot: false}, description, expectation, actual, tasks) {
    const step = {
        description: stepOptions.customDescription || description,
        expectation: stepOptions.customExpectation || expectation,
        actual: "",
        status: "pending"
    }
    try {
        tasks()
        step.actual = stepOptions.customActual || actual
        step.status = "passed"
    }
    catch (error) {
        step.error = error
        step.status = "failed"
        stepOptions.takeScreenshot = true
    }
    finally {
        process.emit("step:log", stepOptions, step)
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
function steps(stepOptions = {createLog: true, takeScreenshot: false}, actions, assertions) {
    const step = {
        description: [],
        expectation: [],
        actual: [],
        status: "pending"
    }
    try {
        actions.forEach(action => {
            let completedAction = action({createLog: false, takeScreenshot: false})
            step.description.push(completedAction.description)
            step.expectation.push(completedAction.expectation)
            step.actual.push(completedAction.actual)
        });
        assertions.forEach(assertion => {
            let completedAssertion = assertion({createLog: false, takeScreenshot: false})
            step.description.push(completedAssertion.description)
            step.expectation.push(completedAssertion.expectation)
            step.actual.push(completedAssertion.actual)
        });
        step.status = "passed"
    }
    catch (error) {
        step.error = error
        step.status = "failed"
        stepOptions.takeScreenshot = true
    }
    finally {
        step.description = stepOptions.customDescription || step.description.join("\n")
        step.expectation = stepOptions.customExpectation || step.expectation.join("\n")
        step.actual = stepOptions.customActual || step.actual.join("\n")
        process.emit("step:log", stepOptions, step)
    }
}

module.exports = {step, steps}