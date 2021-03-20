function prefab_HTML_step_separator(depth) {
    const prefab = document.createElement('div')
    prefab.innerHTML = `<div class="dashed translucent"></div>`        
    prefab.style.paddingLeft = `${settings.depth * settings.depth * depth * 15}px`
    return prefab
}