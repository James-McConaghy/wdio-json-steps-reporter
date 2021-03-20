document.getElementById("searchBar").addEventListener("input", () => {
    render_HTML_menu()
})

function getFilterValue() {
    return document.getElementById("searchBar").value
}