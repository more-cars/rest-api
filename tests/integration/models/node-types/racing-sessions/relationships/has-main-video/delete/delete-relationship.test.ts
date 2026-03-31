import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-main-video‹ relationship', () => {
    test('RACING SESSION node does not exist', async () => {
        const racingSession = await seedNode(DbNodeType.RacingSession)

        await expect(RacingSession.deleteHasMainVideoRelationship(racingSession.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('VIDEO node does not exist', async () => {
        const video = await seedNode(DbNodeType.Video)

        await expect(RacingSession.deleteHasMainVideoRelationship(-42, video.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING SESSION node and VIDEO node do not exist', async () => {
        await expect(RacingSession.deleteHasMainVideoRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-main-video‹ relationship', async () => {
        const racingSession = await seedNode(DbNodeType.RacingSession)
        const video = await seedNode(DbNodeType.Video)

        await expect(RacingSession.deleteHasMainVideoRelationship(racingSession.properties.id, video.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-main-video‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.RacingSession, DbNodeType.Video, RelationshipType.RacingSessionHasMainVideo)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSessionHasMainVideo,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingSession.deleteHasMainVideoRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSessionHasMainVideo,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
