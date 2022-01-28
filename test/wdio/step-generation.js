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

    it("AC 1 should execute steps within page object methods", async function() {
        await verifyPageTitle({createLog: true, takeScreenshot: true})
    })

    it("AC 2 should execute steps within page object methods but NO step should be logged", async function() {
        await step({createLog: false}, "Test and steps will execute but no logs will be generated", "Test and steps will execute but no logs will be generated", "Test and steps will execute but no logs will be generated", async function() {
            await browser.pause(1000)
        })
    })

    it("AC 3 should execute browser scripts", async function() {
        await scrollPage({createLog: true, takeScreenshot: "viewport"}, 0, 2000)
    })

    it.skip("AC 4 test should be skipped", async function() {
        await step({createLog: true, takeScreenshot: true}, "This test and child steps should be skipped", "This test and child steps should be skipped", "This test and child steps should be skipped", async function() {
            await browser.deleteSession()
        })
    })

    describe.skip("Suite: skip all nested its", async function() {
      
        it("AC 5 should be skipped", async function() {
            await verifyPageTitle({createLog: true, takeScreenshot: true})
        })

        it.skip("AC 6 should be skipped", async function() {
            await verifyPageTitle({createLog: true, takeScreenshot: true})
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

//reusable page action
async function scrollPage(stepOptions, x, y) {
    return await step(stepOptions, `Scroll the page by ${x}, ${y}`, `The page should have scrolled by ${x}, ${y}`, `The page scrolled by ${x}, ${y}`, async function() {
        await browser.pause(2000)
        await browser.execute((x, y) => scrollBy(x, y), x, y)
        await browser.pause(2000)
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