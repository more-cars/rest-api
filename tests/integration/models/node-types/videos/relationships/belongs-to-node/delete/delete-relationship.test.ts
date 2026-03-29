import {describe, expect, test} from 'vitest'
import {Video} from "../../../../../../../../src/models/node-types/videos/Video"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›belongs-to-node‹ relationship', () => {
    test('VIDEO node does not exist', async () => {
        const video = await seedNode(DbNodeType.Video)

        await expect(Video.deleteBelongsToNodeRelationship(video.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('NODE node does not exist', async () => {
        const node = await seedNode(DbNodeType.Node)

        await expect(Video.deleteBelongsToNodeRelationship(-42, node.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('VIDEO node and NODE node do not exist', async () => {
        await expect(Video.deleteBelongsToNodeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-node‹ relationship', async () => {
        const video = await seedNode(DbNodeType.Video)
        const node = await seedNode(DbNodeType.Node)

        await expect(Video.deleteBelongsToNodeRelationship(video.properties.id, node.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-node‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Video, DbNodeType.Node, RelationshipType.VideoBelongsToNode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.VideoBelongsToNode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Video.deleteBelongsToNodeRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.VideoBelongsToNode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
