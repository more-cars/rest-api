import {expect, test} from 'vitest'
import {FakeModelCarBrand} from "../../../../../_toolbox/fixtures/nodes/FakeModelCarBrand"
import {ModelCarBrand} from "../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeModelCarBrand.dbInput
    const createdNode = await ModelCarBrand.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeModelCarBrand.dbInput
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await ModelCarBrand.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
