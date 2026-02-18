import {expect, test} from 'vitest'
import {FakeImage} from "../../../../_toolbox/fixtures/nodes/FakeImage"
import {marshalNodes} from "../../../../../src/controllers/node-types/images/marshalling/marshalNodes"

test("marshalling a collection of IMAGE nodes", async () => {
    const fakeNode1 = FakeImage.modelOutput()
    const fakeNode2 = FakeImage.modelOutput()
    const fakeNode3 = FakeImage.modelOutput()

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
