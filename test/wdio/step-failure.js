const expect = require("chai").expect
const {step} = require("../../src/step")

describe("Single Steps : Getting Started", () => {

    before(function () {
        step({createLog: true, takeScreenshot: true}, "Navigate to the Home page", "Home page should load", "The Home page loaded", () => {
            browser.url("https://webdriver.io")
        })
    })

    beforeEach(function () {
        step({createLog: true, takeScreenshot: "fullpage"}, "Refresh the page", "The page should refresh", "The page refreshed", () => {
            browser.refresh()
            browser.pause(1000)
        })
    })

    it("AC 1 failure", () => {
        step({createLog: true}, "Verify the test step fails", "The test step should fail", "The test failed", () => {
            expect(true).to.equal(false)
        })
    })

    afterEach(function () {
        step({createLog: true, takeScreenshot: false}, "Delete all cookies", "The cookies should be deleted", "The cookies were deleted", () => {
            browser.deleteAllCookies()    
        })
    })

    after(function () {
        step({createLog: true, takeScreenshot: false}, "Close the browser", "Close the browser", "Close the browser", () => {
            //browser.closeWindow()
        })
    })

})