function render_HTML_step_separator() {
    const stepSeparator = document.createElement('div')
    stepSeparator.className = "step flex row"
    stepSeparator.innerHTML = prefab_HTML_step_separator()
    document.getElementById("stepLogs").append(stepSeparator)
}

function prefab_HTML_step_separator() {
    return `
    <div class="flex column border-right">
        <span class="stepText"><i class="fa fa-angle-double-down icon" aria-hidden="true"></i></span>
    </div>
    <div class="flex column">
        <span class="stepText"></span>
    </div>`
}