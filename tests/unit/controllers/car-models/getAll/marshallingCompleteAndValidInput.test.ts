import {expect, test} from 'vitest'
import type {CarModelNode} from "../../../../../src/models/car-models/types/CarModelNode"
import FakeCarModel from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {marshalNodes} from "../../../../../src/controllers/carModels/marshalling/marshalNodes"

test('marshalling a complete and valid request', async () => {
    const fakeNode1: CarModelNode = Object.assign({}, FakeCarModel, {id: 1, created_at: "dummy", updated_at: "dummy"})
    const fakeNode2: CarModelNode = Object.assign({}, FakeCarModel, {id: 2, created_at: "dummy", updated_at: "dummy"})
    const fakeNode3: CarModelNode = Object.assign({}, FakeCarModel, {id: 3, created_at: "dummy", updated_at: "dummy"})

    const nodes: Array<CarModelNode> = [
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
