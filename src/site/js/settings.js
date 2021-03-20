const settings = {
    depth: 1
}

function openSettings() {
    const settings = document.getElementById("settings")
    settings.classList.remove("hidden")    
}

function applySettings() {
    settings.depth = document.getElementById("checkbox-depth").checked ? 1 : 0

    render_HTML_hooks(selectedTest)
    document.getElementById("settings").classList.add("hidden")      
}

document.getElementById("btn-apply").addEventListener("click", (e) => applySettings())
