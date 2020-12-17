function selectRow(e, suite, test) {
    selectedHooks = ["before all", "before each", "test", "after each", "after all"]
    if (!e.currentTarget.classList.contains("selected")) {
        this.deselectAllRows()
        e.currentTarget.classList.add("selected")
        selectedSuite = suite
        selectedTest = test
        displayTest(selectedSuite, selectedTest)
        render_HTML_hooks(selectedSuite, selectedTest)
    }
}

function deselectAllRows() {
    let rows = document.getElementsByClassName('menuRow')
    for (let row of rows) {
        row.classList.remove("selected")
    }
}