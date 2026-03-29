import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›is-main-video-of-node‹ relationships', () => {
    test('node and relationships exist', async () => {
        const video = await seedNode(DbNodeType.Video)
        await seedRelationshipForStartNode(video.properties.id, DbNodeType.Node, RelationshipType.VideoIsMainVideoOfNode)
        await seedRelationshipForStartNode(video.properties.id, DbNodeType.Node, RelationshipType.VideoIsMainVideoOfNode)

        const relationships = await getRelationshipCollection(
            video.properties.id,
            RelationshipType.VideoIsMainVideoOfNode,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const video = await seedNode(DbNodeType.Video)

        const relationships = await getRelationshipCollection(
            video.properties.id,
            RelationshipType.VideoIsMainVideoOfNode,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.VideoIsMainVideoOfNode,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
