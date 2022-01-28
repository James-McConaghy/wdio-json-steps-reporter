const expect = require("chai").expect
const MapTest = require("../../src/mapTests")
const passingTest = require("../__mocks__/passing.json")
const skippedTest = require("../__mocks__/skipped.json")
const failingTest = require("../__mocks__/failing.json")

describe("Tests to validate mapping Tests", async function() {
    it("Should successfully map a passing test", async function() {
        const testData = MapTest([passingTest])

        expect(testData.length).to.eql(1)
        expect(testData[0]).to.eql({
            name: passingTest.title,
            start: passingTest.start,
            end: passingTest.end,
            duration: passingTest._duration,
            state: passingTest.state,
            steps: passingTest.steps
        })
    })

    it("Should successfully map a skipped test", async function() {
        const testData = MapTest([skippedTest])

        expect(testData.length).to.equal(1)
        expect(testData[0]).to.eql({
            name: skippedTest.title,
            start: skippedTest.start,
            end: skippedTest.end,
            duration: skippedTest._duration,
            state: skippedTest.state,
            steps: []
        })
    })

    it("Should successfully map a failing test", async function() {
        const testData = MapTest([failingTest])

        expect(testData.length).to.equal(1)
        expect(testData[0]).to.eql({
            name: failingTest.title,
            start: failingTest.start,
            end: failingTest.end,
            duration: failingTest._duration,
            state: failingTest.state,
            errorType: failingTest.error.type,
            error: failingTest.error.message,
            steps: failingTest.steps,
            standardError: failingTest.error.stack
        })
    })

    it("Should successfully map multiple tests", async function() {
        const testData = MapTest([passingTest, skippedTest, failingTest])

        expect(testData.length).to.eql(3)
    })
})
