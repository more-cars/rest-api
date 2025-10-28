import {expect, test} from 'vitest'
import {FakeSessionResult} from "../../../../_toolbox/fixtures/nodes/FakeSessionResult"
import {marshalNodes} from "../../../../../src/controllers/session-results/marshalling/marshalNodes"

test("marshalling a collection of SESSION RESULT nodes", async () => {
    const fakeNode1 = FakeSessionResult.modelOutput()
    const fakeNode2 = FakeSessionResult.modelOutput()
    const fakeNode3 = FakeSessionResult.modelOutput()

    const nodes = [
        fakeNode1,
        fakeNode2,
        fakeNode3,
    ]

    const marshalledData = marshalNodes(nodes)

    expect(marshalledData.data[0])
        .toEqual({data: fakeNode1})

    expect(marshalledData.data[1])
        .toEqual({data: fakeNode2})

    expect(marshalledData.data[2])
        .toEqual({data: fakeNode3})
})
