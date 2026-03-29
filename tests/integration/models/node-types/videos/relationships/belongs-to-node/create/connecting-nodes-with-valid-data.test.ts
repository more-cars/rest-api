import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Video} from "../../../../../../../../src/models/node-types/videos/Video"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-node‹ relationship with valid data', async () => {
    const video = await seedNode(DbNodeType.Video)
    const node = await seedNode(DbNodeType.Node)

    const createdRelationship = await Video.createBelongsToNodeRelationship(video.properties.id, node.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(video.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(node.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.VideoBelongsToNode)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
