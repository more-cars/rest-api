import {expect, test} from 'vitest'
import type {ImageNode} from "../../../../../src/models/images/types/ImageNode"
import FakeImageFull from "../../../../_toolbox/fixtures/nodes/FakeImageFull"
import {marshalNodes} from "../../../../../src/controllers/images/marshalling/marshalNodes"

test("marshalling a collection of IMAGE nodes", async () => {
    const fakeNode1: ImageNode = Object.assign({}, FakeImageFull, {id: 1, created_at: "dummy", updated_at: "dummy"})
    const fakeNode2: ImageNode = Object.assign({}, FakeImageFull, {id: 2, created_at: "dummy", updated_at: "dummy"})
    const fakeNode3: ImageNode = Object.assign({}, FakeImageFull, {id: 3, created_at: "dummy", updated_at: "dummy"})

    const nodes: Array<ImageNode> = [
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
