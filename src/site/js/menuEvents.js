function selectRow(e, result) {
    selectedHooks = ["before all", "before each", "test", "after each", "after all"]
    if (!e.currentTarget.classList.contains("selected")) {
        this.deselectAllRows()
        e.currentTarget.classList.add("selected")
        selectedTest = result
        displayTest(selectedTest)
        render_HTML_hooks(selectedTest)
    }
}

function deselectAllRows() {
    let rows = document.getElementsByClassName('menuRow')
    for (let row of rows) {
        row.classList.remove("selected")
    }
}

function toggleFolderVisibility(e) {
    let folderCollapsedIcon = e.currentTarget.getElementsByTagName('i')[0];    
    let isCollapsed = folderCollapsedIcon.classList.contains("open")
    isCollapsed ? folderCollapsedIcon.classList.remove("open") : folderCollapsedIcon.classList.add("open")

    let nextSibling = e.currentTarget.nextSibling || null
    while (nextSibling) {
        isCollapsed ? nextSibling.classList.remove("collapsed") : nextSibling.classList.add("collapsed")
        nextSibling = nextSibling.nextSibling
    }
}