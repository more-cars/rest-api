import {expect, test} from 'vitest'
import {FakeCarModelVariant} from "../../../../_toolbox/fixtures/nodes/FakeCarModelVariant"
import {CarModelVariant} from "../../../../../src/models/node-types/car-model-variants/CarModelVariant"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeCarModelVariant.dbInput()
    const createdNode = await CarModelVariant.create(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeCarModelVariant.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await CarModelVariant.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
