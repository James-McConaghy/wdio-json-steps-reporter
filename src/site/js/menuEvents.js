function selectRow(e, result) {
    if (!e.currentTarget.classList.contains("selected")) {
        this.deselectAllRows()
        e.currentTarget.classList.add("selected")
        selectedTest = result
        displayTest(selectedTest)
        render_HTML_hooks(selectedTest)
    }
}

function deselectAllRows() {
    let rows = document.getElementsByClassName("menuRow")
    for (let row of rows) {
        row.classList.remove("selected")
    }
}

function toggleFolderVisibility(e) {
    let folderCollapsedIcon = e.currentTarget.getElementsByTagName("i")[0]
    let isOpen = folderCollapsedIcon.classList.contains("open")
    isOpen ? folderCollapsedIcon.classList.remove("open") : folderCollapsedIcon.classList.add("open")

    let nextSibling = e.currentTarget.nextSibling || null
    while (nextSibling) {
        isOpen ? nextSibling.classList.remove("collapsed") : nextSibling.classList.add("collapsed")
        nextSibling = nextSibling.nextSibling
    }
}

function toggleTestVisibility(e) {
    let row = e.currentTarget
    let isTranslucent = row.classList.contains("translucent")
    isTranslucent ? row.classList.remove("translucent") : row.classList.add("translucent")

    let nextSibling = e.currentTarget.nextSibling || null
    while (nextSibling) {
        isTranslucent ? nextSibling.classList.remove("collapsed") : nextSibling.classList.add("collapsed")
        nextSibling = nextSibling.nextSibling
    }
}