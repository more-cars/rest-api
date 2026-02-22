import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../src/models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Deleting a RACING SESSION', () => {
    test('that does not exist', async () => {
        await expect(RacingSession.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.RacingSession)
        await expect(RacingSession.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
