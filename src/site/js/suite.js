function prefab_HTML_suite_section(suite, depth) {
    const prefab = document.createElement('div')
    prefab.classList = "section"
    prefab.style.paddingLeft = `${settings.depth * depth * 15}px`
    prefab.style.paddingBottom = `15px`
    prefab.innerHTML = `
    <div class="suiteHeading container row justified">
        <span class="truncate"><i class="fa fa-angle-down" style="margin-right: 10px;" aria-hidden="true"></i>${suite.name}</span>
    </div>`
    prefab.firstElementChild.addEventListener('click', (e) => toggleFolderVisibility(e))
    return prefab
}

function prefab_HTML_test_section(test, depth) {
    const skippedIcon = `<i class="yellowText fa fa-exclamation-triangle icon" style="margin-right: 10px;" aria-hidden="true"></i>`
    const passedIcon = `<i class="greenText fa fa-check icon" style="margin-right: 10px;" aria-hidden="true"></i>`
    const failedIcon = `<i class="errorText fa fa-times icon" style="margin-right: 10px;" aria-hidden="true"></i>`

    let icon = null
    switch (test.state) {
        case "passed":
            icon = passedIcon
            break;
        case "skipped":
            icon = skippedIcon
            break;
        case "failed":
            icon = failedIcon
            break;
    } 

    const prefab = document.createElement('div')
    prefab.classList = "section"
    prefab.style.paddingLeft = `${settings.depth * depth * 15}px`
    prefab.innerHTML = `
    <div class="suiteHeading container row justified">
        <span class="truncate">${icon}${test.name}</span>
    </div>`
    prefab.firstElementChild.addEventListener('click', (e) => toggleTestVisibility(e))
    return prefab
}

function prefab_HTML_section_end(depth) {
    const prefab = document.createElement('div')
    prefab.classList = "section"
    prefab.style.paddingLeft = `${settings.depth * depth * 15}px`
    prefab.innerHTML = `
    <div class="suiteHeading container row justified">
        <span class="truncate"></span>
    </div>`
    return prefab
}