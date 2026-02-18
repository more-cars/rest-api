import {expect, test} from 'vitest'
import {FakeCarModelVariant} from "../../../../_toolbox/fixtures/nodes/FakeCarModelVariant"
import {marshalNodes} from "../../../../../src/controllers/node-types/car-model-variants/marshalling/marshalNodes"

test("marshalling a collection of CAR MODEL VARIANT nodes", async () => {
    const fakeNode1 = FakeCarModelVariant.modelOutput()
    const fakeNode2 = FakeCarModelVariant.modelOutput()
    const fakeNode3 = FakeCarModelVariant.modelOutput()

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
