import {expect, test} from 'vitest'
import {FakeTrackLayout} from "../../../../_toolbox/fixtures/nodes/FakeTrackLayout"
import {marshalNodes} from "../../../../../src/controllers/track-layouts/marshalling/marshalNodes"

test("marshalling a collection of TRACK LAYOUT nodes", async () => {
    const fakeNode1 = FakeTrackLayout.modelOutput()
    const fakeNode2 = FakeTrackLayout.modelOutput()
    const fakeNode3 = FakeTrackLayout.modelOutput()

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
