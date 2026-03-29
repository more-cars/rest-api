import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Video} from "../../../../../../../../src/models/node-types/videos/Video"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-main-video-of-node‹ relationship with nodes that do not exist', async () => {
    const video = await seedNode(DbNodeType.Video)
    const node = await seedNode(DbNodeType.Node)

    await expect(Video.createIsMainVideoOfNodeRelationship(-42, node.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Video.createIsMainVideoOfNodeRelationship(video.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Video.createIsMainVideoOfNodeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
