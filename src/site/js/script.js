let filterByStatus = ["passed", "skipped", "failed"]
let selectedHooks = ["before all", "before each", "test", "after each", "after all"]
const hooks = [
    { name: "before all", enabled: true },
    { name: "before each", enabled: true },
    { name: "test steps", enabled: true },
    { name: "after each", enabled: true },
    { name: "after all", enabled: true },
];
let isResizing = false
let leftWidth = "100%"
let rightWidth = "100%"

render_HTML_overview()
render_HTML_menu()

function displayTest(suite, test) {
    document.getElementById("details").innerHTML = `
        <div id="detailsInfo" class="container column">
            <div class="sectionHeading right">
                <span>Test Name</span>
            </div>
            <div id="time" class="container row end detailsSection">
                <div class="tag"><div class="logName">${test.name}</div></div>
            </div>
            <div class="sectionHeading right">
                <span>Platform</span>
            </div>
            <div id="platform" class="container row end detailsSection">
                <div class="tag"><div class="logName">${results.capabilities[0].platformName}</div></div>
            </div>
            <div class="sectionHeading right">
                <span>Browser</span>
            </div>
            <div id="browsers" class="container row end detailsSection">
                <div class="tag"><div class="logName">${results.capabilities[0].browserName}</div></div>
            </div>
            <div class="sectionHeading right">
                <span>Time</span>
            </div>
            <div id="time" class="container row end detailsSection">
                <div class="tag"><div class="logName">${convertMS(test.duration)}</div></div>
            </div>
            ${!test.session ? '' :
            `<div class="sectionHeading right">
                    <span>Browserstack</span>
                </div>
                <div id="browserstack" class="container row end detailsSection">
                    <div class="tag"><div class="logName">${test.session}</div></div>
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
    render_HTML_hooks(selectedSuite, selectedTest)
}

function render_HTML_hooks(selectedSuite, selectedTest) {
    document.getElementById("stepLogs").innerHTML = ''
    const enabledHooks = hooks.filter(hook => hook.enabled)
    if (selectedTest.state !== "skipped") {
        for (let index = 0; index < enabledHooks.length; index++) { 
            let hadSteps = render_HTML_hook_section(enabledHooks[index].name, selectedSuite, selectedTest)
            if (index != 0 && index != enabledHooks.length -1 && hadSteps || index == 0 && enabledHooks.length > 1 && hadSteps) {
                render_HTML_hook_section_separator()
            }
        }
    }
}

function render_HTML_hook_section(hookName, selectedSuite, selectedTest) {
    let hadSteps = false
    if(hookName == "test steps") {
        render_HTML_hook_steps(selectedTest.steps)
        hadSteps = selectedTest.steps.length
    } else {
        selectedSuite.hooks.forEach(hook => {
            if (hook.title.includes(hookName) && (hook.title.includes("all") || (hook.title.includes("each") && hook.associatedTest === selectedTest.name))) {
                render_HTML_hook_steps(hook.steps)
                hadSteps = hook.steps.length
            }
        })
    }
    return hadSteps
}

function render_HTML_hook_section_separator() {
    const hookSeparator = document.createElement('div')
    hookSeparator.innerHTML = `<div class="stepSection stepSectionStart center"></div>`
    document.getElementById("stepLogs").append(hookSeparator)
}

function render_HTML_hook_steps(steps) {
    let isFirst = true
    steps.forEach(step => {
        if (!isFirst) {
            isFirst = false
            render_HTML_step_separator()
        }
        render_HTML_step(step)
    })
}

