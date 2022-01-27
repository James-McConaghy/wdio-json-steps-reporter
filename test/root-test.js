const expect = require("chai").expect
const {step} = require("../src/step")

describe("Suite in root folder: test/", async function() {

    it("AC 1 in root folder: test/", async function() {
        await step({createLog: true, takeScreenshot: true}, "Navigate to the Home page", "Home page should load", "The Home page loaded", async function() {
            await browser.url("https://webdriver.io")
        })
    })

})