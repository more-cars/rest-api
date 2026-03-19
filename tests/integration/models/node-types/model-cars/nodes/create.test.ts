import {expect, test} from 'vitest'
import {FakeModelCar} from "../../../../../_toolbox/fixtures/nodes/FakeModelCar"
import {ModelCar} from "../../../../../../src/models/node-types/model-cars/ModelCar"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeModelCar.dbInput
    const createdNode = await ModelCar.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeModelCar.dbInput
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await ModelCar.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
