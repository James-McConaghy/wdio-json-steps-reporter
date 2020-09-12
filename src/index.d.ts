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

    type Action = Step
    type Assertion = Step

    /**
     * The step wrapper should be used to generate a log and screenshot 
     * for page object actions and assertions that the webdriver will execute. 

     * @param {StepOptions} stepOptions to toggle logging and screenshot generation as well as overriding pre-defined page actions/assertions.
     * @param {string} description of the code to be executed
     * @param {string} expected outcome of the code to be executed
     * @param {string} actual outcome of the code to be executed
     * @param {Function} tasks to be executed by the webdriver
     * @return {Action|Assertion} Returns itself as an Action|Assertion which can be used in the steps wrapper function
    */
    function step(stepOptions: StepOptions = { createLog: true, takeScreenshot: false }, description: string, expectation: string, actual: string, tasks: Function): Action | Assertion;
    
    /**
     * The steps wrapper, similar to the singular step wrapper. Can be used to automatically combine step wrapper calls
     * executed by the webdriver into a single log and screenshot in the process. 

     * @param {StepOptions} stepOptions to toggle logging and screenshot generation as well as overriding pre-defined page actions/assertions.
     * @param {Function[]} actions An array of step functions to be executed first.
     * @param {Function[]} assertions An array of step functions to be executed after completing the actions.
    */
    function steps(stepOptions: StepOptions = { createLog: true, takeScreenshot: false }, actions: Action[], assertions: Assertion[]): void;

}

module.exports = step;
module.exports = steps;