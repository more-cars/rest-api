import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(TrackLayout.createHasImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createHasImageRelationship(trackLayout.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
