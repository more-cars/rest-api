import {expect, test} from 'vitest'
import {FakeSessionResult} from "../../../../_toolbox/fixtures/nodes/FakeSessionResult"
import {SessionResult} from "../../../../../src/models/session-results/SessionResult"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeSessionResult.dbInput()
    const createdNode = await SessionResult.create(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeSessionResult.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await SessionResult.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
