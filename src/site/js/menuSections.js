class TreeNode {

    constructor(folder) {
        this.folder = folder
        this.subFolders = []
        this.results = []
    }

}

const colour = {
    "failed": "#F56960",
    "skipped": "#FFF496",
    "passed": "#1abc9c"
}

function buildTree(result, tree) {

    const relativePath = result.specs[0].substring(result.specs[0].lastIndexOf(specRoot) + specRoot.length)
    const relativeHierarchy = relativePath.split("/")
    relativeHierarchy.pop() // remove the filename from the array, so we just have the desired folder structure

    let currentDirectory = tree;

    for (let i = 0; i < relativeHierarchy.length; i++) {

        //Try to find the next directory in the current directory
        let nextDirectory = currentDirectory.find(folders => folders.folder === relativeHierarchy[i])

        //If it didnt exist we will create it and push it into the current directory
        if (nextDirectory === null || nextDirectory === undefined) {
            nextDirectory = new TreeNode(relativeHierarchy[i])
            currentDirectory.push(nextDirectory)
        }

        //If we are at the end of the path (file), add the file to the next directory
        if (i === relativeHierarchy.length - 1) {
            nextDirectory.results.push(result)
        }

        //Assign the next folders array of sub folders to the current directory and repeat
        currentDirectory = nextDirectory.subFolders
    }
}


function render_HTML_menu() {
    document.getElementById("menu").innerHTML = ""
    if (loadedFile !== undefined) {
        const tree = []
        loadedFile.results.forEach(result => {      
            buildTree(result, tree)
        })
        tree.forEach(treeNode => {
            render_folders_recursive(treeNode, 0, document.getElementById("menu"))
        })       
    }
}

function render_folders_recursive(treeNode, depth, treeElement) {
    const section = prefab_HTML_menu_section(treeNode.folder, depth)
    const ignoreFilters = treeNode.folder.toLowerCase().includes(getFilterValue().toLowerCase()) ? true : false
    console.log(treeNode.folder, ignoreFilters)
    const rows = prefab_HTML_menu_rows(treeNode.results, ignoreFilters)
    section.append(...rows)
    treeNode.subFolders.forEach(subFolder => {
        this.render_folders_recursive(subFolder, depth + 1, section)
    })
    treeElement.append(section)
}

function prefab_HTML_menu_section(folder, depth) {
    const prefab = document.createElement('div')
    prefab.classList = "section"
    prefab.style.paddingLeft = `${depth * 15}px`
    prefab.innerHTML = `
    <div class="sectionHeading container row justified">
        <span class="truncate"><i class="fa fa-angle-down" style="margin-right: 10px;" aria-hidden="true"></i>${folder}</span>
    </div>`
    prefab.firstElementChild.addEventListener('click', (e) => toggleFolderVisibility(e))
    return prefab
}

function prefab_HTML_menu_rows(results, ignoreFilters) {
    const rows = []
    results.forEach(result => {
        console.log("result hh", result)
        const filename = result.specs[0].split("/").pop()
        console.log(result.state)
        
        if (filename.toLowerCase().includes(getFilterValue().toLowerCase()) && filterByStatus.some(status => result.state.state.includes(status))) { //&& filterByStatus.includes(result.state.state))) { // || (ignoreFilters && filterByStatus.includes(test.state))) {
            const row = prefab_HTML_menu_row(filename, result.state.state)
            row.addEventListener('click', (e) => selectRow(e, result))
            rows.push(row)
        }
    })
    return rows
}

function prefab_HTML_menu_row(text, state) {
    const prefab = document.createElement('div')
    prefab.classList = "menuRow"
    prefab.innerHTML = `<div class="testName truncate">${text}</div><div style="background: linear-gradient(-90deg, ${colour[state[0]]} 50%, ${colour[state[state.length-1]]} 50%)" class="testStatus"></div></div>`
    return prefab
}