import {describe, expect, test} from 'vitest'
import {Video} from "../../../../../../../../src/models/node-types/videos/Video"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›belongs-to-node‹ relationships', () => {
    test('node and relationships exist', async () => {
        const video = await seedNode(DbNodeType.Video)
        await seedRelationshipForStartNode(video.properties.id, DbNodeType.Node, RelationshipType.VideoBelongsToNode)
        await seedRelationshipForStartNode(video.properties.id, DbNodeType.Node, RelationshipType.VideoBelongsToNode)

        const relationships = await Video.getAllBelongsToNodeRelationships(video.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const video = await seedNode(DbNodeType.Video)

        const relationships = await Video.getAllBelongsToNodeRelationships(video.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Video.getAllBelongsToNodeRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
