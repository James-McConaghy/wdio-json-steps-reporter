let loadedFile = null

function loadFile() {
    let input, file, fr

    if (typeof window.FileReader !== "function") {
        alert("The file API isn't supported on this browser yet.")
        return
    }

    input = document.getElementById("fileinput")
    if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'")
    }
    else {
        file = input.files[0]
        fr = new FileReader()
        fr.onload = receivedText
        fr.readAsText(file)
    }

    function receivedText(e) {
        let lines = e.target.result
        loadedFile = JSON.parse(lines)
        render_HTML_overview()
        render_HTML_menu()
    }
}