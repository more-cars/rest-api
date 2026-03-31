import {describe, expect, test} from 'vitest'
import {GamingPlatform} from "../../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-main-video‹ relationship', () => {
    test('GAMING PLATFORM node does not exist', async () => {
        const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)

        await expect(GamingPlatform.deleteHasMainVideoRelationship(gamingPlatform.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('VIDEO node does not exist', async () => {
        const video = await seedNode(DbNodeType.Video)

        await expect(GamingPlatform.deleteHasMainVideoRelationship(-42, video.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('GAMING PLATFORM node and VIDEO node do not exist', async () => {
        await expect(GamingPlatform.deleteHasMainVideoRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-main-video‹ relationship', async () => {
        const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)
        const video = await seedNode(DbNodeType.Video)

        await expect(GamingPlatform.deleteHasMainVideoRelationship(gamingPlatform.properties.id, video.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-main-video‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.GamingPlatform, DbNodeType.Video, RelationshipType.GamingPlatformHasMainVideo)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.GamingPlatformHasMainVideo,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await GamingPlatform.deleteHasMainVideoRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.GamingPlatformHasMainVideo,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
