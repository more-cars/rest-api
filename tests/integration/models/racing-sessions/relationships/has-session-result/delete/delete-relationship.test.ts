import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../../../src/models/racing-sessions/RacingSession"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›has-session-result‹ relationship', () => {
    test('RACING SESSION node does not exist', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

        await expect(RacingSession.deleteHasSessionResultRelationship(racingSession.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('SESSION RESULT node does not exist', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        await expect(RacingSession.deleteHasSessionResultRelationship(-42, sessionResult.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING SESSION node and SESSION RESULT node do not exist', async () => {
        await expect(RacingSession.deleteHasSessionResultRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-session-result‹ relationship', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        await expect(RacingSession.deleteHasSessionResultRelationship(racingSession.id, sessionResult.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›has-session-result‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.RACING_SESSION, NodeTypeEnum.SESSION_RESULT, RelationshipType.RacingSessionHasSessionResult)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.RacingSessionHasSessionResult,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingSession.deleteHasSessionResultRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.RacingSessionHasSessionResult,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
