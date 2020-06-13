module.exports = function step(stepOptions = { createLog: true, takeScreenshot: false }, description, expectation, actual, tasks) {
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
}