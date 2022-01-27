const expect = require("chai").expect
const {step} = require("../../src/step")

describe("Single Steps : Getting Started", async function() {

    before(async function() {
        await step({createLog: true, takeScreenshot: false}, "Navigate to the Home page", "Home page should load", "The Home page loaded", async function() {
            await browser.url("https://webdriver.io")
        })
    })

    
    it.skip("AC 1 Hightlight an element in the screenshot", async function() {
        await step({createLog: true, takeScreenshot: true, highlightElement: $("h1.hero__title")}, "Verify the step takes a screenshot", "The step should take a screenshot", "The test failed", async function() {
            expect(await $("h1.hero__title").isDisplayed()).to.equal(true)
        })
    })

    it.skip("AC 2 StepOptions highlight should automatically be removed", async function() {
        await step({createLog: true, takeScreenshot: true}, "Verify the step takes a screenshot", "The step should take a screenshot", "The test failed", async function() {
            const elementId = await $("h1.hero__title").elementId
            expect(await $(`.customHighlight_${elementId}`).isDisplayed()).to.equal(false)
        })
    })

    it("AC 3 Manually Add and Remove highlight", async function() {
        await step({createLog: true, takeScreenshot: true}, "Verify the step takes a screenshot", "The step should take a screenshot", "The test failed", async function() {
            const element = await $("h1.hero__title")

            await element.highlight()
            await browser.pause(1000)
            expect(await $(`#customHighlight_${element.elementId}`).isDisplayed()).to.equal(true)

            await element.removeHighlight()
            await browser.pause(1000)
            expect(await $(`#customHighlight_${element.elementId}`).isExisting()).to.equal(false)
        })
    })

    after(async function() {
        await step({createLog: true, takeScreenshot: false}, "Close the browser", "Close the browser", "Close the browser", async function() {
            //await browser.closeWindow()
        })
    })

})