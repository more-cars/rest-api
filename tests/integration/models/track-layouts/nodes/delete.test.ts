import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Deleting a TRACK LAYOUT', () => {
    test('that does not exist', async () => {
        await expect(TrackLayout.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(ControllerNodeType.TRACK_LAYOUT)
        await expect(TrackLayout.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
