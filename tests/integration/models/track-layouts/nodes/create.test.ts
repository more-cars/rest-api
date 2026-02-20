import {expect, test} from 'vitest'
import {FakeTrackLayout} from "../../../../_toolbox/fixtures/nodes/FakeTrackLayout"
import {TrackLayout} from "../../../../../src/models/node-types/track-layouts/TrackLayout"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeTrackLayout.dbInput()
    const createdNode = await TrackLayout.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeTrackLayout.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await TrackLayout.create(data)

    expect(createdNode.attributes)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
