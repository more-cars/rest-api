import {expect, test} from 'vitest'
import {FakeRacingSession} from "../../../../_toolbox/fixtures/nodes/FakeRacingSession"
import {marshalNodes} from "../../../../../src/controllers/node-types/racing-sessions/marshalling/marshalNodes"

test("marshalling a collection of RACING SESSION nodes", async () => {
    const fakeNode1 = FakeRacingSession.modelOutput()
    const fakeNode2 = FakeRacingSession.modelOutput()
    const fakeNode3 = FakeRacingSession.modelOutput()

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
