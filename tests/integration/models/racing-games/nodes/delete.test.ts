import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../src/models/racing-games/RacingGame"
import {seedRacingGame} from "../../../../_toolbox/dbSeeding/racing-games/nodes/seedRacingGame"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Deleting a RACING GAME', () => {
    test('that does not exist', async () => {
        await expect(RacingGame.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedRacingGame()
        await expect(RacingGame.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
