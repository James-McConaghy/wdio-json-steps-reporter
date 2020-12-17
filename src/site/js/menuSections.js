function render_HTML_menu() {
    document.getElementById("testsList").innerHTML = ""
    if (results !== undefined) {
        results.suites.forEach(suite => {
            let ignoreFilters = suite.name.toLowerCase().includes(getFilterValue().toLowerCase()) ? true : false
            const rows = prefab_HTML_menu_rows(suite, ignoreFilters)
            if (rows != null) {
                const section = prefab_HTML_menu_section(suite)
                section.append(...rows)
                document.getElementById("testsList").append(section)
            }
        })
    }
}

function prefab_HTML_menu_section(suite) {
    const prefab = document.createElement('div')
    prefab.classList = "section"
    prefab.innerHTML = `
    <div class="sectionHeading container row justified">
        <span class="truncate">${suite.name}</span>
        <span class="filename">/${suite.file}</span>
    </div>`
    return prefab
}

function prefab_HTML_menu_rows(suite, ignoreFilters) {
    const rows = []
    suite.tests.forEach(test => {
        if ((test.name.toLowerCase().includes(getFilterValue().toLowerCase()) && filterByStatus.includes(test.state)) || (ignoreFilters && filterByStatus.includes(test.state))) {
            const row = prefab_HTML_menu_row(test)
            row.addEventListener('click', (e) => selectRow(e, suite, test))
            rows.push(row)
        }
    })
    return rows
}

function prefab_HTML_menu_row(test) {
    const prefab = document.createElement('div')
    prefab.classList = "menuRow"
    prefab.innerHTML = `<div class="testName truncate">${test.name}</div><div class="${test.state} testStatus"></div></div>`
    return prefab
}