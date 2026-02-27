import {expect, test} from 'vitest'
import {FakeMagazine} from "../../../../../_toolbox/fixtures/nodes/FakeMagazine"
import {Magazine} from "../../../../../../src/models/node-types/magazines/Magazine"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeMagazine.dbInput
    const createdNode = await Magazine.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeMagazine.dbInput
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await Magazine.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
