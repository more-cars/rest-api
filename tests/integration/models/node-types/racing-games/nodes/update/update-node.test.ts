import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {FakeRacingGame} from "../../../../../../_toolbox/fixtures/nodes/FakeRacingGame"
import type {RacingGameInput} from "../../../../../../../src/models/node-types/racing-games/types/RacingGameInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a RACING GAME', () => {
    test('Node does not exist', async () => {
        await expect(RacingGame.update(-42, FakeRacingGame.dbInput() as RacingGameInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.RacingGame)
        const inputData = FakeRacingGame.dbInput()
        const updatedNode = await RacingGame.update(createdNode.properties.id, inputData as RacingGameInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.RacingGame)
        const validData = FakeRacingGame.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await RacingGame.update(createdNode.properties.id, inputData as RacingGameInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
