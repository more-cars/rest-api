import {expect, test} from 'vitest'
import {FakeRacingSeries} from "../../../../_toolbox/fixtures/nodes/FakeRacingSeries"
import {marshalNodes} from "../../../../../src/controllers/racing-series/marshalling/marshalNodes"

test("marshalling a collection of RACING SERIES nodes", async () => {
    const fakeNode1 = FakeRacingSeries.modelOutput()
    const fakeNode2 = FakeRacingSeries.modelOutput()
    const fakeNode3 = FakeRacingSeries.modelOutput()

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
