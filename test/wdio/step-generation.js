const expect = require("chai").expect
const step = require("../../src/step")

describe("Home Page", () => {

    before(function () {
        step({createLog: true, takeScreenshot: true}, "Navigate to the Home page", "Home page should load", "The Home page loaded", () => {
            browser.url("https://webdriver.io")
        })
    })

    beforeEach(function () {
        step({createLog: true, takeScreenshot: true}, "Refresh the page", "The page should refresh", "The page refreshed", () => {
            browser.refresh()
        })
    })

    it("AC 1 should have the right title", () => {
        step({createLog: true, takeScreenshot: true}, "The title should be correct", "The title should be correct", "The title was correct", () => {
            const title = browser.getTitle()
            expect(title).to.equal("WebdriverIO · Next-gen browser and mobile automation test framework for Node.js")
        })
    })

    it.skip("AC 2 test should be skipped", () => {
        step({createLog: true, takeScreenshot: true}, "This test and child steps should be skipped", "This test and child steps should be skipped", "This test and child steps should be skipped", () => {
            const title = browser.getTitle()
            expect(title).to.equal("WebdriverIO · Next-gen browser and mobile automation test framework for Node.js")
        })
    })

    it("AC 3 should not log a step", () => {
        step({createLog: false, takeScreenshot: false}, "The title should be correct", "The title should be correct", "The title was correct", () => {
            const title = browser.getTitle()
            expect(title).to.equal("WebdriverIO · Next-gen browser and mobile automation test framework for Node.js")
        })
    })

    describe("Getting Started", () => {

        before(function () {
            step({createLog: true, takeScreenshot: true}, "Navigate to the Getting Started page", "Getting Started page should load", "Getting Started started page loaded", () => {
                browser.url("https://webdriver.io/docs/gettingstarted.html")
            })
        })
    
        it("AC 4 should have the right title", () => {
            step({createLog: true, takeScreenshot: true}, "The title should be correct", "The title should be correct", "The title was correct", () => {
                const title = browser.getTitle()
                expect(title).to.equal("Getting Started · WebdriverIO")
            })
        })
    
    }) 

    afterEach(function () {
        step({createLog: true, takeScreenshot: true}, "Delete all cookies", "The cookies should be deleted", "The cookies were deleted", () => {
            browser.deleteAllCookies()    
        })
    })

    after(function () {
        step({createLog: true, takeScreenshot: false}, "Close the browser", "Close the browser", "Close the browser", () => {
            browser.closeWindow()
        })
    })

})
