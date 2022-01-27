const expect = require("chai").expect
const {step} = require("../../../src/step")

describe("Depth 0", async function() {

    before(async function() {
        await step({createLog: true, takeScreenshot: true}, "Navigate to the Home page", "Home page should load", "The Home page loaded", async function() {
            await browser.url("https://webdriver.io")
        })
    })

    beforeEach(async function() {
        await step({createLog: true, takeScreenshot: "fullpage"}, "Refresh the page", "The page should refresh", "The page refreshed", async function() {
            await browser.refresh()
            await browser.pause(1000)
        })
    })

    it("AC 1 should have the right title", async function() {
        await verifyPageTitle({createLog: true, takeScreenshot: "viewport"})
    })

    describe("Depth 1: first", async function() {
      
        it("AC 2 should have the right title", async function() {
            await verifyPageTitle({createLog: true, takeScreenshot: "viewport"})
        })
    
    }) 

    describe("Depth 1: second", async function() {
      
        it("AC 3 should have the right title", async function() {
            await verifyPageTitle({createLog: true, takeScreenshot: "viewport"})
        })

        describe("Depth 2: second", async function() {
      
            it("AC 4 should have the right title", async function() {
                await verifyPageTitle({createLog: true, takeScreenshot: "viewport"})
            })

            it("AC 5 should have the right title", async function() {
                await verifyPageTitle({createLog: true})
            })
        
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