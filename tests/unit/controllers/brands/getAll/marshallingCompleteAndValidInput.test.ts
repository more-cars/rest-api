import {expect, test} from 'vitest'
import type {BrandNode} from "../../../../../src/models/brands/types/BrandNode"
import FakeBrand from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {marshalNodeCollection} from "../../../../../src/controllers/brands/marshalling/marshalNodeCollection"

test('marshalling a complete and valid request', async () => {
    const fakeNode1: BrandNode = Object.assign({}, FakeBrand, {id: 1, created_at: "dummy", updated_at: "dummy"})
    const fakeNode2: BrandNode = Object.assign({}, FakeBrand, {id: 2, created_at: "dummy", updated_at: "dummy"})
    const fakeNode3: BrandNode = Object.assign({}, FakeBrand, {id: 3, created_at: "dummy", updated_at: "dummy"})

    const nodes: Array<BrandNode> = [
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
