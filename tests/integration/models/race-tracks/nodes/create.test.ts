import {expect, test} from 'vitest'
import {FakeRaceTrack} from "../../../../_toolbox/fixtures/nodes/FakeRaceTrack"
import {RaceTrack} from "../../../../../src/models/node-types/race-tracks/RaceTrack"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeRaceTrack.dbInput()
    const createdNode = await RaceTrack.create(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeRaceTrack.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await RaceTrack.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
