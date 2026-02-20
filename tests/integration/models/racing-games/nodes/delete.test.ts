import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../src/models/node-types/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Deleting a RACING GAME', () => {
    test('that does not exist', async () => {
        await expect(RacingGame.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(ControllerNodeType.RACING_GAME)
        await expect(RacingGame.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
