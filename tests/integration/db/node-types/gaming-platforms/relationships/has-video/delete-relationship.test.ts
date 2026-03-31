import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Trying to delete a ›has-video‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.GamingPlatform, DbNodeType.Video, RelationshipType.GamingPlatformHasVideo)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.GamingPlatformHasVideo,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.GamingPlatformHasVideo,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.GamingPlatformHasVideo,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)
        const video = await seedNode(DbNodeType.Video)

        const relationship = await deleteSpecificRelationship(
            gamingPlatform.properties.id,
            video.properties.id,
            RelationshipType.GamingPlatformHasVideo,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.GamingPlatformHasVideo,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
