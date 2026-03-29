import {describe, expect, test} from 'vitest'
import {Video} from "../../../../../../../../src/models/node-types/videos/Video"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›is-main-video-of-node‹ relationship', () => {
    test('VIDEO node does not exist', async () => {
        const video = await seedNode(DbNodeType.Video)

        await expect(Video.deleteIsMainVideoOfNodeRelationship(video.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('NODE node does not exist', async () => {
        const node = await seedNode(DbNodeType.Node)

        await expect(Video.deleteIsMainVideoOfNodeRelationship(-42, node.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('VIDEO node and NODE node do not exist', async () => {
        await expect(Video.deleteIsMainVideoOfNodeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-main-video-of-node‹ relationship', async () => {
        const video = await seedNode(DbNodeType.Video)
        const node = await seedNode(DbNodeType.Node)

        await expect(Video.deleteIsMainVideoOfNodeRelationship(video.properties.id, node.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›is-main-video-of-node‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Video, DbNodeType.Node, RelationshipType.VideoIsMainVideoOfNode)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.VideoIsMainVideoOfNode,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Video.deleteIsMainVideoOfNodeRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.VideoIsMainVideoOfNode,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
