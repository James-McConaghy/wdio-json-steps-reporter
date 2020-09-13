/// <reference types="@wdio/sync/webdriverio-core" />

declare module "wdio-json-steps-reporter" {

    type Step = {
        description: string;
        expectation: string;
        actual: string;
        status: string;
        error?: string;
        screenshotPath?: string;
    }

    type StepOptions = {
        createLog: boolean;
        takeScreenshot: boolean | WebdriverIO.Element;
        customDescription?: string;
        customExpectation?: string;
        customActual?: string;
    };

    type Action = Function
    type Assertion = Function

    /**
     * The step (single) wrapper should be used to generate a log and screenshot 
     * for page object actions and assertions that the webdriver will execute. 
     * 
     * If nested step Actions/Assertions are used ensure to pass {createStep: false, takeScreenshot: false} to those steps, otherwise
     * step logic will duplicate with this steps wrapping log

        * @param {StepOptions} stepOptions to toggle logging and screenshot generation as well as overriding pre-defined page actions/assertions.
        * @param {string} description of the code to be executed
        * @param {string} expected outcome of the code to be executed
        * @param {string} actual outcome of the code to be executed
        * @param {Function} tasks to be executed by the webdriver
        * @return {Action | Assertion} The Step log object that will be used in the resulting json results and combined Steps wrapper.
    */
    function step(stepOptions: StepOptions = { createLog: true, takeScreenshot: false }, description: string, expectation: string, actual: string, tasks: Function): Action | Assertion;
    
    /**
     * The steps (plural) wrapper, similar to the single step wrapper can be used to generate a single log and screenshot for multiple Actions/Assertions
     * executed by the test. All actions will get executed first before any assertions are verified.
     *
     * Actions and Assertions used should accept the default stepOptions passed in via the callback, otherwise step logic
     * will duplicate with this combined steps wrapping log. 
     * 
        * @param {StepOptions} stepOptions to toggle logging and screenshot generation as well as overriding pre-defined page actions/assertions.
        * @param {Action[]} actions An array of step functions to be executed first.
        * @param {Assertion[]} assertions An array of step functions to be executed after completing the actions.
        * 
        * @example steps({createLog: true, takeScreenshot: true},
                    [(stepOptions: StepOptions) => navigateToPage("https://webdriver.io", stepOptions)], 
                    [(stepOptions: StepOptions) => verifyPageTitle(stepOptions)]
                )
        * 
        * 
    */
    function steps(stepOptions: StepOptions = { createLog: true, takeScreenshot: false }, actions: Action[], assertions: Assertion[]): void;

}

module.exports = step;
module.exports = steps;