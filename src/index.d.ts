declare module "wdio-json-steps-reporter" {

    import { ChainablePromiseElement } from "webdriverio";

    export interface Step {
        description: string;
        expectation: string;
        actual: string;
        state: string;
        error?: string;
        screenshotPath?: string;
    }

    export interface StepOptions {
        createLog: boolean;
        takeScreenshot: boolean;
        customDescription?: string;
        customExpectation?: string;
        customActual?: string;
        highlightElement?: ChainablePromiseElement<Promise<WebdriverIO.Element>>
    }

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
        * @return {Promise<Step>} The Step log object that will be used in the resulting json results and combined Steps wrapper.
    */
     export function step(stepOptions: StepOptions, description: string, expectation: string, actual: string, tasks: Function): Promise<Step>


     global {

        namespace WebdriverIO {

            interface Browser {

                saveScreenshot(filepath: string)

                /**
                 * This method overwrites the default wdio saveScreenshot, allowing an Element Selector to be passed in 
                 * which will get highlighted for the screenshot.
                 * 
                    * @param {string} filepath The file path to save the screenshot.
                    * @param {ChainablePromiseElement<Promise<WebdriverIO.Element>>} element The element to be highlighted.
                    * 
                */
                saveScreenshot(filepath: string, element: ChainablePromiseElement<Promise<WebdriverIO.Element>>)

                /**
                 * This method will remove all highlight styles that have been applied to elements on the current DOM.
                 * 
                */
                removeHighlights(): Promise<void>
            }

            // adding command to `element`
            interface Element {
                /**
                 * Highlights the element with a red border style.
                 * 
                */
                highlight(): Promise<void>

                /**
                 * Removes the highlight style on the current element.
                 * 
                */
                removeHighlight(): Promise<void>
            }

        }

    }

}