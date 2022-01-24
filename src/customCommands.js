const path = require("path")
const fs = require("fs")

async function saveScreenshot(originalFunction, filepath, element) {
    try {
        const fullPageDimensions = await browser.execute(() => {
            const x = Math.max(window.innerWidth, document.body.scrollWidth, document.documentElement.scrollWidth) || 0
            const y = Math.max(window.innerHeight, document.body.scrollHeight, document.documentElement.scrollHeight) || 0
            const scale = window.devicePixelRatio || 1
            const mobile = typeof window.orientation !== "undefined"
            return { width: x, height: y, deviceScaleFactor: scale, mobile: mobile }
        })
        await browser.sendCommandAndGetResult("Emulation.setDeviceMetricsOverride", fullPageDimensions)

        if (element) {
            await element.highlight()
        }

        console.log(fullPageDimensions)

        const screenshot = await browser.sendCommandAndGetResult("Page.captureScreenshot", {
            "format": "png",
            "fromSurface": true,
            "clip": { x: 0, y: 0, width: fullPageDimensions.width, height: fullPageDimensions.height, scale: 1 }
        })
        await browser.sendCommandAndGetResult("Emulation.clearDeviceMetricsOverride", {})

        if (element) {
            await element.removeHighlight()
        }

        const screenBuffer = Buffer.from(screenshot.data, "base64")
        fs.writeFileSync(filepath, screenBuffer)
    } catch (error) {
        await originalFunction(filepath)
    }
}

async function highlight() {
    await browser.execute((element) => {
        let bounds = element.getBoundingClientRect()
        let highlight = document.createElement("div")
        highlight.id = `customHighlight_${this.elementId}`
        highlight.classList.add("customHighlight")
        highlight.style.width = bounds.width + "px"
        highlight.style.height = bounds.height + "px"
        highlight.style.top = window.pageYOffset + bounds.top - 1 + "px"
        highlight.style.left = window.pageXOffset + bounds.left - 1 + "px"
        highlight.style.border = "2px solid red"
        highlight.style.position = "absolute"
        document.body.append(highlight)
    }, this)
}

async function removeHighlight() {
    await browser.execute(() => {
        document.getElementById(`customHighlight_${this.elementId}`).remove()
    }, this)
}

async function removeHighlights() {
    await browser.execute(() => {
        document.querySelectorAll(".customHighlight").forEach(i => i.remove())
    })
}

module.exports = {
    saveScreenshot,
    highlight,
    removeHighlight,
    removeHighlights
}