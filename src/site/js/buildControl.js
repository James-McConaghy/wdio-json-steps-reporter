function loadBuildInfo() {
    fetch("./buildInfo.json")
        .then(response => response.json())
        .then(data => {
            testDir = data.testDir
            createBuildOptions(data.builds)
        })
}

function createBuildOptions(builds) {
    let html = "<option value=\"\" disabled=\"disabled\" selected=\"selected\">Select Build</option>"

    switch (typeof builds) {
    case "string":
        html += `<option value="${builds}">${builds}</option>`
        break
    case "number":
        for (let index = builds; index > 0; index--) {
            html += `<option value="${index}">${index}</option>`
        }
        break
    case "object":
        builds.reverse().forEach(build => {
            html += `<option value="${build}">${build}</option>`
        }) 
        break  
    default:
        throw "Invalid buildInfo.json"
    }
        
    document.getElementById("selectVerion").innerHTML = html
    document.getElementById("selectVerion").addEventListener("change", e => loadResultsAPI(e))
}

function loadResultsAPI(e) {
    fetch(`./results/${e.target.value}/merged-results.json`, {cache: "no-cache"})
        .then(response => response.json())
        .then(data => {
            loadedFile = data
            render_HTML_overview()
            render_HTML_menu()
        })
}