const specRoot = "/test/"
const specTree = []

let filterByStatus = ["passed", "skipped", "failed"]
let selectedHooks = ["before all", "before each", "test", "after each", "after all"]
const hooks = [
    { name: "before all", enabled: true, type: "outer" },
    { name: "before each", enabled: true, type: "inner" },
    { name: "test steps", enabled: true, type: "inner"  },
    { name: "after each", enabled: true, type: "inner" },
    { name: "after all", enabled: true, type: "outer" },
];
let isResizing = false
let leftWidth = "100%"
let rightWidth = "100%"

function displayTest(test) {
    document.getElementById("details").innerHTML = `
        <div id="detailsInfo" class="container column">
            <div class="sectionHeading right">
                <span>Test Name</span>
            </div>
            <div id="time" class="container row end detailsSection">
                <div class="tag"><div class="logName">${test.specs[0]}</div></div>
            </div>
            <div class="sectionHeading right">
                <span>Platform</span>
            </div>
            <div id="platform" class="container row end detailsSection">
                <div class="tag"><div class="logName">${test.capabilities.platformName}</div></div>
            </div>
            <div class="sectionHeading right">
                <span>Browser</span>
            </div>
            <div id="browsers" class="container row end detailsSection">
                <div class="tag"><div class="logName">${test.capabilities.browserName}</div></div>
            </div>
            <div class="sectionHeading right">
                <span>Start Date </span>
            </div>
            <div id="time" class="container row end detailsSection">
                <div class="tag"><div class="logName">${test.start}</div></div>
            </div>
            <div class="sectionHeading right">
            <span>End Date</span>
            </div>
            <div id="time" class="container row end detailsSection">
                    <div class="tag"><div class="logName">${test.end}</div></div>
            </div>
            ${!test.capabilities.session ? '' :
            `<div class="sectionHeading right">
                    <span>Browserstack</span>
                </div>
                <div id="browserstack" class="container row end detailsSection">
                    <div class="tag"><div class="logName">${test.capabilities.session}</div></div>
                </div>`}
            <div class="sectionHeading right">
                <span>Logs</span>
            </div>
            <div id="logs" class="container row end detailsSection">
                <div class="tag"><div class="logName">Selenium Log</div></div>
                <div class="tag"><div class="logName">Steps Log</div></div>
                <div class="tag"><div class="logName">Video Log</div></div>
            </div>
        </div>
            <div id="detailsSteps" class="container column">
                <div id="draggable" class="resize"></div>
                <div class="sectionHeading right">
                    <span>Steps</span>
                </div>
                
                <div id="steps" class="container column">
                    <div id="hooks" class="container row justified">
                        <div id="beforeAllButton" class="tag pointer logName center selected">before all</div>
                        <div id="beforeEachButton" class="tag pointer logName center selected">before each</div>
                        <div id="testStepsButton" class="tag pointer logName center selected">test steps</div>
                        <div id="afterEachButton" class="tag pointer logName center selected">after each</div>
                        <div id="afterAllButton" class="tag pointer logName center selected">after all</div>
                    </div>
                    <div id="stepLogs" class="container column"></div>
                </div>
        </div>
    </div>`
    document.getElementById('detailsInfo').style.width = leftWidth
    document.getElementById('detailsSteps').style.width = rightWidth
    document.getElementById("beforeAllButton").addEventListener("click", (e) => toggleHook(e, "before all"))
    document.getElementById("beforeEachButton").addEventListener("click", (e) => toggleHook(e, "before each"))
    document.getElementById("testStepsButton").addEventListener("click", (e) => toggleHook(e, "test steps"))
    document.getElementById("afterEachButton").addEventListener("click", (e) => toggleHook(e, "after each"))
    document.getElementById("afterAllButton").addEventListener("click", (e) => toggleHook(e, "after all"))
    enableResize()
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

function build_hook_steps_for_suiteOrTest_section(hookName, suite, test, depth) {
    const steps = []
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
        case "before each":
        case "after each":
            hooks.forEach(hook => {
                if (hook.associatedTest === test?.name) {
                    hook.steps.forEach((step, index, arr) => {
                        steps.push(prefab_HTML_step(step, depth))
                        if (arr.length > 1 && index != arr.length - 1) {
                            steps.push(prefab_HTML_step_separator(depth))
                        }
                    })
                }
            }) 
        break;
        case "test steps":
            test.steps.forEach((step, index, arr) => {
                steps.push(prefab_HTML_step(step, depth))
                if (arr.length > 1 && index != arr.length - 1) {
                    steps.push(prefab_HTML_step_separator(depth))
                }
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
        const steps = build_hook_steps_for_suiteOrTest_section(enabledBeforeAllHook[0].name, suite, null, depth + 1)
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
        let sectionEnd = prefab_HTML_section_end(0)
        testSection.append(sectionEnd)
        suiteSection.append(testSection)
    })

    suite.suites.forEach(suite => {
        this.recursivlyCreateTestSteps(suite, suiteSection, depth + 1)
    })

    if (enabledAfterAllHook.length > 0) {
        const steps = build_hook_steps_for_suiteOrTest_section(enabledAfterAllHook[0].name, suite, null, depth + 1)
        suiteSection.append(...steps)
    }

    let sectionEnd = prefab_HTML_section_end(0)
    suiteSection.append(sectionEnd)

    baseElement.append(suiteSection)
}
