import {expect, test} from 'vitest'
import type {TrackLayoutNode} from "../../../../../src/models/track-layouts/types/TrackLayoutNode"
import FakeTrackLayout from "../../../../_toolbox/fixtures/nodes/FakeTrackLayout"
import {marshalNodes} from "../../../../../src/controllers/track-layouts/marshalling/marshalNodes"

test("marshalling a collection of TRACK LAYOUT nodes", async () => {
    const fakeNode1: TrackLayoutNode = Object.assign({}, FakeTrackLayout, {id: 1, created_at: "dummy", updated_at: "dummy"})
    const fakeNode2: TrackLayoutNode = Object.assign({}, FakeTrackLayout, {id: 2, created_at: "dummy", updated_at: "dummy"})
    const fakeNode3: TrackLayoutNode = Object.assign({}, FakeTrackLayout, {id: 3, created_at: "dummy", updated_at: "dummy"})

    const nodes: Array<TrackLayoutNode> = [
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
