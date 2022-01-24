const expect = require("chai").expect
const {step} = require("../src/step")

describe("Describe No Test", async function() {

    describe("Describe Test", async function() {

        it("AC 1 failure", async function() {
            await step({createLog: true, takeScreenshot: true}, "Navigate to the Home page", "Home page should load", "The Home page loaded", async function() {
                await browser.url("https://webdriver.io")
            })
            await step({createLog: true}, "Verify the test step fails", "The test step should fail", "The test failed", async function() {
                expect(true).to.equal(false)
            })
        })

    })

})