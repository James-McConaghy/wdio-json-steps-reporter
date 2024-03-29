# WDIO JSON Steps Reporter

> A WebdriverIO plugin. Report results in json format with steps and screenshot support.
> This project was derived from the 'wdio-json-reporter' found [here](https://github.com/fijijavis/wdio-json-reporter)

## Example Screenshots


<img src="https://raw.githubusercontent.com/James-McConaghy/wdio-json-steps-reporter/master/example-dashboard.png" width="900"/>

[Highlight example](https://raw.githubusercontent.com/James-McConaghy/wdio-json-steps-reporter/master/example-highlight.png)


## Setup

### Installation

NPM
```bash
    npm install wdio-json-steps-reporter --save-dev
```


### Configuration

Require the reporter in the wdio configuration file. 
```javascript
    const StepsReporter = require("wdio-json-steps-reporter")
```

##### Use the reporter
Configure wdio to use the required StepsReporter as a reporter.
* @param {string} outputDir : The directory where the results will be logged. 
* @param {string} testDir : The root directory where tests are stored 
* @param {string | number} build : The version, jenkins build or name that the results will be stored under 
```javascript
    reporters: [
        [StepsReporter.reporter, {
            outputDir: "./results/",
            testDir: "./test/",
            build: 17
        }]
    ]
```

#### Overwrite/Add custom commands to browser and element
Overwrite and add the commands from the required StepsReporter.
```javascript
    before: async function (capabilities, specs) {
        await browser.overwriteCommand("saveScreenshot", StepsReporter.saveScreenshot)
        await browser.addCommand("highlight", StepsReporter.highlight, true)
        await browser.addCommand("removeHighlight", StepsReporter.removeHighlight, true)
        await browser.addCommand("removeHighlights", StepsReporter.removeHighlights)
    }
```

##### Merge results to single file
Finally on the completion of test execution use the required mergeResults function to generate a single JSON file which can be utilized by the react report dashboard. Alternatively you may wish to call this from a script as part of npm test. It is recommended to supply a unique value to ensure historic test records are kept especially 
when utilizing the report dashboard to get the full benefits of it's features
* @param {string} reportDir : The report directory where the html report will get generated to. 
* @param {string} resultsDir : The results directory where the results were logged by the StepsReporter. 
* @param {string} testDir : The root directory where tests are stored 
* @param {string | number} build : The version, jenkins build or name that the html report will be generated for
```javascript
    onComplete: async function(exitCode, config, capabilities, results) {
        StepsReporter.generateWebReport({
            reportDir: "./report/",
            resultsDir: "./results/",
            testDir: "./test/",
            build: 17
        })
    }
```

##### Host the report on localhost
```bash
    node report/server.js
```


## Usage

### Log a step
Import the step function to be used during tests and page object actions
* @param {StepOptions} stepOptions : The options, can be used to override the page object actions 
* @param {string} description : The description explaining what is being done in the task.
* @param {string} expectation : The expected result of the task.
* @param {string} actual : The actual result if the task passes.
* @param {Function} task : The actions to be completed to determine if the test step passes or fails
```javascript
import { step } from "wdio-json-steps-reporter"
...

before(async function() {
    await step({createLog: true, takeScreenshot: true}, "Navigate to the Home page", "Home page should load", "The Home page loaded", async function() {
        await browser.url("https://webdriver.io")
        await page.waitUntilLoaded()
    })
})

it("should have the correct title", async function() {
    await page.verifyPageTitle() //defaults = {createStep: true, takeScreenshot: false}
    await page.verifyPageTitle({createStep: false) // no log will be generated in the report, the tasks will still be executed
    await page.verifyPageTitle({takeScreenshot: true, highlightElement: $(".hero__subtitle")}) //fullpage screenshot, highlighting the title element
    await page.verifyPageTitle({customDescription: "Override the description", customExpectation: "Override the expectation"}))
})

async verifyPageTitle(stepOptions?: StepOptions): Promise<Step> {
    return await step(stepOptions, 
        "Verify the page title is correct",
        "The page title should be correct",
        "The page title was correct", async function() {
        const title = await $(".hero__subtitle")
        expect(title).to.equal("Next-gen browser and mobile automation test framework for Node.js")
    })
}
```

### Step Options
The options can be used to override any default page object actions steps that have been created. Defaults = {createStep: true, takeScreenshot: false}.
Additionally, an element can be passed in to be highlighted in the screenshot.
```javascript
    type StepOptions = {
        createLog: boolean;
        takeScreenshot: boolean;
        highlightElement?: ChainablePromiseElement<Promise<WebdriverIO.Element>>;
        customDescription?: string;
        customExpectation?: string;
        customActual?: string;
    };
```

For more information on WebdriverIO see the [homepage](http://webdriver.io).