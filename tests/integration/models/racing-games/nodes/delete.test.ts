import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../src/models/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Deleting a RACING GAME', () => {
    test('that does not exist', async () => {
        await expect(RacingGame.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(NodeTypeEnum.RACING_GAME)
        await expect(RacingGame.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
