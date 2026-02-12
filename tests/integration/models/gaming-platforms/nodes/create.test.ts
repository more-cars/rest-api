import {expect, test} from 'vitest'
import {FakeGamingPlatform} from "../../../../_toolbox/fixtures/nodes/FakeGamingPlatform"
import {GamingPlatform} from "../../../../../src/models/gaming-platforms/GamingPlatform"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeGamingPlatform.dbInput()
    const createdNode = await GamingPlatform.create(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeGamingPlatform.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await GamingPlatform.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
