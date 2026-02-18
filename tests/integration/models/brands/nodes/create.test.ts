import {expect, test} from 'vitest'
import {FakeBrand} from "../../../../_toolbox/fixtures/nodes/FakeBrand"
import {Brand} from "../../../../../src/models/node-types/brands/Brand"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeBrand.dbInput()
    const createdNode = await Brand.create(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeBrand.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await Brand.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
