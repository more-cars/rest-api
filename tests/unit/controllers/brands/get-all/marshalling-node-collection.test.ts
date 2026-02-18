import {expect, test} from 'vitest'
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {marshalNodes} from "../../../../../src/controllers/node-types/brands/marshalling/marshalNodes"

test("marshalling a collection of BRAND nodes", async () => {
    const fakeNode1 = FakeBrand.modelOutput()
    const fakeNode2 = FakeBrand.modelOutput()
    const fakeNode3 = FakeBrand.modelOutput()

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
