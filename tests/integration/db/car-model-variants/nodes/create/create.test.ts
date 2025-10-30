import {expect, test} from 'vitest'
import {FakeCarModelVariant} from "../../../../../_toolbox/fixtures/nodes/FakeCarModelVariant"
import {createNode} from "../../../../../../src/db/nodes/car-model-variants/createNode"

test('Creating node with valid data', async () => {
    const inputData = FakeCarModelVariant.dbInput()
    const createdNode = await createNode(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})
