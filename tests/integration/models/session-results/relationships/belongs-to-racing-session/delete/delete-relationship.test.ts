import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../src/models/session-results/SessionResult"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›belongs-to-racing-session‹ relationship', () => {
    test('SESSION RESULT node does not exist', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        await expect(SessionResult.deleteBelongsToRacingSessionRelationship(sessionResult.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING SESSION node does not exist', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

        await expect(SessionResult.deleteBelongsToRacingSessionRelationship(-42, racingSession.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('SESSION RESULT node and RACING SESSION node do not exist', async () => {
        await expect(SessionResult.deleteBelongsToRacingSessionRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-racing-session‹ relationship', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

        await expect(SessionResult.deleteBelongsToRacingSessionRelationship(sessionResult.id, racingSession.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-racing-session‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.SESSION_RESULT, NodeTypeEnum.RACING_SESSION, RelationshipType.SessionResultBelongsToRacingSession)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.SessionResultBelongsToRacingSession,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await SessionResult.deleteBelongsToRacingSessionRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.SessionResultBelongsToRacingSession,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
