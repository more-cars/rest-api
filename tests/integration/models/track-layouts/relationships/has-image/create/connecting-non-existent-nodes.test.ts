import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(TrackLayout.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createHasImageRelationship(trackLayout.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
