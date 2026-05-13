import {expect, test} from 'vitest'
import {FakeRacingEvent} from "../../../../../_toolbox/fixtures/nodes/FakeRacingEvent"
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeRacingEvent.dbInput()
    const createdNode = await RacingEvent.create(inputData)

    expect(createdNode.attributes)
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

    expect(createdNode.attributes)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
