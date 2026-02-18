import {expect, test} from 'vitest'
import {FakeRacingSeries} from "../../../../_toolbox/fixtures/nodes/FakeRacingSeries"
import {RacingSeries} from "../../../../../src/models/node-types/racing-series/RacingSeries"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeRacingSeries.dbInput()
    const createdNode = await RacingSeries.create(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeRacingSeries.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await RacingSeries.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
