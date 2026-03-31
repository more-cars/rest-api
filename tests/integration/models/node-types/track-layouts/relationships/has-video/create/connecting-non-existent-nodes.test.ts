import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {TrackLayout} from "../../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-video‹ relationship with nodes that do not exist', async () => {
    const trackLayout = await seedNode(DbNodeType.TrackLayout)
    const video = await seedNode(DbNodeType.Video)

    await expect(TrackLayout.createHasVideoRelationship(-42, video.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createHasVideoRelationship(trackLayout.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createHasVideoRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
