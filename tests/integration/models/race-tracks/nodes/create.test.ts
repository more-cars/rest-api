import {expect, test} from 'vitest'
import {RaceTrack} from "../../../../../src/models/race-tracks/RaceTrack"
import FakeRaceTrack from "../../../../_toolbox/fixtures/nodes/FakeRaceTrack"

test('Expecting node to be created when provided with valid data', async () => {
    const createdNode = await RaceTrack.create(FakeRaceTrack)

    expect(createdNode)
        .toEqual(expect.objectContaining(FakeRaceTrack))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeRaceTrack
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
