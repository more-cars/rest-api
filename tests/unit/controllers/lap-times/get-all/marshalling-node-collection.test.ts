import {expect, test} from 'vitest'
import {FakeLapTime} from "../../../../_toolbox/fixtures/nodes/FakeLapTime"
import {marshalNodes} from "../../../../../src/controllers/lap-times/marshalling/marshalNodes"

test("marshalling a collection of LAP TIME nodes", async () => {
    const fakeNode1 = FakeLapTime.modelOutput()
    const fakeNode2 = FakeLapTime.modelOutput()
    const fakeNode3 = FakeLapTime.modelOutput()

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
