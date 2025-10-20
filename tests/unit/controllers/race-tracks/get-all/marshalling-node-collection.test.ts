import {expect, test} from 'vitest'
import type {RaceTrackNode} from "../../../../../src/models/race-tracks/types/RaceTrackNode"
import FakeRaceTrack from "../../../../_toolbox/fixtures/nodes/FakeRaceTrack"
import {marshalNodes} from "../../../../../src/controllers/race-tracks/marshalling/marshalNodes"

test("marshalling a collection of RACE TRACK nodes", async () => {
    const fakeNode1: RaceTrackNode = Object.assign({}, FakeRaceTrack, {id: 1, created_at: "dummy", updated_at: "dummy"})
    const fakeNode2: RaceTrackNode = Object.assign({}, FakeRaceTrack, {id: 2, created_at: "dummy", updated_at: "dummy"})
    const fakeNode3: RaceTrackNode = Object.assign({}, FakeRaceTrack, {id: 3, created_at: "dummy", updated_at: "dummy"})

    const nodes: Array<RaceTrackNode> = [
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
