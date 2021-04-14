let filterByStatus = ["passed", "skipped", "failed"]

const hooks = [
    { name: "before all", enabled: true, type: "outer" },
    { name: "before each", enabled: true, type: "inner" },
    { name: "test steps", enabled: true, type: "inner" },
    { name: "after each", enabled: true, type: "inner" },
    { name: "after all", enabled: true, type: "outer" },
]

let isResizing = false
let leftWidth = "100%"
let rightWidth = "100%"

document.getElementById("detailsInfo").style.width = leftWidth
document.getElementById("detailsSteps").style.width = rightWidth
document.getElementById("beforeAllButton").addEventListener("click", (e) => toggleHook(e, "before all"))
document.getElementById("beforeEachButton").addEventListener("click", (e) => toggleHook(e, "before each"))
document.getElementById("testStepsButton").addEventListener("click", (e) => toggleHook(e, "test steps"))
document.getElementById("afterEachButton").addEventListener("click", (e) => toggleHook(e, "after each"))
document.getElementById("afterAllButton").addEventListener("click", (e) => toggleHook(e, "after all"))
document.getElementById("btn-settings").addEventListener("click", (e) => openSettings())

enableResize()
loadBuildInfo()