import {expect, test} from 'vitest'
import {FakeCarModel} from "../../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {createNode} from "../../../../../../src/db/nodes/car-models/createNode"

test('When providing valid data the new node can be created', async () => {
    const inputData = FakeCarModel.dbInput()
    const createdNode = await createNode(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})
