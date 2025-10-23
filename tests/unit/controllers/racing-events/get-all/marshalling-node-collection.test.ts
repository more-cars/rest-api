import {expect, test} from 'vitest'
import {FakeRacingEvent} from "../../../../_toolbox/fixtures/nodes/FakeRacingEvent"
import {marshalNodes} from "../../../../../src/controllers/racing-events/marshalling/marshalNodes"

test("marshalling a collection of RACING EVENT nodes", async () => {
    const fakeNode1 = FakeRacingEvent.modelOutput()
    const fakeNode2 = FakeRacingEvent.modelOutput()
    const fakeNode3 = FakeRacingEvent.modelOutput()

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
