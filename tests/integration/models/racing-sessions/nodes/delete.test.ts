import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../src/models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Deleting a RACING SESSION', () => {
    test('that does not exist', async () => {
        await expect(RacingSession.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(ControllerNodeType.RACING_SESSION)
        await expect(RacingSession.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
