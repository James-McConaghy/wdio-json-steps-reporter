function prefab_HTML_step(step, depth) {
    const prefab = document.createElement('div')
    prefab.className = "step flex row"
    prefab.innerHTML = inner_HTML_step(step)
    prefab.style.paddingLeft = `${settings.depth * depth * 15}px`
    return prefab
}

function inner_HTML_step(step) {
    return `
    <div class="step flex row">
        ${this.inner_HTML_step_icons(step)}
        <div class="flex-grow column">
            <span class="stepText">${step.description}</span>
            <span class="stepText">${step.expectation}</span>
            <span class="stepText">${step.status == "passed" ? step.actual : step.error.stack }</span>
        </div>
        <div class="flex column border-left">
            ${step.screenshotPath ? `<span class="flex-center stepText pointer"><a target="_blank" href="${step.screenshotPath}"><i class="fa fa-file-image-o icon" aria-hidden="true"></i></a></span>`
            : `<span class="stepText"><i class="fa fa-question-circle-o icon hidden" aria-hidden="true"></i></span>`}
        </div>
    </div>`
}

function inner_HTML_step_icons(step) {
    const passedIcon = `<span class="stepText"><i class="greenText fa fa-check icon" aria-hidden="true"></i></span>`
    const failedIcon = `<span class="stepText"><i class="errorText fa fa-times icon" aria-hidden="true"></i></span>`

    return `
    <div class="flex column border-right">
        <span class="stepText"><i class="fa fa-play-circle-o icon" aria-hidden="true"></i></span>
        <span class="stepText"><i class="fa fa-question-circle-o icon" aria-hidden="true"></i></span>
        ${step.status == "passed" ? passedIcon : failedIcon}
    </div>`
}