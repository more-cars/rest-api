import {expect, test} from 'vitest'
import {FakeProgramme} from "../../../../../_toolbox/fixtures/nodes/FakeProgramme"
import {Programme} from "../../../../../../src/models/node-types/programmes/Programme"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeProgramme.dbInput
    const createdNode = await Programme.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeProgramme.dbInput
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await Programme.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
