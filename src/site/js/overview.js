function render_HTML_overview() {

    const total = results.state.passed + results.state.skipped + results.state.failed
    const passedWidth = results.state.passed / total * 100
    const skippedWidth = results.state.skipped / total * 100
    const failedWidth = results.state.failed / total * 100
    const passRate = Math.floor(passedWidth)

    const prefab_HTML_overview = `<div class="container row justified">
        <div class="tag" id="total">${total} Total</div>
        <div class="tag" id="percent">${passRate}%</div>
    </div>
    <div id="testsChart">
        <div class="flex full-width small-rounded row">
            <div data-status="passed" class="passed pointer selected" style="width: ${passedWidth}%">${results.state.passed}</div>
            <div data-status="skipped" class="skipped pointer selected" style="width: ${skippedWidth}%">${results.state.skipped}</div>
            <div data-status="failed" class="failed pointer selected" style="width: ${failedWidth}%">${results.state.failed}</div>
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