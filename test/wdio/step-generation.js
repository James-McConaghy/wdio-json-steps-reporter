const expect = require("chai").expect
const {step, steps} = require("../../src/step")

describe("Single Steps : Getting Started", () => {

    before(function () {
        step({createLog: true, takeScreenshot: true}, "Navigate to the Home page", "Home page should load", "The Home page loaded", () => {
            browser.url("https://webdriver.io")
        });
    })

    beforeEach(function () {
        step({createLog: true, takeScreenshot: true}, "Refresh the page", "The page should refresh", "The page refreshed", () => {
            browser.refresh()
        })
    })

    it("AC 1 should have the right title", () => {
        //using a reusable page object action/assertion
        verifyPageTitle({createLog: true, takeScreenshot: true})
    })

    it.skip("AC 2 test should be skipped", () => {
        step({createLog: true, takeScreenshot: true}, "This test and child steps should be skipped", "This test and child steps should be skipped", "This test and child steps should be skipped", () => {
            browser.deleteSession()
        })
    })

    it("AC 3 test and step executed but NO step should be logged", () => {
        step({createLog: false}, "Test and steps will execute but not logs will be generated", "Test and steps will execute but not logs will be generated", "Test and steps will execute but not logs will be generated", () => {
            navigateToPage("https://github.com/webdriverio/webdriverio", {createLog: false})
            browser.pause(3000)
        })
    })

    it("AC 4 should navigate to the page and have the right title", () => {
        steps({createLog: true, takeScreenshot: true},
            [function(stepOptions) { return navigateToPage("https://webdriver.io", stepOptions)}], 
            [function(stepOptions) { return verifyPageTitle(stepOptions) }]
        )
    })

    describe("Combined Steps : Getting Started", () => {
      
        it("AC 5 should navigate to the page and have the right title", () => {
            steps({createLog: true, takeScreenshot: true},
                [(stepOptions) => navigateToPage("https://webdriver.io")], 
                [(stepOptions) => verifyPageTitle(stepOptions)]
            )
        })
    
    }) 

    afterEach(function () {
        step({createLog: true, takeScreenshot: false}, "Delete all cookies", "The cookies should be deleted", "The cookies were deleted", () => {
            browser.deleteAllCookies()    
        })
    })

    after(function () {
        step({createLog: true, takeScreenshot: false}, "Close the browser", "Close the browser", "Close the browser", () => {
            browser.closeWindow()
        })
    })

})


//reusable page actions
function navigateToPage(url, stepOptions) {
    return step(stepOptions, "Navigate to the Home page", "Home page should load", "The Home page loaded", () => {
        browser.url(url)
    });
}

//reusable page assertions
function verifyPageTitle(stepOptions) {
    return step(stepOptions, 
        "Verify the page title is correct", 
        "The page title should be correct", 
        "The title was correct", () => {
        const title = browser.getTitle()
        expect(title).to.equal("WebdriverIO · Next-gen browser and mobile automation test framework for Node.js")
    })
}