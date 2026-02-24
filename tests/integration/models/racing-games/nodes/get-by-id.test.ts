import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a RACING GAME', () => {
    test('which does not exist', async () => {
        await expect(RacingGame.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedRacingGame = await seedNode(DbNodeType.RacingGame)
        const actualRacingGame = await RacingGame.findById(expectedRacingGame.properties.id)

        expect(actualRacingGame.attributes)
            .toEqual(expectedRacingGame.properties)
    })
})
