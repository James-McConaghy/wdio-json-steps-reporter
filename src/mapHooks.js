module.exports = function mapHooks(suiteHooks) {
    let hooks = []
    for (const hookName of Object.keys(suiteHooks)) {
        const hook = suiteHooks[hookName]
        let hookResult = {}

        hookResult.start = hook.start
        hookResult.end = hook.end
        hookResult.duration = hook._duration
        hookResult.title = hook.title
        hookResult.type = hook.type
        hookResult.associatedSuite = hook.parent
        hookResult.associatedTest = hook.associatedTest
        hookResult.state = hook.errors && hook.errors.length ? hook.state : "passed"
        hookResult.steps = hook.steps

        if (hook.error) {
            if (hook.error.type) {
                hookResult.errorType = hook.error.type
            }
            if (hook.error.message) {
                hookResult.error = hook.error.message
            }
            if (hook.error.stack) {
                hookResult.standardError = hook.error.stack
            }
        }

        hooks.push(hookResult)
    }
    return hooks
}