function prefab_HTML_suite_section(suite, depth) {
    const prefab = document.createElement('div')
    prefab.classList = "section"
    prefab.style.paddingLeft = `${depth * 15}px`
    prefab.innerHTML = `
    <div class="suiteHeading container row justified">
        <span class="truncate"><i class="fa fa-angle-down" style="margin-right: 10px;" aria-hidden="true"></i>${suite.name} {</span>
    </div>`
    prefab.firstElementChild.addEventListener('click', (e) => toggleFolderVisibility(e))
    return prefab
}

function prefab_HTML_test_section(test, depth) {
    const prefab = document.createElement('div')
    prefab.classList = "section"
    prefab.style.paddingLeft = `${depth * 15}px`
    prefab.innerHTML = `
    <div class="suiteHeading container row justified">
        <span class="truncate"><i class="fa fa-angle-down" style="margin-right: 10px;" aria-hidden="true"></i>${test.name} {</span>
    </div>`
    prefab.firstElementChild.addEventListener('click', (e) => toggleFolderVisibility(e))
    return prefab
}

function prefab_HTML_step_separator(depth) {
    const prefab = document.createElement('div')
    prefab.innerHTML = `<div class="dashed translucent"></div>`        
    prefab.style.paddingLeft = `${depth * 15}px`
    return prefab
}

function prefab_HTML_section_end(depth) {
    const prefab = document.createElement('div')
    prefab.classList = "section"
    prefab.style.paddingLeft = `${depth * 15}px`
    prefab.innerHTML = `
    <div class="suiteHeading container row justified">
        <span class="truncate">}</span>
    </div>`
    return prefab
}