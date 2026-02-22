import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Deleting a RACING EVENT', () => {
    test('that does not exist', async () => {
        await expect(RacingEvent.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.RacingEvent)
        await expect(RacingEvent.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
