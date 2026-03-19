import {expect, test} from 'vitest'
import {FakePrice} from "../../../../../_toolbox/fixtures/nodes/FakePrice"
import {Price} from "../../../../../../src/models/node-types/prices/Price"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakePrice.dbInput
    const createdNode = await Price.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakePrice.dbInput
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await Price.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
