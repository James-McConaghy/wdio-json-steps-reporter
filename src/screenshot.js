const fsExtra = require("fs-extra")

module.exports = function saveFullPageScreenshot(filepath) {

    const fullPageDimensions = browser.execute(() => {
        const x = Math.max(window.innerWidth, document.body.scrollWidth, document.documentElement.scrollWidth) || 0
        const y = Math.max(window.innerHeight, document.body.scrollHeight, document.documentElement.scrollHeight) || 0
        const scale = window.devicePixelRatio || 1
        const mobile = typeof window.orientation !== 'undefined'
        return {width: x, height: y, deviceScaleFactor: scale, mobile: mobile}
    })

    browser.sendCommandAndGetResult('Emulation.setDeviceMetricsOverride', fullPageDimensions)
    const screenshot = browser.sendCommandAndGetResult("Page.captureScreenshot", {
        'format': 'png',
        'fromSurface': true,
        'clip': {x: 0, y: 0, width: fullPageDimensions.width, height: fullPageDimensions.height, scale: 1}
    });
    browser.sendCommandAndGetResult('Emulation.clearDeviceMetricsOverride', {})

    const screenBuffer = Buffer.from(screenshot.data, 'base64');

    fsExtra.writeFile(filepath, screenBuffer)
}