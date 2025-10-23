import {expect, test} from 'vitest'
import {RacingEvent} from "../../../../../src/models/racing-events/RacingEvent"
import {FakeRacingEvent} from "../../../../_toolbox/fixtures/nodes/FakeRacingEvent"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeRacingEvent.dbInput()
    const createdNode = await RacingEvent.create(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeRacingEvent.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await RacingEvent.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
