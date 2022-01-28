describe("Suite in root folder", async function() {

    before(async function() {
        await browser.url("https://webdriver.io")
    })

    beforeEach(async function() {
        await browser.refresh()
        await browser.pause(1000)
    })

    it("AC 1 in root folder", async function() {
        await browser.url("https://webdriver.io")
    })

})