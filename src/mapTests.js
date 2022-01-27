function mapTests(suiteTests) {
    let tests = []
    for (const testName of Object.keys(suiteTests)) {
        const test = suiteTests[testName]
        let testCase = {}

        testCase.name = test.title
        testCase.start = test.start
        testCase.end = test.end
        testCase.duration = test._duration
        testCase.state = test.state
        testCase.steps =  test.state === "skipped" ? [] : test.steps

        if (test.error) {
            if (test.error.type) {
                testCase.errorType = test.error.type
            }
            if (test.error.message) {
                testCase.error = test.error.message
            }
            if (test.error.stack) {
                testCase.standardError = test.error.stack
            }
        }

        tests.push(testCase)
    }
    return tests
}

export default { mapTests }