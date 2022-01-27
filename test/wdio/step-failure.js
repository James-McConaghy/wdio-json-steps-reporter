const expect = require("chai").expect
const {step} = require("../../src/step")

describe("Single Steps : Getting Started", async function() {

    before(async function() {
        await step({createLog: true, takeScreenshot: true}, "Navigate to the Home page", "Home page should load", "The Home page loaded", async function() {
            await browser.url("https://webdriver.io")
        })
    })

    beforeEach(async function() {
        await step({createLog: true, takeScreenshot: "fullpage"}, "Refresh the page", "The page should refresh", "The page refreshed", async function() {
            await browser.refresh()
            await browser.pause(1000)
        })
    })

    // Force a false result
    it("AC 1 failure", async function() {
        await step({createLog: true}, "Verify the test step fails", "The test step should fail", "The test failed", async function() {
            expect(true).to.equal(false)
        })
    })

    afterEach(async function() {
        await step({createLog: true, takeScreenshot: false}, "Delete all cookies", "The cookies should be deleted", "The cookies were deleted", async function() {
            await browser.deleteAllCookies()    
        })
    })

    after(async function() {
        await step({createLog: true, takeScreenshot: false}, "Close the browser", "Close the browser", "Close the browser", async function() {
            //await browser.closeWindow()
        })
    })

})