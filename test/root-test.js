const expect = require("chai").expect
const {step} = require("../src/step")

describe("Describe No Test", () => {

    describe("Describe Test", () => {

        it("AC 1 failure", () => {
            step({createLog: true, takeScreenshot: true}, "Navigate to the Home page", "Home page should load", "The Home page loaded", () => {
                browser.url("https://webdriver.io")
            })
            step({createLog: true}, "Verify the test step fails", "The test step should fail", "The test failed", () => {
                expect(true).to.equal(false)
            })
        })

    })

})