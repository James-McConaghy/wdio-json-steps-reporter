function displayTest(test) {
    document.getElementById("detailsInfo").innerHTML = `
        <div class="sectionHeading underlined right" style="margin-top: 15px">
            <span>${test.specs[0].split("/").pop()}</span>
        </div>
        <div class="sectionHeading right" style="margin-top: 15px">
            <span>Test Path</span>
        </div>
        <div class="container row end detailsSection detailsText">
            <div class="tag"><div class="logName">${test.specs[0]}</div></div>
        </div>
        <div class="sectionHeading right">
            <span>Platform</span>
        </div>
        <div class="container row end detailsSection detailsText">
            <div class="tag"><div class="logName">${test.capabilities.platformName}</div></div>
        </div>
        <div class="sectionHeading right">
            <span>Browser</span>
        </div>
        <div class="container row end detailsSection detailsText">
            <div class="tag"><div class="logName">${test.capabilities.browserName}</div></div>
        </div>
        <div class="sectionHeading right">
            <span>Start Date </span>
        </div>
        <div class="container row end detailsSection detailsText">
            <div class="tag"><div class="logName">${test.start}</div></div>
        </div>
        <div class="sectionHeading right">
        <span>End Date</span>
        </div>
        <div class="container row end detailsSection detailsText">
            <div class="tag"><div class="logName">${test.end}</div></div>
        </div>
        <div class="sectionHeading right">
            <span>Duration</span>
        </div>
        <div class="container row end detailsSection detailsText">
            <div class="tag"><div class="logName">${convertMS(new Date(test.end).getTime() - new Date(test.start).getTime())}</div></div>
        </div>
        <div class="sectionHeading right">
            <span>Passed </span>
        </div>
        <div class="container row end detailsSection detailsText">
            <div class="tag"><div class="logName">${test.state.passed}</div></div>
        </div>
        <div class="sectionHeading right">
            <span>Skipped </span>
        </div>
        <div class="container row end detailsSection detailsText">
            <div class="tag"><div class="logName">${test.state.skipped}</div></div>
        </div>
        <div class="sectionHeading right">
            <span>Failed </span>
        </div>
        <div class="container row end detailsSection detailsText">
            <div class="tag"><div class="logName">${test.state.failed}</div></div>
        </div>
        ${!test.capabilities.session ? '' :
        `<div class="sectionHeading right">
                <span>Browserstack</span>
            </div>
            <div class="container row end detailsSection detailsText">
                <div class="tag"><div class="logName">${test.capabilities.session}</div></div>
            </div>`}`
}

function toggleHook(e, selectedHook) {
    const hook = hooks.find(hook => hook.name == selectedHook)
    if (e.target.classList.contains("selected")) {
        e.target.classList.replace("selected", "deselected")
    } else {
        e.target.classList.replace("deselected", "selected")
    }
    hook.enabled = !hook.enabled
    render_HTML_hooks(selectedTest)
}

function aggregateInnerHookSteps(enabledInnerHooks, suite, test) {
    let steps = []
    enabledInnerHooks.forEach(enabledHook => {
        switch (enabledHook.name) {
            case "before each":
            case "after each":
                const hooks = suite.hooks ? suite.hooks.filter(hook => hook.title.includes(enabledHook.name) && hook.associatedTest === test?.name) : []
                hooks.forEach(hook => {
                    steps = [...steps, ...hook.steps]
                })
                break;
            case "test steps":
                const testSteps = test.steps
                steps = [...steps, ...testSteps]
                break;
        }
    })
    return steps
}

function aggregateOuterHookSteps(hookName, suite, depth) {
    let steps = []
    const hooks = suite.hooks ? suite.hooks.filter(hook => hook.title.includes(hookName)) : []
    switch (hookName) {
        case "before all":
        case "after all":
            hooks.forEach(hook => {
                hook.steps.forEach((step, index, arr) => {
                    steps.push(prefab_HTML_step(step, depth))
                    if (arr.length > 1 && index != arr.length - 1) {
                        steps.push(prefab_HTML_step_separator(depth))
                    }
                })
            })
            break;
    }
    return steps
}

function render_HTML_hooks(selectedTest) {
    document.getElementById("stepLogs").innerHTML = ''
    selectedTest.suites.forEach(suite => {
        this.recursivlyCreateTestSteps(suite, document.getElementById("stepLogs"), 0)
    })
}

function recursivlyCreateTestSteps(suite, baseElement, depth) {

    const enabledBeforeAllHook = hooks.filter(hook => hook.enabled && hook.name == "before all")
    const enabledInnerHooks = hooks.filter(hook => hook.enabled && hook.type == "inner")
    const enabledAfterAllHook = hooks.filter(hook => hook.enabled && hook.name == "after all")

    let suiteSection = prefab_HTML_suite_section(suite, depth)

    if (enabledBeforeAllHook.length > 0) {
        const steps = aggregateOuterHookSteps(enabledBeforeAllHook[0].name, suite, depth + 1)
        suiteSection.append(...steps)
    }

    suite.tests.forEach(test => {
        let testSection = prefab_HTML_test_section(test, depth + 1)
        const steps = aggregateInnerHookSteps(enabledInnerHooks, suite, test)
        steps.forEach((step, index, arr) => {
            testSection.append(prefab_HTML_step(step, depth + 1))
            if (arr.length > 1 && index != arr.length - 1) {
                testSection.append(prefab_HTML_step_separator(depth + 1))
            }
        })
        //let sectionEnd = prefab_HTML_section_end(0)
        //testSection.append(sectionEnd)
        suiteSection.append(testSection)
    })

    suite.suites.forEach(suite => {
        this.recursivlyCreateTestSteps(suite, suiteSection, depth + 1)
    })

    if (enabledAfterAllHook.length > 0) {
        const steps = aggregateOuterHookSteps(enabledAfterAllHook[0].name, suite, depth + 1)
        suiteSection.append(...steps)
    }

    //let sectionEnd = prefab_HTML_section_end(0)
    //suiteSection.append(sectionEnd)

    baseElement.append(suiteSection)
}