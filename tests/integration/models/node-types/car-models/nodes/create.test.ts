import {expect, test} from 'vitest'
import {FakeCarModel} from "../../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {CarModel} from "../../../../../../src/models/node-types/car-models/CarModel"

test('When providing valid data the new node can be created', async () => {
    const inputData = FakeCarModel.dbInput()
    const createdNode = await CarModel.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Read-only properties cannot be overridden', async () => {
    const validData = FakeCarModel.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await CarModel.create(data)

    expect(createdNode.attributes)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
