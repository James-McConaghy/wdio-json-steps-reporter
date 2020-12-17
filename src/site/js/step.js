function render_HTML_step(step) {
    const HTML_step = document.createElement('div')
    HTML_step.className = "step flex row"
    HTML_step.innerHTML = prefab_HTML_step(step)
    document.getElementById("stepLogs").append(HTML_step)
}

function prefab_HTML_step(step) {
    return `
    <div class="step flex row">
        ${this.prefab_HTML_step_icons(step)}
        <div class="flex-grow column">
            <span class="stepText">${step.description}</span>
            <span class="stepText">${step.expectation}</span>
            <span class="stepText">${step.actual}</span>
        </div>
        <div class="flex column border-left">
            ${step.screenshotPath ? `<span class="flex-center stepText pointer"><a target="_blank" href="${step.screenshotPath}"><i class="fa fa-file-image-o icon" aria-hidden="true"></i></a></span>`
            : `<span class="stepText"><i class="fa fa-question-circle-o icon hidden" aria-hidden="true"></i></span>`}
        </div>
    </div>`
}

function prefab_HTML_step_icons(step) {
    const passedIcon = `<span class="stepText"><i class="greenText fa fa-check-square-o icon" aria-hidden="true"></i></span>`
    const failedIcon = `<span class="stepText"><i class="errorText fa fa-bug icon" aria-hidden="true"></i></span>`

    return `
    <div class="flex column border-right">
        <span class="stepText"><i class="fa fa-play-circle-o icon" aria-hidden="true"></i></span>
        <span class="stepText"><i class="fa fa-question icon" aria-hidden="true"></i></span>
        ${step.status == "passed" ? passedIcon : failedIcon}
    </div>`
}