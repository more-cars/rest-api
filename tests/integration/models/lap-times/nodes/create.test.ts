import {expect, test} from 'vitest'
import {FakeLapTime} from "../../../../_toolbox/fixtures/nodes/FakeLapTime"
import {LapTime} from "../../../../../src/models/node-types/lap-times/LapTime"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeLapTime.dbInput()
    const createdNode = await LapTime.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeLapTime.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await LapTime.create(data)

    expect(createdNode.attributes)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
