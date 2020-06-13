/// <reference types="@wdio/sync/webdriverio-core" />

declare module "wdio-json-steps-reporter" {

    type StepOptions = {
        createLog: boolean;
        takeScreenshot: boolean | WebdriverIO.Element;
        customDescription?: string;
        customExpectation?: string;
        customActual?: string;
    };

    function step(stepOptions: StepOptions, description: string, expectation: string, actual: string, tasks: Function): void;
    

}
module.export = step