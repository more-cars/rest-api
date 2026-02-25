import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../../src/models/node-types/session-results/SessionResult"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›belongs-to-racing-session‹ relationship', () => {
    test('SESSION RESULT node does not exist', async () => {
        const sessionResult = await seedNode(DbNodeType.SessionResult)

        await expect(SessionResult.deleteBelongsToRacingSessionRelationship(sessionResult.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING SESSION node does not exist', async () => {
        const racingSession = await seedNode(DbNodeType.RacingSession)

        await expect(SessionResult.deleteBelongsToRacingSessionRelationship(-42, racingSession.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('SESSION RESULT node and RACING SESSION node do not exist', async () => {
        await expect(SessionResult.deleteBelongsToRacingSessionRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-racing-session‹ relationship', async () => {
        const sessionResult = await seedNode(DbNodeType.SessionResult)
        const racingSession = await seedNode(DbNodeType.RacingSession)

        await expect(SessionResult.deleteBelongsToRacingSessionRelationship(sessionResult.properties.id, racingSession.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-racing-session‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.SessionResult, DbNodeType.RacingSession, RelationshipType.SessionResultBelongsToRacingSession)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.SessionResultBelongsToRacingSession,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await SessionResult.deleteBelongsToRacingSessionRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.SessionResultBelongsToRacingSession,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
