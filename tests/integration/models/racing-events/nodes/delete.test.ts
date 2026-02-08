import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../src/models/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Deleting a RACING EVENT', () => {
    test('that does not exist', async () => {
        await expect(RacingEvent.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(NodeTypeEnum.RACING_EVENT)
        await expect(RacingEvent.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
