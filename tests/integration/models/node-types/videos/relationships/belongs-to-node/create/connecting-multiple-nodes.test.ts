import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Video} from "../../../../../../../../src/models/node-types/videos/Video"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A VIDEO can have multiple ›belongs-to-node‹ relationships', async () => {
    const video = await seedNode(DbNodeType.Video)
    const nodesAmount = 3
    const nodes = await seedNodes(DbNodeType.Node, nodesAmount)

    for (const node of nodes) {
        await Video.createBelongsToNodeRelationship(video.properties.id, node.properties.id)
    }

    const relationships = await getRelationshipCollection(video.properties.id, RelationshipType.VideoBelongsToNode)

    expect(relationships.length)
        .toBe(nodesAmount)
})
