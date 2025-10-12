import {expect, test} from 'vitest'
import type {BrandNode} from "../../../../../src/models/brands/types/BrandNode"
import FakeBrand from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {marshalNodes} from "../../../../../src/controllers/brands/marshalling/marshalNodes"

test("marshalling a collection of BRAND nodes", async () => {
    const fakeNode1: BrandNode = Object.assign({}, FakeBrand, {id: 1, created_at: "dummy", updated_at: "dummy"})
    const fakeNode2: BrandNode = Object.assign({}, FakeBrand, {id: 2, created_at: "dummy", updated_at: "dummy"})
    const fakeNode3: BrandNode = Object.assign({}, FakeBrand, {id: 3, created_at: "dummy", updated_at: "dummy"})

    const nodes: Array<BrandNode> = [
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
