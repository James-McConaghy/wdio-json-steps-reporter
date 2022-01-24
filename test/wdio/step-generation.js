const expect = require("chai").expect
const {step, steps} = require("../../src/step")

describe("Single Steps : Getting Started", async function() {

    before(async function() {
        await step({createLog: true, takeScreenshot: true}, "Navigate to the Home page", "Home page should load", "The Home page loaded", async function() {
            await browser.navigateTo("https://webdriver.io")
        })
    })

    beforeEach(async function() {
        await step({createLog: true, takeScreenshot: "fullpage"}, "Refresh the page", "The page should refresh", "The page refreshed", async function() {
            await browser.refresh()
            await browser.pause(1000)
        })
    })

    it("AC 1 should have the right title", async function() {
        //using a reusable page object action/assertion
        await verifyPageTitle({createLog: true, takeScreenshot: "viewport"})
    })

    it.skip("AC 2 test should be skipped", async function() {
        await step({createLog: true, takeScreenshot: true}, "This test and child steps should be skipped", "This test and child steps should be skipped", "This test and child steps should be skipped", async function() {
            await browser.deleteSession()
        })
    })

    it("AC 3 test and step executed but NO step should be logged", async function() {
        await step({createLog: false}, "Test and steps will execute but no logs will be generated", "Test and steps will execute but no logs will be generated", "Test and steps will execute but no logs will be generated", async function() {
            await browser.pause(3000)
        })
    })

    it("AC 4 group step methods into single steps together", async function() {
        await steps({createLog: true, takeScreenshot: true},
            [
                (stepOptions) => scrollPage(0, 2000, stepOptions),
                async (stepOptions) => await verifyPageTitle(stepOptions)
            ], 
            [
                async (stepOptions) => await verifyPageTitle(stepOptions)
            ]
        )
    })

    describe.skip("Depth 1: skipped", async function() {
      
        it("AC 5 should be skipped", async function() {
            await verifyPageTitle({createLog: true, takeScreenshot: "viewport"})
        })
    
    }) 

    afterEach(async function() {
        await step({createLog: true, takeScreenshot: false}, "Delete all cookies", "The cookies should be deleted", "The cookies were deleted", async function() {
            await browser.deleteAllCookies()    
        })
    })

    after(async function() {
        await step({createLog: true, takeScreenshot: false}, "Close the browser", "Close the browser", "Close the browser", async function() {
            //browser.closeWindow()
        })
    })

})

//reusable page action
async function scrollPage(x, y, stepOptions) {
    return await step(stepOptions, `Scroll the page by ${x}, ${y}`, `The page should have scrolled by ${x}, ${y}`, `The page scrolled by ${x}, ${y}`, async function() {
        browser.execute((x, y) => scrollBy(x, y), x, y)
        console.log("scrollling")
    })
}

//reusable page assertions
async function verifyPageTitle(stepOptions) {
    return await step(stepOptions, 
        "Verify the page title is correct", 
        "The page title should be correct", 
        "The title was correct", async function() {
            const title = await browser.getTitle()
            expect(title).to.include("WebdriverIO")
        })
}