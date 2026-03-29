import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Video} from "../../../../../../../../src/models/node-types/videos/Video"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-node‹ relationship again', async () => {
    const video = await seedNode(DbNodeType.Video)
    const node = await seedNode(DbNodeType.Node)

    await expect(Video.createBelongsToNodeRelationship(video.properties.id, node.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Video.createBelongsToNodeRelationship(video.properties.id, node.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
