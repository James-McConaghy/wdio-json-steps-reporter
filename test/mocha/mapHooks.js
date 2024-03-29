const expect = require("chai").expect
const MapHooks = require("../../src/mapHooks")
const hookStub = [{
    "type": "hook",
    "start": "2019-03-07T19:15:49.426Z",
    "_duration": 1,
    "uid": "hook-00-0",
    "cid": "0-0",
    "title": "\"before each\" hook",
    "type": "before each",
    "parent": "Sample Suite",
    "currentTest": "Sample Test",
    "errors":
        [{ "message": "expected 1 to equal 6",
            "stack":
        "AssertionError: expected 1 to equal 6",
            "type": "AssertionError",
            "expected": 6,
            "actual": 1
        }],
    "end": "2019-03-07T19:15:49.427Z",
    "state": "failed",
    "steps": []
},
{
    "type": "hook",
    "start": "2019-03-07T19:15:49.437Z",
    "_duration": 0,
    "uid": "hook-00-2",
    "cid": "0-0",
    "title": "\"after each\" hook",
    "type": "after each",
    "parent": "Suite",
    "associatedTest": "Sample Test",
    "errors": [],
    "end": "2019-03-07T19:15:49.437Z",
    "steps": []
}]

describe("Tests to validate mapping hooks", async function() {
    it("Should successfully map a hook", async function() {
        const hookData = MapHooks(hookStub)

        expect(hookData.length).to.eql(2)
        expect(hookData[0]).to.eql({
            start: hookStub[0].start,
            end: hookStub[0].end,
            duration: hookStub[0]._duration,
            title: hookStub[0].title,
            type: hookStub[0].type,
            associatedSuite: hookStub[0].parent,
            associatedTest: hookStub[0].associatedTest,
            state: hookStub[0].state,
            steps: []
        })
        expect(hookData[1]).to.eql({
            start: hookStub[1].start,
            end: hookStub[1].end,
            duration: hookStub[1]._duration,
            title: hookStub[1].title,
            type: hookStub[1].type,
            associatedSuite: hookStub[1].parent,
            associatedTest: hookStub[1].associatedTest,
            state: "passed",
            steps: []
        })
    })
})
