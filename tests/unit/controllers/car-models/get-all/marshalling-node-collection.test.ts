import {expect, test} from 'vitest'
import {FakeCarModel} from "../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {marshalNodes} from "../../../../../src/controllers/node-types/car-models/marshalling/marshalNodes"

test("marshalling a collection of CAR MODEL nodes", async () => {
    const fakeNode1 = FakeCarModel.modelOutput()
    const fakeNode2 = FakeCarModel.modelOutput()
    const fakeNode3 = FakeCarModel.modelOutput()

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
