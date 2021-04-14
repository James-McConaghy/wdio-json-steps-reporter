function enableResize() {
    var left = document.getElementById("detailsInfo")
    var right = document.getElementById("detailsSteps")
    var handle = document.getElementById("draggable")

    handle.addEventListener("mousedown", function (e) {
        isResizing = true
        e.returnValue = false
    })

    document.addEventListener("mousemove", function (e) {
        if (!isResizing)
            return
        leftWidth = (e.pageX - 400) + "px"
        rightWidth = (document.body.clientWidth - e.pageX) + "px"
        left.style.width = leftWidth
        right.style.width = rightWidth
    })

    document.addEventListener("mouseup", function (e) {
        isResizing = false
    })

}