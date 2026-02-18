import {expect, test} from 'vitest'
import {FakeRacingSession} from "../../../../_toolbox/fixtures/nodes/FakeRacingSession"
import {RacingSession} from "../../../../../src/models/node-types/racing-sessions/RacingSession"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeRacingSession.dbInput()
    const createdNode = await RacingSession.create(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeRacingSession.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await RacingSession.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
