# WDIO JSON Steps Reporter

> A WebdriverIO plugin. Report results in json format with steps and screenshot support.
> This project was derived from the 'wdio-json-reporter' found [here](https://github.com/fijijavis/wdio-json-reporter)

## Example Screenshots

![Dashboard](https://raw.githubusercontent.com/James-McConaghy/wdio-json-steps-reporter/feature/html-report/example-dashboard.png)
![Highlight](https://raw.githubusercontent.com/James-McConaghy/wdio-json-steps-reporter/feature/html-report/example-highlight.png)


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
Configure wdio to use the required StepsReporter as a reporter. It is recommended to supply a unique value to ensure historic test records are kept especially when utilizing the react report dashboard to get the full benefits of it's features
* @param {string} outputDir : The directory where the results will be logged. 
```javascript
    reporters: [
        [StepsReporter.reporter, {
            outputDir: `./results/${version}`,
        }]
    ]
```

#### Overwrite/Add custom commands to browser and element
Overwrite and add the commands from the required StepsReporter.
```javascript
    before: function (capabilities, specs) {
        browser.overwriteCommand("saveScreenshot", StepsReporter.saveScreenshot)
        browser.addCommand("highlight", StepsReporter.highlight, true)
        browser.addCommand("removeHighlight", StepsReporter.removeHighlight, true)
        browser.addCommand("removeHighlights", StepsReporter.removeHighlights)
    }
```

##### Merge results to single file
Finally on the completion of test execution use the required mergeResults function to generate a single JSON file which can be utilized by the react report dashboard. Alternatively you may wish to call this from a script as part of npm test. It is recommended to supply a unique value to ensure historic test records are kept especially 
when utilizing the report dashboard to get the full benefits of it's features
* @param {string} resultsDir : The resultsDir where the results were logged by the StepsReporter. 


```javascript
    onComplete: function(exitCode, config, capabilities, results) {
        StepsReporter.generateWebReport({
            resultsDir: `./results/${version}`
        }}
    }
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

before(function () {
    step({createLog: true, takeScreenshot: true}, "Navigate to the Home page", "Home page should load", "The Home page loaded", () => {
        browser.url("https://webdriver.io")
        page.waitUntilLoaded()
    })
})

it("should have the correct title", function() {
    page.verifyPageTitle() //defaults = {createStep: true, takeScreenshot: false}
    page.verifyPageTitle({createStep: false) // no log will be generated in the report, the tasks will still be executed
    page.verifyPageTitle({takeScreenshot: true, highlightElement: $(".hero__subtitle")}) //fullpage screenshot, highlighting the title element
    page.verifyPageTitle({customDescription: "Override the description", customExpectation: "Override the expectation"}))
})

verifyPageTitle(stepOptions?: StepOptions): void {
    step(stepOptions, 
        "Verify the page title is correct",
        "The page title should be correct",
        "The page title was correct", () => {
        const title = $(".hero__subtitle")
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
        highlightElement?: WebdriverIO.Element;
        customDescription?: string;
        customExpectation?: string;
        customActual?: string;
    };
```

For more information on WebdriverIO see the [homepage](http://webdriver.io).