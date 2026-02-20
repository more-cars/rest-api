import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../src/models/node-types/session-results/SessionResult"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Deleting a SESSION RESULT', () => {
    test('that does not exist', async () => {
        await expect(SessionResult.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(ControllerNodeType.SESSION_RESULT)
        await expect(SessionResult.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
