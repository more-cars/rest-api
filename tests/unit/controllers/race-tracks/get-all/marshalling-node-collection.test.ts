import {expect, test} from 'vitest'
import {FakeRaceTrack} from "../../../../_toolbox/fixtures/nodes/FakeRaceTrack"
import {marshalNodes} from "../../../../../src/controllers/race-tracks/marshalling/marshalNodes"

test("marshalling a collection of RACE TRACK nodes", async () => {
    const fakeNode1 = FakeRaceTrack.modelOutput()
    const fakeNode2 = FakeRaceTrack.modelOutput()
    const fakeNode3 = FakeRaceTrack.modelOutput()

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
