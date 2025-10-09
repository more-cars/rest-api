import {expect, test} from 'vitest'
import type {ImageNode} from "../../../../../src/models/images/types/ImageNode"
import FakeImageFull from "../../../../_toolbox/fixtures/nodes/FakeImageFull"
import {marshalNodeCollection} from "../../../../../src/controllers/images/marshalling/marshalNodeCollection"

test('marshalling a complete and valid request', async () => {
    const fakeNode1: ImageNode = Object.assign({}, FakeImageFull, {id: 1, created_at: "dummy", updated_at: "dummy"})
    const fakeNode2: ImageNode = Object.assign({}, FakeImageFull, {id: 2, created_at: "dummy", updated_at: "dummy"})
    const fakeNode3: ImageNode = Object.assign({}, FakeImageFull, {id: 3, created_at: "dummy", updated_at: "dummy"})

    const nodes: Array<ImageNode> = [
        fakeNode1,
        fakeNode2,
        fakeNode3,
    ]

    const mappedNodes = marshalNodeCollection(nodes)

    expect(mappedNodes[0])
        .toEqual({data: fakeNode1})

    expect(mappedNodes[1])
        .toEqual({data: fakeNode2})

    expect(mappedNodes[2])
        .toEqual({data: fakeNode3})
})
