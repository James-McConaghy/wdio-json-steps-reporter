function render_HTML_overview() {

    const total = loadedFile.passed + loadedFile.skipped + loadedFile.failed
    const passedWidth = loadedFile.passed / total * 100
    const skippedWidth = loadedFile.skipped / total * 100
    const failedWidth = loadedFile.failed / total * 100
    const passRate = Math.floor(passedWidth)

    const prefab_HTML_overview = `<div class="container row justified">
        <div class="tag" id="total">${total} Total</div>
        <div class="tag" id="percent">${passRate}%</div>
    </div>
    <div id="testsChart">
        <div class="flex full-width small-rounded row">
            <div data-status="passed" class="passed pointer selected" style="width: ${passedWidth}%">${loadedFile.passed}</div>
            <div data-status="skipped" class="skipped pointer selected" style="width: ${skippedWidth}%">${loadedFile.skipped}</div>
            <div data-status="failed" class="failed pointer selected" style="width: ${failedWidth}%">${loadedFile.failed}</div>
        </div>    
    </div>`

    document.getElementById("testsOverview").innerHTML = prefab_HTML_overview
    document.getElementById("testsChart").addEventListener("click", (e) => toggleStatus(e))
}

function toggleStatus(e) {
    if (e.target.dataset.status != undefined) {
        if (e.target.classList.contains("selected")) {
            e.target.classList.replace("selected", "deselected")
            filterByStatus = filterByStatus.filter(status => status !== e.target.dataset.status)
        }
        else {
            e.target.classList.replace("deselected", "selected")
            filterByStatus.push(e.target.dataset.status)
        }
        render_HTML_menu()
    }
}