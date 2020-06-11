const expect = require("chai").expect
const runnerMock = require("../__mocks__/runner.json")
const initResultSet = require("../../src/initResultSet")

describe("Tests to validate initializing the result set", () => {
    it("Should successfully map runner attributes to the result set object", () => {
        const resultSet = initResultSet(runnerMock)
        expect(resultSet.start).to.eql(runnerMock.start)
        expect(resultSet.end).to.eql(runnerMock.end)
        expect(resultSet.capabilities).to.eql(runnerMock.capabilities)
        expect(resultSet.host).to.eql(runnerMock.config.hostname)
        expect(resultSet.port).to.eql(runnerMock.config.port)
        expect(resultSet.baseUrl).to.eql(runnerMock.config.baseUrl)
        expect(resultSet.waitForTimeout).to.eql(runnerMock.config.waitForTimeout)
        expect(resultSet.framework).to.eql(runnerMock.config.framework)
        expect(resultSet.mochaOpts).to.eql(runnerMock.config.mochaOpts)
        expect(resultSet.suites.length).to.eql(0)
        expect(resultSet.specs.length).to.eql(0)
        expect(resultSet.state).to.eql({ passed: 0, failed: 0, skipped: 0 })
    })
})
