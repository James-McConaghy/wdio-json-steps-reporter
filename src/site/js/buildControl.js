function loadBuildInfo() {
    fetch("./buildInfo.json")
        .then(response => response.json())
        .then(data => {
            testDir = data.testDir
            createBuildOptions(data.build)
        })
}

function createBuildOptions(build) {
    let html = "<option value=\"\" disabled=\"disabled\" selected=\"selected\">Select Build</option>"
    if (typeof build  === "string") {
        html += `<option value="${build}">${build}</option>`
    } else {
        for (let index = build; index > 0; index--) {
            html += `<option value="${index}">${index}</option>`
        }
    }
        
    document.getElementById("selectVerion").innerHTML = html
    document.getElementById("selectVerion").addEventListener("change", e => loadResultsAPI(e))
}

function loadResultsAPI(e) {
    fetch(`/results/${e.target.value}/merged-results.json`, {cache: "no-cache"})
        .then(response => response.json())
        .then(data => {
            loadedFile = data
            render_HTML_overview()
            render_HTML_menu()
        })
}