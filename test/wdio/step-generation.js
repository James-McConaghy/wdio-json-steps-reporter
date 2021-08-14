const expect = require("chai").expect
const {step, steps} = require("../../src/step")

describe("Single Steps : Getting Started", () => {

    before(function () {
        step({createLog: true, takeScreenshot: true}, "Navigate to the Home page", "Home page should load", "The Home page loaded", () => {
            browser.navigateTo("https://webdriver.io")
        })
    })

    beforeEach(function () {
        step({createLog: true, takeScreenshot: "fullpage"}, "Refresh the page", "The page should refresh", "The page refreshed", () => {
            browser.refresh()
            browser.pause(1000)
        })
    })

    it("AC 1 should have the right title", () => {
        //using a reusable page object action/assertion
        verifyPageTitle({createLog: true, takeScreenshot: "viewport", highlightElement: $("h1.hero__title")})
    })

    it.skip("AC 2 test should be skipped", () => {
        step({createLog: true, takeScreenshot: true}, "This test and child steps should be skipped", "This test and child steps should be skipped", "This test and child steps should be skipped", () => {
            browser.deleteSession()
        })
    })

    it("AC 3 test and step executed but NO step should be logged", () => {
        step({createLog: false}, "Test and steps will execute but no logs will be generated", "Test and steps will execute but no logs will be generated", "Test and steps will execute but no logs will be generated", () => {
            browser.pause(3000)
        })
    })

    it("AC 4 group step methods into single steps together", () => {
        steps({createLog: true, takeScreenshot: true},
            [
                (stepOptions) => scrollPage(0, 2000, stepOptions)
            ], 
            [
                (stepOptions) => verifyPageTitle(stepOptions)
            ]
        )
    })

    describe.skip("Depth 1: skipped", () => {
      
        it("AC 5 should be skipped", () => {
            verifyPageTitle({createLog: true, takeScreenshot: "viewport"})
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

//reusable page action
function scrollPage(x, y, stepOptions) {
    return step(stepOptions, `Scroll the page by ${x}, ${y}`, `The page should have scrolled by ${x}, ${y}`, `The page scrolled by ${x}, ${y}`, () => {
        browser.execute((x, y) => scrollBy(x, y), x, y)
    })
}

//reusable page assertions
function verifyPageTitle(stepOptions) {
    return step(stepOptions, 
        "Verify the page title is correct", 
        "The page title should be correct", 
        "The title was correct", () => {
            const title = browser.getTitle()
            expect(title).to.include("WebdriverIO")
        })
}