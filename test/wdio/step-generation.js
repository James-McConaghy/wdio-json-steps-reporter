const expect = require("chai").expect
const step = require("../../src/step")

describe("Steps", () => {

    beforeEach(function () {
        step({createLog: true, takeScreenshot: true}, "Navigate to the home page", "Home page should load", "The home page loaded", () => {
            browser.url("https://webdriver.io")
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
        step({createLog: false, takeScreenshot: true}, "The title should be correct, no step logged", "The title should be correct, no step logged", "The title was correct, no step logged", () => {
            const title = browser.getTitle()
            expect(title).to.equal("WebdriverIO · Next-gen browser and mobile automation test framework for Node.js")
        })
    })

})
