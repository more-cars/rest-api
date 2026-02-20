import {expect, test} from 'vitest'
import {FakeRacingGame} from "../../../../_toolbox/fixtures/nodes/FakeRacingGame"
import {RacingGame} from "../../../../../src/models/node-types/racing-games/RacingGame"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeRacingGame.dbInput()
    const createdNode = await RacingGame.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeRacingGame.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await RacingGame.create(data)

    expect(createdNode.attributes)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
