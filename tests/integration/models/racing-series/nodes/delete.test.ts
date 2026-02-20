import {describe, expect, test} from 'vitest'
import {RacingSeries} from "../../../../../src/models/node-types/racing-series/RacingSeries"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Deleting a RACING SERIES', () => {
    test('that does not exist', async () => {
        await expect(RacingSeries.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(ControllerNodeType.RACING_SERIES)
        await expect(RacingSeries.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
